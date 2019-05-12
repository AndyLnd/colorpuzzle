import {
  PosGroup,
  Position,
  addPositionsWrap,
  isSame,
  getPosition,
  getExits,
  dirVectors,
  rotateExits,
  RichPosition,
} from './position';
import {rndInt, rndArrayElement} from './util';

const makePath = (width: number, height: number, color: number): RichPosition[] => {
  let isDone = false;
  let steps: Position[] = [];
  const minLength = Math.min(width + height, width * height - 1);

  while (!isDone) {
    let isPossible = true;
    let currentStep = {x: rndInt(width), y: rndInt(height)};
    steps = [currentStep];

    while (!isDone && isPossible) {
      const candidates = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        .map(([x, y]) => addPositionsWrap(currentStep, {x, y}, width, height))
        .filter(pos => steps.every((step, index) => (index === 0 && steps.length > minLength) || !isSame(step, pos)));
      if (candidates.length > 0) {
        currentStep = rndArrayElement(candidates);
        if (isSame(steps[0], currentStep)) {
          isDone = true;
        } else {
          steps.push(currentStep);
        }
      } else {
        isPossible = false;
      }
    }
  }
  return steps.map(
    (point, index): RichPosition => {
      const prev = index === 0 ? steps[steps.length - 1] : steps[index - 1];
      const next = index === steps.length - 1 ? steps[0] : steps[index + 1];
      const exits = getExits(point, prev, next);
      return {x: point.x, y: point.y, exits, color};
    }
  );
};

export const makeMap = (width: number, height: number): PosGroup[] => {
  const paths = [
    ...makePath(width, height, 0),
    ...makePath(width, height, 1),
    ...makePath(width, height, 2),
    ...makePath(width, height, 3),
  ];
  return Array.from({length: width * height}, (_, index) => {
    const {x, y} = getPosition(index, width);
    const localPaths = paths.filter(path => path.x === x && path.y === y);
    return {x, y, tiles: localPaths};
  });
};

interface RotPosGroup extends PosGroup {
  rotation: number;
}

export const checkSolved = (posMap: PosGroup[], rotation: number[], width: number, height: number) => {
  const rotationMap = posMap.map((pos, index) => ({...pos, rotation: rotation[index]}));
  return rotationMap.every(({x, y, rotation, tiles}) =>
    tiles.every(({color, exits}) => {
      const rotExits = rotateExits(exits, rotation);
      return rotExits.every(exit => {
        const pos = addPositionsWrap({x, y}, dirVectors[exit], width, height);
        const neighbor = rotationMap.find(other => isSame(pos, other)) as RotPosGroup;
        return neighbor.tiles.some(nbTile => {
          if (nbTile.color === color) {
            const nbExitOpposites = rotateExits(nbTile.exits, neighbor.rotation + 2);
            return nbExitOpposites.includes(exit);
          }
          return false;
        });
      });
    })
  );
};
