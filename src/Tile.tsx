/** @jsxImportSource @emotion/react */

import {Tile} from './position';
import {MouseEvent} from 'react';
import {colors, exitsToPath} from './tileRenderer';
import type {Interpolation, Theme} from '@emotion/react';

interface TileProps {
  onClick: (event: MouseEvent<HTMLOrSVGElement>) => void;
  onRightClick: (event: MouseEvent<HTMLOrSVGElement>) => void;
  tile: Tile;
}

const tileStyle: Interpolation<Theme> = {
  backgroundSize: 'cover',
  strokeWidth: 0.5,
  '& path': {
    mixBlendMode: 'screen',
  },
  '& g': {
    transition: 'all .2s ease-in-out',
  },
};

export default ({tile: {x, y, strokes, rotation}, onClick, onRightClick}: TileProps) => {
  return (
    <svg x={x} y={y} css={tileStyle} onClick={onClick} onContextMenu={onRightClick} pointerEvents="all">
      <g transform={`rotate(${rotation * 90} .5 .5)`}>
        {strokes.map(({color, exits}) => (
          <path key={`${color}-${exits.join('-')}`} stroke={colors[color]} d={exitsToPath(exits)} />
        ))}
        <rect x="0" y="0" width="100%" height="100%" fill="none" />
      </g>
    </svg>
  );
};
