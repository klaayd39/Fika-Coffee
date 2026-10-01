#!/usr/bin/env python3
"""About showcase still-life: cream canvas, edge props, Samyang bowl on the right."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'scripts' / 'about-sources' / 'showcase-base-1920.jpg'
SAMYANG = ROOT / 'scripts' / 'about-sources' / 'samyang-bowl.png'
OUT = ROOT / 'public' / 'images' / 'about'
PROP_OUT = OUT / 'showcase-samyang-prop.png'
WIDTHS = (960, 1280, 1920)

# Matches --color-cream-100 / bg-canvas in src/index.css
CANVAS = (247, 240, 237)

# Legacy cookie + bean regions on the original 1920×1080 master.
COOKIE_PATCHES = (
    ((1140, 640, 1920, 1060), 48),
    ((1440, 360, 1920, 840), 36),
    ((1080, 640, 1360, 860), 28),
    ((1560, 430, 1920, 1060), 24),
)


def sample_background(im: Image.Image) -> tuple[int, int, int]:
    px = im.load()
    samples = [px[x, y] for x in range(720, 880, 40) for y in range(380, 620, 40)]
    r = sum(c[0] for c in samples) // len(samples)
    g = sum(c[1] for c in samples) // len(samples)
    b = sum(c[2] for c in samples) // len(samples)
    return r, g, b


def is_background(r: int, g: int, b: int, bg: tuple[int, int, int], tol: int = 34) -> bool:
    return abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) <= tol * 3


def extract_props(src: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    src = src.convert('RGB')
    w, h = src.size
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    sp = src.load()
    dp = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = sp[x, y]
            if is_background(r, g, b, bg):
                continue
            dp[x, y] = (r, g, b, 255)
    return out


def scrub_top_right_brown(im: Image.Image, bg: tuple[int, int, int]) -> None:
    px = im.load()
    w, h = im.size
    for y in range(0, int(h * 0.44)):
        for x in range(int(w * 0.58), w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if g > r + 8 or (r > 175 and g > 175):
                continue
            lum = (r + g + b) / 3
            if is_background(r, g, b, bg, tol=50) or (lum < 150 and r > g):
                px[x, y] = (0, 0, 0, 0)


def scrub_right_fringe(im: Image.Image, bg: tuple[int, int, int]) -> None:
    """Drop leftover brown table + cookie pixels on the right third."""
    px = im.load()
    w, h = im.size
    for y in range(int(h * 0.44), h):
        for x in range(int(w * 0.52), w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if g > r + 12 and g > 70:
                continue
            if y < int(h * 0.45) and g > 55:
                continue
            lum = (r + g + b) / 3
            warm_dark = r > g and b < 95 and lum < 125
            if is_background(r, g, b, bg, tol=52) or warm_dark:
                px[x, y] = (0, 0, 0, 0)


def clear_alpha_patches(im: Image.Image, boxes: tuple[tuple[int, int, int, int], int]) -> None:
    alpha = im.split()[3]
    mask = Image.new('L', im.size, 0)
    draw = ImageDraw.Draw(mask)
    for box, _blur in boxes:
        draw.ellipse(box, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(36))
    apx = alpha.load()
    mpx = mask.load()
    for y in range(im.height):
        for x in range(im.width):
            if mpx[x, y] > 0:
                apx[x, y] = max(0, apx[x, y] - mpx[x, y])
    im.putalpha(alpha)


def crop_bowl_reference(src: Image.Image) -> Image.Image:
    w, h = src.size
    cropped = src.crop((int(w * 0.04), 0, int(w * 0.96), int(h * 0.8)))
    cw, ch = cropped.size
    side = min(cw, ch)
    cx = cw // 2
    cy = int(ch * 0.46)
    left = max(0, cx - side // 2)
    top = max(0, cy - side // 2)
    square = cropped.crop((left, top, left + side, top + side))
    prop = square.convert('RGBA')
    prop = knock_out_dark_table(prop)
    prop = polish_prop(prop)
    return soften_edges(prop, inset=10, blur=10, elliptical=True)


def knock_out_dark_table(im: Image.Image, threshold: int = 52) -> Image.Image:
    px = im.load()
    w, h = im.size
    cx, cy = w / 2, h / 2
    max_r = min(w, h) * 0.48
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = int(0.299 * r + 0.587 * g + 0.114 * b)
            dx = x - cx
            dy = y - cy
            dist = (dx * dx + dy * dy) ** 0.5
            if lum < threshold and dist > max_r * 0.55:
                px[x, y] = (r, g, b, 0)
            elif lum < threshold + 40:
                edge = max(0, min(255, (lum - threshold) * 255 // 40))
                px[x, y] = (r, g, b, min(a, edge))
    return im


def polish_prop(im: Image.Image) -> Image.Image:
    rgb = im.convert('RGB')
    rgb = ImageEnhance.Brightness(rgb).enhance(1.04)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(1.05)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.1, percent=45, threshold=2))
    out = rgb.convert('RGBA')
    out.putalpha(im.split()[3])
    return out


def soften_edges(
    im: Image.Image,
    inset: int = 8,
    blur: int = 16,
    *,
    elliptical: bool = False,
) -> Image.Image:
    w, h = im.size
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    pad = inset
    if elliptical:
        draw.ellipse((pad, pad, w - pad, h - pad), fill=255)
    else:
        draw.rounded_rectangle((pad, pad, w - pad, h - pad), radius=min(w, h) // 7, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(blur))
    alpha = im.split()[3]
    combined = Image.new('L', (w, h))
    mpx = mask.load()
    apx = alpha.load()
    cpx = combined.load()
    for y in range(h):
        for x in range(w):
            cpx[x, y] = min(mpx[x, y], apx[x, y])
    im.putalpha(combined)
    return im


def with_shadow(prop: Image.Image, spread: int = 10, offset: tuple[int, int] = (3, 8)) -> Image.Image:
    alpha = prop.split()[3]
    shadow = Image.new('RGBA', prop.size, (0, 0, 0, 0))
    shadow.putalpha(alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(spread))
    shadow_rgb = Image.new('RGBA', prop.size, (38, 28, 24, 0))
    shadow_rgb.putalpha(shadow.split()[3])
    canvas = Image.new('RGBA', prop.size, (0, 0, 0, 0))
    ox, oy = offset
    canvas.alpha_composite(shadow_rgb, (ox, oy))
    canvas.alpha_composite(prop, (0, 0))
    return canvas


def place_samyang(plate: Image.Image, prop: Image.Image) -> Image.Image:
    target_w = int(plate.width * 0.36)
    scale = target_w / prop.width
    target_h = max(1, round(prop.height * scale))
    sized = prop.resize((target_w, target_h), Image.Resampling.LANCZOS)
    layered = with_shadow(sized)
    x = plate.width - layered.width - int(plate.width * 0.035)
    y = plate.height - layered.height - int(plate.height * 0.045)
    layer = plate.convert('RGBA')
    layer.alpha_composite(layered, (x, y))
    return layer.convert('RGB')


def build_plate(original: Image.Image, bowl: Image.Image) -> Image.Image:
    bg = sample_background(original)
    props = extract_props(original, bg)
    scrub_top_right_brown(props, bg)
    scrub_right_fringe(props, bg)
    clear_alpha_patches(props, COOKIE_PATCHES)

    plate = Image.new('RGB', original.size, CANVAS)
    plate.paste(props, (0, 0), props)
    return place_samyang(plate, bowl)


def export_variants(master: Image.Image) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    master.save(OUT / 'showcase-bg.jpg', quality=92, optimize=True, progressive=True)

    mw, mh = master.size
    for w in WIDTHS:
        h = max(1, round(mh * (w / mw)))
        sized = master.resize((w, h), Image.Resampling.LANCZOS)
        sized.save(OUT / f'showcase-bg-{w}.jpg', quality=90, optimize=True, progressive=True)
        sized.save(OUT / f'showcase-bg-{w}.webp', quality=86, method=6)
        sized.save(OUT / f'showcase-bg-{w}.avif', quality=64)


def main() -> None:
    if not BASE.is_file():
        raise SystemExit(f'Missing showcase base: {BASE}')
    if not SAMYANG.is_file():
        raise SystemExit(f'Missing Samyang source: {SAMYANG}')

    original = Image.open(BASE).convert('RGB')
    bowl = crop_bowl_reference(Image.open(SAMYANG))
    PROP_OUT.parent.mkdir(parents=True, exist_ok=True)
    bowl.save(PROP_OUT)

    plate = build_plate(original, bowl)
    export_variants(plate)
    print(f'Updated showcase still-life -> {OUT}')
    print(f'Exported isolated prop -> {PROP_OUT}')


if __name__ == '__main__':
    main()
