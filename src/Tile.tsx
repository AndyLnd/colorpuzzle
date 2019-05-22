/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Tile} from './position';
import {MouseEvent} from 'react';
import {colors, exitsToPath} from './tileRenderer';

interface TileProps {
  onClick: (event: MouseEvent<HTMLOrSVGElement>) => void;
  isSolved: boolean;
  tile: Tile;
}

const tileStyle = {
  backgroundSize: 'cover',
  strokeWidth: 0.5,
  '& path': {
    'mix-blend-mode': 'screen',
  },
  '& g': {
    transition: 'all .2s ease-in-out',
  },
};

export default ({tile: {x, y, strokes, rotation}, onClick, isSolved}: TileProps) => {
  return (
    <svg x={x} y={y} css={tileStyle} onClick={onClick}>
      <g opacity={isSolved ? 1 : 0.8} transform={`rotate(${rotation * 90} .5 .5)`}>
        {strokes.map(({color, exits}) => (
          <path stroke={colors[color]} d={exitsToPath(exits)} />
        ))}
      </g>
    </svg>
  );
};
