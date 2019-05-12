/** @jsx jsx */
import {jsx, ObjectInterpolation} from '@emotion/core';
import {Position, Tile} from './position';
import {MouseEvent, useRef, useEffect} from 'react';
import {renderTile} from './tileRenderer';

interface TileProps extends Position {
  lines: Tile[];
  rotation: number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  size: number;
}

const tileStyle = (size: number, x: number, y: number): ObjectInterpolation<undefined> => ({
  transition: 'transform .2s ease-in-out',
  backgroundSize: 'cover',
  opacity: 0.8,
});

export default ({lines, rotation, onClick, x, y, size}: TileProps) => {
  const backgroundImage = useRef('');
  useEffect(() => {
    const can = renderTile(lines);
    backgroundImage.current = can.toDataURL();
  }, [lines]);
  return (
    <div
      css={tileStyle(size, x, y)}
      style={{transform: `rotate(${rotation * 90}deg)`, backgroundImage: `url(${backgroundImage.current})`}}
      onClick={onClick}
    />
  );
};
