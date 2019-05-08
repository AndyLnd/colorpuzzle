import React, {useState} from 'react';
import Board from './Board';
import {
  RichPosition,
  Position,
  getPosition,
  isSame,
  isInBounds,
  toDirection,
  sortDirection,
  addPositionsWrap,
} from './position';
import {rndInt, rndArrayElement} from './util';

const makePath = (width: number, height: number, color: number): RichPosition[] => {
  let isDone = false;
  let steps: Position[] = [];
  const minLength = width + height;

  while (!isDone) {
    let isPossible = true;
    let currentStep = {x: rndInt(width), y: rndInt(height)};
    steps = [currentStep];

    while (!isDone && isPossible) {
      const candidates = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        .map(([x, y]) => addPositionsWrap(currentStep, {x, y}, width, height))
        .filter(
          pos =>
            isInBounds(pos, width, height) &&
            steps.every((step, index) => (index === 0 && steps.length > minLength) || !isSame(step, pos))
        );
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
      const dir = [prev, next]
        .map(pos => toDirection(pos, point))
        .sort(sortDirection)
        .join('');
      return {x: point.x, y: point.y, dir, color};
    }
  );
};

const makeMap = (width: number, height: number) => {
  const colors = [
    ...makePath(width, height, 1),
    ...makePath(width, height, 2),
    ...makePath(width, height, 3),
    ...makePath(width, height, 4),
  ];
  return Array.from({length: width * height}, (el, index) => {
    const {x, y} = getPosition(index, width);
    return colors.filter(color => color.x === x && color.y === y);
  });
};

export default () => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [map, setMap] = useState(makeMap(width, height));
  return (
    <>
      <Board width={width} height={height} map={map} />
      <button style={{position: 'absolute'}} onClick={() => setMap(makeMap(width, height))}>
        new
      </button>
    </>
  );
};
