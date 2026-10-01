#!/usr/bin/env python3
"""Layer Fika reference photos into one 21:9 editorial hero (no strip seams)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'scripts' / 'hero-sources'
OUT = ROOT / 'public' / 'images' / 'hero'

MASTER_W = 2560
MASTER_H = 1097  # 21:9
WIDTHS = (480, 768, 1280, 1920)


def fit_cover(
    im: Image.Image,
    tw: int,
    th: int,
    focus_x: float = 0.5,
    focus_y: float = 0.5,
) -> Image.Image:
    iw, ih = im.size
    scale = max(tw / iw, th / ih)
    nw, nh = max(tw, int(iw * scale)), max(th, int(ih * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - tw) * focus_x)
    top = int((nh - th) * focus_y)
    left = max(0, min(nw - tw, left))
    top = max(0, min(nh - th, top))
    return im.crop((left, top, left + tw, top + th))


def quad(im: Image.Image, row: int, col: int) -> Image.Image:
    w, h = im.size
    hw, hh = w // 2, h // 2
    return im.crop((col * hw, row * hh, (col + 1) * hw, (row + 1) * hh))


def dual_top(im: Image.Image) -> Image.Image:
    w, h = im.size
    return im.crop((0, 0, w, h // 2))


def fade_right_mask(width: int, height: int, keep: float = 0.62) -> Image.Image:
    solid = max(1, int(width * keep))
    fade = max(1, width - solid)
    mask = Image.new('L', (width, height), 255)
    grad = (
        Image.linear_gradient('L')
        .transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        .resize((fade, height))
    )
    mask.paste(grad, (solid, 0))
    return mask


def fade_left_mask(width: int, height: int, keep: float = 0.62) -> Image.Image:
    solid = max(1, int(width * keep))
    fade = max(1, width - solid)
    mask = Image.new('L', (width, height), 0)
    grad = Image.linear_gradient('L').resize((fade, height))
    mask.paste(grad, (0, 0))
    mask.paste(Image.new('L', (solid, height), 255), (fade, 0))
    return mask


def soft_light_mask(width: int, height: int) -> Image.Image:
    """Elliptical falloff — strong center, soft edges."""
    h = Image.linear_gradient('L').resize((width, height))
    v = Image.linear_gradient('L').transpose(Image.Transpose.ROTATE_90).resize((width, height))
    combined = ImageChops.multiply(h, v)
    return Image.eval(combined, lambda v: min(255, int(v * 1.15)))


def paste_layer(
    base: Image.Image,
    layer: Image.Image,
    xy: tuple[int, int],
    mask: Image.Image,
    opacity: float,
) -> None:
    if opacity < 1:
        mask = Image.eval(mask, lambda v: int(v * opacity))
    base.paste(layer, xy, mask)


def warm_harmonize(im: Image.Image) -> Image.Image:
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.015 + 8)))
    g = g.point(lambda v: min(255, int(v * 0.995 + 4)))
    b = b.point(lambda v: max(0, int(v * 0.91 - 2)))
    out = Image.merge('RGB', (r, g, b))
    out = ImageEnhance.Color(out).enhance(0.92)
    out = ImageEnhance.Contrast(out).enhance(1.06)
    out = ImageEnhance.Brightness(out).enhance(1.03)
    return out


def corner_vignette(im: Image.Image, strength: float = 0.1) -> Image.Image:
    w, h = im.size
    edge = Image.linear_gradient('L').resize((w, h))
    edge = ImageChops.multiply(
        edge,
        Image.linear_gradient('L').transpose(Image.Transpose.ROTATE_90).resize((w, h)),
    )
    shade = Image.new('RGB', (w, h), (28, 20, 18))
    mask = Image.eval(edge, lambda v: int((255 - v) * strength))
    return Image.composite(im, shade, mask)


def export_variants(master: Image.Image) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    master.save(OUT / 'editorial-blend-master.jpg', quality=93, optimize=True, progressive=True)

    mw, mh = master.size
    for w in WIDTHS:
        h = max(1, round(mh * (w / mw)))
        sized = master.resize((w, h), Image.Resampling.LANCZOS)
        sized.save(OUT / f'editorial-{w}.jpg', quality=90, optimize=True, progressive=True)
        sized.save(OUT / f'editorial-{w}.webp', quality=86, method=6)
        sized.save(OUT / f'editorial-{w}.avif', quality=64)


def compose() -> Image.Image:
    drink = Image.open(ASSETS / 'image-da4e01ac-4197-4747-8c34-2aa6b5cd75fe.jpg').convert('RGB')
    dual = Image.open(ASSETS / 'image-5fd4050b-c915-491c-a7b1-efd6b2a99a68.jpg').convert('RGB')
    mirror = Image.open(ASSETS / 'image-8b02b29b-4847-4463-99c7-220d493b757c.jpg').convert('RGB')
    grid = Image.open(ASSETS / 'image-be8ece9d-7674-4595-a72e-6a00622c9e5d.jpg').convert('RGB')

    base = fit_cover(dual_top(dual), MASTER_W, MASTER_H, focus_x=0.46, focus_y=0.5)
    glow = base.filter(ImageFilter.GaussianBlur(radius=36))
    canvas = Image.blend(base, glow, 0.09)

    storefront = fit_cover(quad(grid, 0, 0), 980, MASTER_H, focus_x=0.62, focus_y=0.45)
    paste_layer(
        canvas,
        storefront,
        (-120, 0),
        fade_right_mask(storefront.size[0], MASTER_H, keep=0.48),
        0.28,
    )

    nook = fit_cover(mirror, 1180, MASTER_H, focus_x=0.52, focus_y=0.36)
    paste_layer(
        canvas,
        nook,
        (-60, 0),
        fade_right_mask(nook.size[0], MASTER_H, keep=0.58),
        0.42,
    )

    cup = fit_cover(drink, 1120, MASTER_H, focus_x=0.52, focus_y=0.34)
    cup_mask = ImageChops.multiply(
        fade_left_mask(cup.size[0], MASTER_H, keep=0.55),
        soft_light_mask(cup.size[0], MASTER_H),
    )
    paste_layer(canvas, cup, (MASTER_W - 880, -20), cup_mask, 1.0)

    canvas = warm_harmonize(canvas)
    canvas = Image.blend(canvas, Image.new('RGB', canvas.size, (246, 236, 228)), 0.045)
    canvas = canvas.filter(ImageFilter.UnsharpMask(radius=1.4, percent=42, threshold=2))
    return corner_vignette(canvas, strength=0.08)


def main() -> None:
    master = compose()
    export_variants(master)
    print(f'Wrote layered hero to {OUT} ({master.size[0]}x{master.size[1]})')


if __name__ == '__main__':
    main()
