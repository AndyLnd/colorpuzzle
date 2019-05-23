/** @jsx jsx */
import {jsx} from '@emotion/core';
import Tile from './Tile';
import {Map, Tile as TileType} from './position';

interface BoardProps {
  map: Map;
  width: number;
  height: number;
  rotateTile: (tile: TileType) => void;
  tileSize: number;
  isSolved?: boolean;
}

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
  opacity: isSolved ? 1 : 0.8,
  transition: 'all 1s ease-in-out',
});

export default ({map, width, height, rotateTile, tileSize, isSolved = false}: BoardProps) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} css={boardStyle(width, height, tileSize, isSolved)}>
      {map.map(tile => (
        <Tile tile={tile} onClick={() => !isSolved && rotateTile(tile)} key={`${tile.x},${tile.y}`} />
      ))}
    </svg>
  );
};
