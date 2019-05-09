import {wrap} from './util';

export interface Position {
  x: number;
  y: number;
}

enum Direction {
  North,
  East,
  South,
  West,
}

export type Exits = Direction[];

export interface RichPosition extends Position {
  color: number;
  exits: Exits;
}

type GetPositionFunc = (index: number, width: number) => Position;
export const getPosition: GetPositionFunc = (index: number, width: number) => ({
  x: Math.floor(index / width),
  y: index % width,
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

type ToDirectionFunc = (posA: Position, posB: Position) => Direction;
export const toDirection: ToDirectionFunc = (posA, posB) => {
  const {x, y} = subPositions(posA, posB);
  if (x === -1 || x > 1) {
    return Direction.West;
  }
  if (x === 1 || x < -1) {
    return Direction.East;
  }
  if (y === -1 || y > 1) {
    return Direction.North;
  }
  return Direction.South;
};

type GetExitsFunc = (point: Position, prev: Position, next: Position) => Exits;
export const getExits: GetExitsFunc = (point, prev, next) => [prev, next].map(pos => toDirection(pos, point)) as Exits;

type HasExitFunc = (exits: Exits) => boolean;
export const hasNorth: HasExitFunc = exits => exits.includes(Direction.North);
export const hasEast: HasExitFunc = exits => exits.includes(Direction.East);
export const hasSouth: HasExitFunc = exits => exits.includes(Direction.South);
export const hasWest: HasExitFunc = exits => exits.includes(Direction.West);
export const hasNorthSouth: HasExitFunc = exits => hasNorth(exits) && hasSouth(exits);
export const hasEastWest: HasExitFunc = exits => hasEast(exits) && hasWest(exits);

type RotateExitsFunc = (exits: Exits, rotation: number) => Exits;
export const rotateExits: RotateExitsFunc = (exits, rotation) =>
  (exits as number[]).map(exit => (exit + rotation) % 4) as Exits;

type DirToPositionFunc = (dir: Direction) => Position;
export const dirToPosition: DirToPositionFunc = dir =>
  ({
    [Direction.North]: {x: 0, y: -1},
    [Direction.East]: {x: 1, y: 0},
    [Direction.South]: {x: 0, y: 1},
    [Direction.West]: {x: -1, y: 0},
  }[dir]);

export const dummyMap: RichPosition[][] = [
  [{x: 0, y: 0, exits: [Direction.East, Direction.South], color: 0}],
  [{x: 1, y: 0, exits: [Direction.East, Direction.West], color: 0}],
  [{x: 2, y: 0, exits: [Direction.South, Direction.West], color: 0}],
  [{x: 0, y: 1, exits: [Direction.North, Direction.South], color: 1}],
  [{x: 1, y: 1, exits: [Direction.East, Direction.West], color: 1}],
  [{x: 2, y: 1, exits: [Direction.South, Direction.North], color: 1}],
  [{x: 0, y: 2, exits: [Direction.East, Direction.North], color: 0}],
  [{x: 1, y: 2, exits: [Direction.East, Direction.West], color: 0}],
  [{x: 2, y: 2, exits: [Direction.North, Direction.West], color: 0}],
];
