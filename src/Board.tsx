/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useContext} from 'react';
import Tile from './Tile';
import {GameContext} from './GameProvider';

const boardStyle = (width: number, height: number, tileSize: number, isSolved: boolean) => ({
  display: 'block',
  gridTemplateColumns: `repeat(${width}, 1fr)`,
  gridTemplateRows: `repeat(${height}, 1fr)`,
  width: tileSize * width,
  height: tileSize * height,
  background: isSolved ? 'rgba(0,0,0,.8)' : 'rgba(0,0,0,0)',
  padding: isSolved ? 32 : 0,
  transform: isSolved ? 'scale(.75)' : 'scale(1)',
  borderRadius: isSolved ? 64 : 0,
  transition: 'all .5s ease-in-out',
});

export default () => {
  const {rotate, map, width, height, tileSize, isSolved} = useContext(GameContext);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} css={boardStyle(width, height, tileSize, isSolved)}>
      {map.map((tile, index) => (
        <Tile tile={tile} isSolved={isSolved} onClick={() => rotate(index)} key={`${tile.x},${tile.y}`} />
      ))}
    </svg>
  );
};
