/** @jsx jsx */
import {jsx, ObjectInterpolation} from '@emotion/core';
import {Position, Exits, hasNorthSouth, hasNorth, hasEastWest, hasWest, Tile} from './position';
import {MouseEvent} from 'react';

interface TileProps extends Position {
  lines: Tile[];
  rotation: number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  size: number;
}

const tileStyle = (size: number, x: number, y: number): ObjectInterpolation<undefined> => ({
  position: 'absolute',
  width: `${size}px`,
  height: `${size}px`,
  transition: 'transform .2s ease-in-out',
  left: `${x * size}px`,
  top: `${y * size}px`,
});

const cornerStyle = (size: number, colNum: number, exits: Exits): ObjectInterpolation<undefined> => {
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
