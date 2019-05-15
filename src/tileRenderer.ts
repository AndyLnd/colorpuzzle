import {Direction, rotateExits, Map, Stroke} from './position';

const roundC = 0.2761;
const corners = {
  [Direction.North]: {x: 0.5, y: 0, cx: 0.5, cy: roundC},
  [Direction.East]: {x: 1, y: 0.5, cx: 1 - roundC, cy: 0.5},
  [Direction.South]: {x: 0.5, y: 1, cx: 0.5, cy: 1 - roundC},
  [Direction.West]: {x: 0, y: 0.5, cx: roundC, cy: 0.5},
};

const colors = ['#f00', '#12f', '#080', '#fb0'];

const makeContext = (width: number, height: number) => {
  const canvas = Object.assign(document.createElement('canvas'), {width, height});
  return canvas.getContext('2d') as CanvasRenderingContext2D;
};

const drawCurve = (ctx: CanvasRenderingContext2D, color: number, exits: Direction[], size: number) => {
  ctx.strokeStyle = colors[color];
  ctx.lineWidth = size / 2;
  const c1 = corners[exits[0]];
  const c2 = corners[exits[1]];
  ctx.beginPath();
  ctx.moveTo(c1.x * size, c1.y * size);
  ctx.bezierCurveTo(c1.cx * size, c1.cy * size, c2.cx * size, c2.cy * size, c2.x * size, c2.y * size);
  ctx.stroke();
};

export const renderTile = (strokes: Stroke[], size = 256) => {
  const ctx = makeContext(size, size);
  ctx.globalCompositeOperation = 'screen';
  strokes.forEach(({color, exits}) => drawCurve(ctx, color, exits, size));
  return ctx.canvas;
};

export const renderMap = (map: Map, width: number, height: number, size = 256) => {
  const ctx = makeContext(width * size, height * size);
  ctx.globalCompositeOperation = 'screen';
  map.forEach(({strokes, rotation, x, y}) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x * size, y * size);
    strokes.forEach(({color, exits}) => drawCurve(ctx, color, rotateExits(exits, rotation), size));
  });
  return ctx.canvas;
};
