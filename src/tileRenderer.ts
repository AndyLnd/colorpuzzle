import {Direction, Tile, PosGroup, getPosition, rotateExits} from './position';

const corners = {
  [Direction.North]: {x: 0.5, y: 0, cx: 0.5, cy: 0.25},
  [Direction.East]: {x: 1, y: 0.5, cx: 0.75, cy: 0.5},
  [Direction.South]: {x: 0.5, y: 1, cx: 0.5, cy: 0.75},
  [Direction.West]: {x: 0, y: 0.5, cx: 0.25, cy: 0.5},
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

export const renderTile = (tiles: Tile[], size = 256) => {
  const ctx = makeContext(size, size);
  ctx.globalCompositeOperation = 'lighten';
  tiles.forEach(({color, exits}) => drawCurve(ctx, color, exits, size));
  return ctx.canvas;
};

export const renderMap = (map: PosGroup[], rotation: number[], width: number, height: number, size = 256) => {
  const ctx = makeContext(width * size, height * size);
  ctx.globalCompositeOperation = 'lighten';
  map.forEach((pos, index) => {
    const {x, y} = getPosition(index, width);
    const rota = rotation[index];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x * size, y * size);
    pos.tiles.forEach(({color, exits}) => drawCurve(ctx, color, rotateExits(exits, rota), size));
  });
  return ctx.canvas;
};
