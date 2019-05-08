/** @jsx jsx */
import {jsx, ObjectInterpolation} from '@emotion/core';
import {RichPosition, Position} from './position';

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
  top: `${x * size}px`,
  left: `${y * size}px`,
});

type CornerStyleFunc = (size: number, colNum: number, dir: string) => ObjectInterpolation<undefined>;
const cornerStyle: CornerStyleFunc = (size, colNum, dir) => {
  const offset = size / 4;
  const color = ['#f00', '#12f', '#080', '#fb0'][colNum - 1];
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
      top: dir === 'ns' ? `${-size}px` : ['sw', 'se', 'we'].includes(dir) ? `${offset}px` : 'unset',
      bottom: ['nw', 'ne'].includes(dir) ? `${offset}px` : 'unset',
      right: dir === 'we' ? `${-size}px` : ['ne', 'se', 'ns'].includes(dir) ? `${offset}px` : 'unset',
      left: ['sw', 'nw'].includes(dir) ? `${offset}px` : 'unset',
    },
  };
};

export default ({lines, rotation, onClick, x, y, size}: TileProps) => (
  <div css={tileStyle(size, x, y)} style={{transform: `rotate(${rotation * 90}deg)`}} onClick={onClick}>
    {lines.map(({color, dir}) => (
      <div css={cornerStyle(size, color, dir)} />
    ))}
  </div>
);
