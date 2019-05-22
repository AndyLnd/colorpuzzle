import {Direction, rotateExits, Map, Exits} from './position';

const roundC = 0.2761;
const corners = {
  [Direction.North]: {x: 0.5, y: 0, cx: 0.5, cy: roundC},
  [Direction.East]: {x: 1, y: 0.5, cx: 1 - roundC, cy: 0.5},
  [Direction.South]: {x: 0.5, y: 1, cx: 0.5, cy: 1 - roundC},
  [Direction.West]: {x: 0, y: 0.5, cx: roundC, cy: 0.5},
};

export const colors = ['#d10', '#12e', '#080', '#eb0'];

export const exitsToPath = (exits: Exits): string => {
  const c1 = corners[exits[0]];
  const c2 = corners[exits[1]];
  return `M ${c1.x} ${c1.y} C ${c1.cx} ${c1.cy}, ${c2.cx} ${c2.cy}, ${c2.x} ${c2.y}`;
};


const strokePathString = (color: number, exits: Exits) => `<path stroke="${colors[color]}" d="${exitsToPath(exits)}"/>`;

export const svgMap = (map: Map, width: number, height: number, size = 64) => {
  const curves = map.map(({strokes, rotation, x, y}) => {
    const svgStrokes = strokes.map(({color, exits}) => strokePathString(color, rotateExits(exits, rotation)));
    return `<g transform="translate(${x} ${y})">${svgStrokes.join('')}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size * width}" height="${size *
    height}" viewBox="0 0 ${width} ${height}" stroke-width=".5"><style>path { mix-blend-mode: screen;}</style>${curves.join(
    ''
  )}</svg>`;
};
