import {wrap} from './util';

export interface Position {
  x: number;
  y: number;
}

export interface RichPosition extends Position {
  color: number;
  dir: string;
}

type GetPositionFunc = (index: number, width: number) => Position;
export const getPosition: GetPositionFunc = (index: number, width: number) => ({
  x: index % width,
  y: Math.floor(index / width),
});

type IsSamePositionFunc = (posA: Position, posB: Position) => boolean;
export const isSame: IsSamePositionFunc = (posA, posB) => posA.x === posB.x && posA.y === posB.y;

type AddPositionsFunc = (posA: Position, posB: Position) => Position;
export const addPositions: AddPositionsFunc = (posA, posB) => ({x: posA.x + posB.x, y: posA.y + posB.y});

type AddPositionsWrapFunc = (posA: Position, posB: Position, width: number, height: number) => Position;
export const addPositionsWrap: AddPositionsWrapFunc = (posA, posB, width, height) => {
  const {x, y} = addPositions(posA, posB);
  return {x: wrap(x, width), y: wrap(y, height)};
};

type SubPositionsFunc = (posA: Position, posB: Position) => Position;
export const subPositions: SubPositionsFunc = (posA, posB) => ({x: posA.x - posB.x, y: posA.y - posB.y});

type IsInBoundsFunc = (pos: Position, width: number, height: number) => boolean;
export const isInBounds: IsInBoundsFunc = ({x, y}, width, height) => x < width && x >= 0 && y < height && y >= 0;

type ToDirectionFunc = (posA: Position, posB: Position) => string;
export const toDirection: ToDirectionFunc = (posA, posB) => {
  const {x, y} = subPositions(posA, posB);
  if (x === -1 || x > 1) {
    return 'w';
  }
  if (x === 1 || x < -1) {
    return 'e';
  }
  if (y === -1 || y > 1) {
    return 'n';
  }
  return 's';
};

type SortDirectionFunc = (dirA: string, dirB: string) => number;
const dirPrio = ['n', 's', 'w', 'e'];
export const sortDirection: SortDirectionFunc = (dirA, dirB) => dirPrio.indexOf(dirA) - dirPrio.indexOf(dirB);
