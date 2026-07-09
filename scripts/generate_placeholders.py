"""Generate placeholder and brand-aligned images for the EAJJY AI site."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import textwrap

BASE = Path(__file__).resolve().parents[1]
OUT = BASE / "public" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

# Brand palette
BLACK = (5, 5, 5)
CHARCOAL = (17, 17, 17)
RED = (255, 43, 43)
RED_HOVER = (255, 77, 77)
WHITE = (255, 255, 255)
GRAY = (161, 161, 170)
BORDER = (38, 38, 38)


def hex_to_rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    r, g, b = [int(hex_color[i:i+2], 16) for i in (0, 2, 4)]
    return (r, g, b, alpha)


def new_canvas(width, height, bg=BLACK):
    img = Image.new("RGBA", (width, height), bg)
    draw = ImageDraw.Draw(img)
    return img, draw


def add_glow(draw, x, y, radius, color, alpha=60):
    for r in range(radius, 0, -2):
        a = int(alpha * (1 - r / radius))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=hex_to_rgba(color, a))


def add_gradient_bg(img, draw, w, h, colors, direction="diagonal"):
    for y in range(h):
        for x in range(w):
            if direction == "diagonal":
                t = (x / w + y / h) / 2
            elif direction == "horizontal":
                t = x / w
            else:
                t = y / h
            r = int(colors[0][0] * (1 - t) + colors[1][0] * t)
            g = int(colors[0][1] * (1 - t) + colors[1][1] * t)
            b = int(colors[0][2] * (1 - t) + colors[1][2] * t)
            img.putpixel((x, y), (r, g, b, 255))


def find_font(size):
    font_paths = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in font_paths:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines = []
    current = []
    for word in words:
        test = " ".join(current + [word])
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current.append(word)
        else:
            lines.append(" ".join(current))
            current = [word]
    lines.append(" ".join(current))
    return lines


def add_grid_lines(draw, w, h, step=40, color=BORDER):
    for x in range(0, w, step):
        draw.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, step):
        draw.line([(0, y), (w, y)], fill=color, width=1)


# ------------------------------------------------------------------
# 1. Blog cover placeholders (1200x630 og:image standard)
# ------------------------------------------------------------------
COVER_W, COVER_H = 1200, 630

def generate_cover(filename, title, subtitle, accent_color=RED):
    img, draw = new_canvas(COVER_W, COVER_H, BLACK)
    w, h = COVER_W, COVER_H

    # subtle diagonal gradient background
    for y in range(h):
        for x in range(w):
            t = (x / w + y / h) / 2
            r = int(CHARCOAL[0] * (1 - t) + BLACK[0] * t)
            g = int(CHARCOAL[1] * (1 - t) + BLACK[1] * t)
            b = int(CHARCOAL[2] * (1 - t) + BLACK[2] * t)
            img.putpixel((x, y), (r, g, b, 255))

    # decorative elements
    add_glow(draw, w - 180, 120, 280, "#FF2B2B", alpha=35)
    add_glow(draw, 140, h - 100, 220, "#FF2B2B", alpha=25)
    draw.rectangle([60, 60, w - 60, h - 60], outline=BORDER, width=2)
    add_grid_lines(draw, w, h, step=80, color=(20, 20, 20))

    # text
    title_font = find_font(52)
    sub_font = find_font(24)
    tag_font = find_font(18)

    # tag
    tag = "EAJJY AI · BLOG"
    tb = draw.textbbox((0, 0), tag, font=tag_font)
    tx = 80
    ty = 90
    r_w = tb[2] + 24
    r_h = 36
    draw.rounded_rectangle([tx, ty, tx + r_w, ty + r_h], radius=8, fill=hex_to_rgba("#FF2B2B", 40), outline=accent_color, width=1)
    draw.text((tx + 12, ty + 8), tag, font=tag_font, fill=WHITE)

    # title (wrapped)
    lines = wrap_text(title, title_font, w - 160, draw)
    y = 160
    for line in lines:
        draw.text((80, y), line, font=title_font, fill=WHITE)
        y += 64

    # subtitle
    if subtitle:
        sub_lines = wrap_text(subtitle, sub_font, w - 160, draw)
        y = max(y + 16, 340)
        for line in sub_lines[:2]:
            draw.text((80, y), line, font=sub_font, fill=GRAY)
            y += 36

    # bottom bar
    draw.rectangle([0, h - 80, w, h], fill=(8, 8, 8, 255))
    draw.text((80, h - 52), "www.eajjy.com", font=find_font(18), fill=GRAY)

    img.save(OUT / filename, "PNG")
    print(f"Created {filename}")


# Generate covers for existing blog posts
BLOG_COVERS = [
    ("blog-what-is-agentic-ai.png", "What Is Agentic AI?", "A plain-English guide for business owners"),
    ("blog-agentic-ai-readiness.png", "Are You Ready for Agentic AI?", "Take the readiness assessment"),
    ("blog-rag-vs-fine-tuning.png", "RAG vs Fine-Tuning", "Which does your business actually need?"),
    ("blog-n8n-germany.png", "Top 10 N8N Agencies in Germany", "Find the right automation partner"),
    ("blog-n8n-azure-docker.png", "Setting Up N8N on Azure Docker", "A practical deployment guide"),
    ("blog-reporting-automation.png", "From 9 Hours to 12 Minutes", "How we automated a reporting workflow"),
]

for fname, title, sub in BLOG_COVERS:
    generate_cover(fname, title, sub)


# ------------------------------------------------------------------
# 2. Author avatar (circular, 200x200)
# ------------------------------------------------------------------
AUTHOR_W, AUTHOR_H = 200, 200

def generate_author_avatar(filename, initials="DS", bg=RED):
    img, draw = new_canvas(AUTHOR_W, AUTHOR_H, (0, 0, 0, 0))
    w, h = AUTHOR_W, AUTHOR_H
    r = min(w, h) // 2
    cx, cy = w // 2, h // 2

    # background circle
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=bg)
    # subtle inner glow
    for i in range(10, 0, -1):
        a = int(20 * (i / 10))
        draw.ellipse([cx - r + i, cy - r + i, cx + r - i, cy + r - i], outline=hex_to_rgba("#ffffff", a), width=1)

    # initials
    font = find_font(72)
    bb = draw.textbbox((0, 0), initials, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    draw.text((cx - tw // 2, cy - th // 2 - 4), initials, font=font, fill=WHITE)

    img.save(OUT / filename, "PNG")
    print(f"Created {filename}")


generate_author_avatar("author-ds.png", "DS", RED)


# ------------------------------------------------------------------
# 3. Future image containers (pre-sized panels)
# ------------------------------------------------------------------
def generate_placeholder_panel(filename, label, size, bg=CHARCOAL):
    img, draw = new_canvas(size[0], size[1], bg)
    w, h = size
    draw.rectangle([0, 0, w, h], fill=bg, outline=BORDER, width=2)
    add_grid_lines(draw, w, h, step=20, color=(22, 22, 22))

    font = find_font(20)
    bb = draw.textbbox((0, 0), label, font=font)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    draw.text((w // 2 - tw // 2, h // 2 - th // 2), label, font=font, fill=GRAY)
    img.save(OUT / filename, "PNG")
    print(f"Created {filename}")


generate_placeholder_panel("product-hero-placeholder.png", "Product Screenshot (1920x1080)", (1920, 1080))
generate_placeholder_panel("service-bpa-image.png", "BPA Visual (800x600)", (800, 600))
generate_placeholder_panel("case-study-thumb.png", "Case Study Thumbnail (600x400)", (600, 400))
generate_placeholder_panel("team-photo-placeholder.png", "Team Photo (1200x800)", (1200, 800))

print("Done.")
