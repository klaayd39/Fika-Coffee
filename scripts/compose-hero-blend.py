#!/usr/bin/env python3
"""Export hero responsive assets from the editorial collage source."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'scripts' / 'hero-sources' / 'editorial-collage.png'
OUT = ROOT / 'public' / 'images' / 'hero'
MASTER_W = 2560
WIDTHS = (480, 768, 1280, 1920)


def polish(im: Image.Image) -> Image.Image:
    out = ImageEnhance.Brightness(im).enhance(1.06)
    out = ImageEnhance.Contrast(out).enhance(1.05)
    out = ImageEnhance.Color(out).enhance(1.04)
    return out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2))


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


def main() -> None:
    if not SOURCE.is_file():
        raise SystemExit(f'Missing hero source: {SOURCE}')

    src = Image.open(SOURCE).convert('RGB')
    scale = MASTER_W / src.width
    master_h = max(1, round(src.height * scale))
    master = src.resize((MASTER_W, master_h), Image.Resampling.LANCZOS)
    master = polish(master)

    export_variants(master)
    print(f'Exported collage hero {master.size[0]}x{master.size[1]} -> {OUT}')


if __name__ == '__main__':
    main()
