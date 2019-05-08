/** @jsx jsx */
import {jsx, ObjectInterpolation} from '@emotion/core';
import {RichPosition, Position, Exits, hasNorthSouth, hasNorth, hasEastWest, hasWest} from './position';

interface TileProps extends Position {
  lines: RichPosition[];
  rotation: number;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  size: number;
}

type TileStyleFunc = (size: number, x: number, y: number) => ObjectInterpolation<undefined>;

const tileStyle: TileStyleFunc = (size, x, y) => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  transition: 'transform .2s ease-in-out',
  left: `${x * size}px`,
  top: `${y * size}px`,
});

type CornerStyleFunc = (size: number, colNum: number, exits: Exits) => ObjectInterpolation<undefined>;
const cornerStyle: CornerStyleFunc = (size, colNum, exits) => {
  const offset = size / 4;
  const color = ['#f00', '#12f', '#080', '#fb0'][colNum];
  const top = hasNorthSouth(exits) ? -size : !hasNorth(exits) ? offset : -size * 2 - offset;
  const left = hasEastWest(exits) ? -size : !hasWest(exits) ? offset : -size * 2 - offset;
  return {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    overflow: 'hidden',
    mixBlendMode: 'screen',
    '&::before': {
      position: 'absolute',
      display: 'block',
      content: '""',
      borderRadius: `${offset * 3}px`,
      height: `${size * 3}px`,
      width: `${size * 3}px`,
      boxSizing: 'border-box',
      border: `${size / 2}px solid ${color}`,
      top: `${top}px`,
      left: `${left}px`,
    },
  };
};

export default ({lines, rotation, onClick, x, y, size}: TileProps) => (
  <div css={tileStyle(size, x, y)} style={{transform: `rotate(${rotation * 90}deg)`}} onClick={onClick}>
    {lines.map(({color, exits}) => (
      <div css={cornerStyle(size, color, exits)} />
    ))}
  </div>
);
