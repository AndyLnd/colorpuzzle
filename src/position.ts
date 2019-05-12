import {wrap} from './util';

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
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

export interface Tile {
  color: number;
  exits: Exits;
}

export interface PosGroup extends Position {
  tiles: Tile[];
}

export const getPosition = (index: number, width: number): Position => ({
  x: index % width,
  y: Math.floor(index / width),
});

export const isSame = (posA: Position, posB: Position) => posA.x === posB.x && posA.y === posB.y;

export const addPositions = (posA: Position, posB: Position): Position => ({x: posA.x + posB.x, y: posA.y + posB.y});

export const addPositionsWrap = (posA: Position, posB: Position, width: number, height: number): Position => {
  const {x, y} = addPositions(posA, posB);
  return {x: wrap(x, width), y: wrap(y, height)};
};

export const subPositions = (posA: Position, posB: Position): Position => ({x: posA.x - posB.x, y: posA.y - posB.y});

export const isInBounds = ({x, y}: Position, width: number, height: number) =>
  x < width && x >= 0 && y < height && y >= 0;

export const toDirection = (posA: Position, posB: Position): Direction => {
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

export const getExits = (point: Position, prev: Position, next: Position) =>
  [prev, next].map(pos => toDirection(pos, point)) as Exits;

export const hasNorth = (exits: Exits) => exits.includes(Direction.North);
export const hasEast = (exits: Exits) => exits.includes(Direction.East);
export const hasSouth = (exits: Exits) => exits.includes(Direction.South);
export const hasWest = (exits: Exits) => exits.includes(Direction.West);
export const hasNorthSouth = (exits: Exits) => hasNorth(exits) && hasSouth(exits);
export const hasEastWest = (exits: Exits) => hasEast(exits) && hasWest(exits);

export const rotateExits = (exits: Exits, rota: number) => exits.map(exit => (exit + rota) % 4) as Exits;

export const dirVectors: Record<Direction, Position> = {
  [Direction.North]: {x: 0, y: -1},
  [Direction.East]: {x: 1, y: 0},
  [Direction.South]: {x: 0, y: 1},
  [Direction.West]: {x: -1, y: 0},
};

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
