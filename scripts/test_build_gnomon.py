"""Offline regression checks for the generated caption fonts."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

from fontTools.ttLib import TTFont

SPEC = importlib.util.spec_from_file_location("build_gnomon", Path(__file__).with_name("build-gnomon.py"))
assert SPEC is not None and SPEC.loader is not None
builder = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(builder)


def normalized_outline(font, character):
    glyph = font["glyf"][font.getBestCmap()[ord(character)]]
    coordinates, contours, flags = glyph.getCoordinates(font["glyf"])
    return (
        tuple((x - glyph.xMin, y - glyph.yMin) for x, y in coordinates),
        tuple(contours),
        tuple(flags),
    )


class GnomonFontsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.directory = tempfile.TemporaryDirectory()
        cls.addClassCleanup(cls.directory.cleanup)
        cls.output = Path(cls.directory.name)
        builder.build_fonts(cls.output)

    def test_every_half_hour_changes_letter_shapes_not_just_position(self):
        for character in "BW1jpeg":
            outlines = []
            for half_hour in range(12, 37):
                with TTFont(self.output / f"time-{half_hour}.ttf") as font:
                    outlines.append(normalized_outline(font, character))
            with self.subTest(character=character):
                self.assertEqual(len(set(outlines)), 25)

    def test_checked_in_fonts_match_generator_and_cover_captions(self):
        self.assertEqual(len(list(builder.OUTPUT.glob("time-*.ttf"))), 25)
        for half_hour in range(12, 37):
            with (
                self.subTest(half_hour=half_hour),
                TTFont(self.output / f"time-{half_hour}.ttf") as generated,
                TTFont(builder.OUTPUT / f"time-{half_hour}.ttf") as shipped,
            ):
                self.assertNotIn("fvar", shipped)
                self.assertEqual(generated["glyf"].compile(generated), shipped["glyf"].compile(shipped))
                self.assertEqual(generated["hmtx"].metrics, shipped["hmtx"].metrics)
                for name in shipped.getGlyphOrder():
                    glyph = shipped["glyf"][name]
                    if glyph.numberOfContours:
                        self.assertEqual(shipped["hmtx"].metrics[name][1], glyph.xMin)
                cmap = shipped.getBestCmap()
                assert cmap is not None
                for character in "BW_1_1.jpeg · 2025-01-01":
                    self.assertIn(ord(character), cmap)


if __name__ == "__main__":
    unittest.main()
