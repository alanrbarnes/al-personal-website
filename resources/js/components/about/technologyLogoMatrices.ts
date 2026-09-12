// Visual, hand-editable logo shapes for AboutTechnologyHero.
//
// Each matrix is a small bounding-box grid of characters — '.' is empty,
// anything else is a lit cell. Rows read top-to-bottom, left-to-right, so
// the string literals below double as a preview of the shape itself.
// `ORIGIN` places that bounding box on the hero's 34x18 dot grid.
//
// Use this format for shapes that are naturally "pixel art" (wordmarks,
// hand-drawn glyphs). Shapes defined by true curves/angles (hexagons,
// ellipses) stay in AboutTechnologyHero.tsx as trace*() calls, since a
// hand-plotted matrix can't reproduce a parametric curve as cleanly.

export type Point = [number, number];

export type LogoOrigin = { column: number; row: number };

export function matrixToPoints(matrix: string[], origin: LogoOrigin): Point[] {
  const points: Point[] = [];

  matrix.forEach((line, rowOffset) => {
    Array.from(line).forEach((char, columnOffset) => {
      if (char !== '.') {
        points.push([origin.column + columnOffset, origin.row + rowOffset]);
      }
    });
  });

  return points;
}

export const TYPESCRIPT_ORIGIN: LogoOrigin = { column: 3, row: 2 };
export const TYPESCRIPT_MATRIX = [
  'XXXXXXXXXX....XXXXXXXXXXXX...',
  'XXXXXXXXXX....XXXXXXXXXXXX...',
  '....XX........XX.............',
  '....XX........XX.............',
  '....XX........XX.............',
  '....XX........XX.............',
  '....XX........XXXXXXXXXXXX...',
  '....XX........XXXXXXXXXXXX...',
  '....XX..................XX...',
  '....XX..................XX...',
  '....XX..................XX...',
  '....XX..................XX...',
  '....XX..................XX...',
  '....XX........XXXXXXXXXXXX...',
  '..............XXXXXXXXXXXX...',
];

export const GIT_ORIGIN: LogoOrigin = { column: 9, row: 0 };
export const GIT_MATRIX = [
  '..........XXXXX',
  '..X........XXX.',
  '.XXX........XX.',
  'XXXXXXXXXXXXXX.',
  '.XXXXXXXXXXXXX.',
  '..XX........XX.',
  '.XXX.......XXX.',
  'XXXXX.....XXXXX',
  '.XXX.......XXX.',
  '..XX........XX.',
  '.XXX........XX.',
  'XXXXXXXXXXXXXX.',
  '.XXXXXXXXXXXXX.',
  '..X.........XX.',
  '............XX.',
  '............XX.',
  '...........XXX.',
  '..........XXXXX',
];

export const ANGULAR_ORIGIN: LogoOrigin = { column: 7, row: 0 };
export const ANGULAR_MATRIX = [
  '.........X.........',
  '........XXX........',
  '......XXXXXXX......',
  '.....XX.....XX.....',
  '...XXX........XX...',
  '.XXX...........XXX.',
  'XX...............XX',
  'X.................X',
  'XX...............XX',
  '.X..XXXXXXXXXXX..X.',
  '.X..XXXXXXXXXXX..X.',
  '.XX.............XX.',
  '..X.............X..',
  '..XX...........XX..',
  '...XX.........XX...',
  '....XX.......XX....',
  '.....XX.....XX.....',
  '......XXXXXXX......',
];

export const CSHARP_ORIGIN: LogoOrigin = { column: 7, row: 2 };
export const CSHARP_MATRIX = [
  '.....XX.....XX.....',
  '.....XX.....XX.....',
  '.....XX.....XX.....',
  '.....XX.....XX.....',
  'XXXXXXXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXXXXXXX',
  '.....XX.....XX.....',
  '....XXX....XXX.....',
  '....XX.....XX......',
  'XXXXXXXXXXXXXXXXXXX',
  'XXXXXXXXXXXXXXXXXXX',
  '....XX.....XX......',
  '....XX.....XX......',
  '....XX.....XX......',
  '....XX.....XX......',
];
