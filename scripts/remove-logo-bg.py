"""Remove solid edge backgrounds from client logos (corner color sampling)."""
from collections import Counter
from pathlib import Path

from PIL import Image


def edge_bg_color(img: Image.Image, margin: float = 0.08) -> tuple[int, int, int]:
    w, h = img.size
    mx = max(1, int(w * margin))
    my = max(1, int(h * margin))
    samples: list[tuple[int, int, int]] = []

    for x in range(w):
        for y in range(my):
            samples.append(img.getpixel((x, y))[:3])
        for y in range(h - my, h):
            samples.append(img.getpixel((x, y))[:3])

    for y in range(my, h - my):
        for x in range(mx):
            samples.append(img.getpixel((x, y))[:3])
        for x in range(w - mx, w):
            samples.append(img.getpixel((x, y))[:3])

    buckets = [(r // 12 * 12, g // 12 * 12, b // 12 * 12) for r, g, b in samples]
    return Counter(buckets).most_common(1)[0][0]


def dist(c1: tuple[int, int, int], c2: tuple[int, int, int]) -> float:
    return ((c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2) ** 0.5


def remove_background(path: Path, tolerance: float = 42, feather: float = 18) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    bg = edge_bg_color(img)
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            d = dist((r, g, b), bg)
            if d <= tolerance:
                px[x, y] = (r, g, b, 0)
            elif d <= tolerance + feather:
                t = (d - tolerance) / feather
                px[x, y] = (r, g, b, int(a * t))

    return img


def recolor_to_white(img: Image.Image) -> Image.Image:
    """Flatten logo to white on transparent so CSS filters tint it consistently."""
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            lum = int(0.299 * r + 0.587 * g + 0.114 * b)
            ink = max(lum, 255 - lum)
            alpha = min(255, int(a * (0.35 + 0.65 * ink / 255)))
            if alpha < 12:
                px[x, y] = (255, 255, 255, 0)
            else:
                px[x, y] = (255, 255, 255, alpha)

    return img


def process_logo(path: Path, *, recolor: bool = False) -> None:
    img = remove_background(path)
    if recolor:
        img = recolor_to_white(img)
    img.save(path, optimize=True)


def main() -> None:
    clients = Path(__file__).resolve().parents[1] / "public" / "clients"
    recolor_names = {"sander-dickkopp.png"}
    for png in sorted(clients.glob("*.png")):
        process_logo(png, recolor=png.name in recolor_names)
        print(f"processed {png.name}")


if __name__ == "__main__":
    main()
