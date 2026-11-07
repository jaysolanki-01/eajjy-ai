"""Verify generated images match brand colors and all references resolve."""
from pathlib import Path
from PIL import Image
import re

BASE = Path("D:/Jay AutoMation work/EAJJY/eajjy-ai-main")
PUBLIC = BASE / "public"
SRC = BASE / "src"

# 1. Check all files in public/generated/
gen = PUBLIC / "generated"
files = sorted(gen.glob("*"))
print(f"Found {len(files)} files in public/generated/")
for f in files:
    img = Image.open(f)
    print(f"  {f.name}: {img.size[0]}x{img.size[1]} {img.mode} {f.stat().st_size:,} bytes")

# 2. Verify brand colors by scanning multiple sample points
BLACK = (5, 5, 5)
RED = (255, 43, 43)
RED_HOVER = (255, 77, 77)

def color_match(c1, c2, tol=25):
    return all(abs(a - b) <= tol for a, b in zip(c1[:3], c2[:3]))

issues = []
for f in files:
    img = Image.open(f).convert("RGBA")
    px = img.load()
    w, h = img.size
    
    # More thorough sampling
    samples = []
    for x in range(0, w, w // 10 + 1):
        for y in range(0, h, h // 10 + 1):
            samples.append(px[x, y])
    
    has_black = any(color_match(s, BLACK, tol=30) for s in samples)
    has_red = any(color_match(s, RED, tol=35) or color_match(s, RED_HOVER, tol=35) for s in samples)
    
    status = []
    if has_black:
        status.append("OK dark bg")
    else:
        status.append("MISSING dark bg")
        issues.append(f.name)
    if has_red:
        status.append("OK red accent")
    else:
        status.append("MISSING red accent")
    print(f"  {f.name}: {' | '.join(status)}")

if issues:
    print(f"\nWARNING: {len(issues)} images may not match brand colors: {issues}")
else:
    print("\nAll images contain expected brand colors.")

# 3. Verify all /generated/ references in src/ resolve
print("\nChecking /generated/ references in source...")
refs = []
for f in SRC.rglob("*.jsx"):
    try:
        text = f.read_text(encoding="utf-8")
    except Exception:
        continue
    for m in re.finditer(r"/generated/[^\"]+", text):
        refs.append((f.relative_to(SRC.parent), m.group(0)))
for f in SRC.rglob("*.js"):
    try:
        text = f.read_text(encoding="utf-8")
    except Exception:
        continue
    for m in re.finditer(r"/generated/[^\"]+", text):
        refs.append((f.relative_to(SRC.parent), m.group(0)))

all_ok = True
for src_file, ref in refs:
    exists = (PUBLIC / ref.lstrip("/")).exists()
    status = "OK" if exists else "MISSING"
    if not exists:
        all_ok = False
    print(f"  {status}: {src_file} -> {ref}")

print()
if all_ok:
    print("All /generated/ references resolve correctly.")
else:
    print("Some references are broken!")
