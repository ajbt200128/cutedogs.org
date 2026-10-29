"""Bake Gnomon's time axis for Cloudflare Images, which has no variation-axis API.

Requires scripts/requirements-fonts.txt. Source: https://github.com/indestructible-type/Gnomon
Gnomon by Owen Earl is licensed under the SIL Open Font License.
"""
from pathlib import Path

import pathops
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts/fonts/GnomonSimple.ttf"
OUTPUT = ROOT / "public/frame/gnomon"
# Half the stroke lies inside the face: about 0.5 px at TRMNL's 12 px caption size.
FACE_OUTLINE_WIDTH = 80


def add_caption_glyph(font, codepoint, rectangle, advance):
    # The original font lacks underscores in photo filenames and the date separator.
    name = f"uni{codepoint:04X}"
    pen = TTGlyphPen(None)
    left, bottom, right, top = rectangle
    pen.moveTo((left, bottom))
    pen.lineTo((left, top))
    pen.lineTo((right, top))
    pen.lineTo((right, bottom))
    pen.closePath()
    glyph_order = font.getGlyphOrder().copy()
    font["glyf"][name] = pen.glyph()
    font["hmtx"].metrics[name] = (advance, left)
    font.setGlyphOrder(glyph_order + [name])
    for table in font["cmap"].tables:
        if table.isUnicode():
            table.cmap[codepoint] = name


def glyph_path(glyph):
    path = pathops.Path()
    glyph.draw(path.getPen())
    return path


def combine_face_and_shadow(face, shadow):
    # Simple is only a translated shadow. Without a fixed face, every time looks
    # identical once a text renderer crops away the glyph's side bearings.
    outline = pathops.Path(face)
    outline.stroke(FACE_OUTLINE_WIDTH, pathops.LineCap.BUTT_CAP, pathops.LineJoin.MITER_JOIN, 4)
    interior = pathops.op(face, outline, pathops.PathOp.DIFFERENCE)
    silhouette = pathops.op(face, shadow, pathops.PathOp.UNION)
    combined = pathops.op(silhouette, interior, pathops.PathOp.DIFFERENCE)
    pen = TTGlyphPen(None)
    combined.draw(pen)
    return pen.glyph()


def build_fonts(output=OUTPUT):
    output.mkdir(parents=True, exist_ok=True)
    foreground = instantiateVariableFont(TTFont(SOURCE), {"TOTD": 12, "DIST": 0}, inplace=True)
    faces = {name: glyph_path(glyph) for name, glyph in foreground.getGlyphSet().items()}
    for half_hour in range(12, 37):
        font = instantiateVariableFont(TTFont(SOURCE), {"TOTD": half_hour / 2, "DIST": 1}, inplace=True)
        shadows = font.getGlyphSet()
        for name in font.getGlyphOrder():
            glyph = combine_face_and_shadow(faces[name], glyph_path(shadows[name]))
            glyph.recalcBounds(font["glyf"])
            font["glyf"][name] = glyph
            advance, _ = font["hmtx"].metrics[name]
            font["hmtx"].metrics[name] = (advance, glyph.xMin if glyph.numberOfContours else 0)
        add_caption_glyph(font, ord("_"), (30, -90, 430, -30), 460)
        add_caption_glyph(font, ord("·"), (40, 270, 110, 340), 150)
        font["hhea"].descent = min(font["hhea"].descent, -100)
        font["OS/2"].sTypoDescender = min(font["OS/2"].sTypoDescender, -100)
        font["OS/2"].usWinDescent = max(font["OS/2"].usWinDescent, 100)
        for name_id, text in {
            1: "Frame Gnomon", 2: "Regular", 3: f"FrameGnomon-{half_hour}",
            4: f"Frame Gnomon {half_hour}", 6: f"FrameGnomon-{half_hour}",
        }.items():
            for record in font["name"].names:
                if record.nameID == name_id:
                    record.string = text.encode(record.getEncoding())
        font.save(output / f"time-{half_hour}.ttf")
    print("Generated 25 half-hour Gnomon caption fonts.")


if __name__ == "__main__":
    build_fonts()
