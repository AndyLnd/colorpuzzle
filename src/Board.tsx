/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState, useEffect} from 'react';
import Tile from './Tile';
import {getPosition, PosGroup} from './position';
import FullScreenCenter from './FullScreenCenter';
import css from '@emotion/css';

const makeRotationMap = (length: number) => Array.from({length}, () => Math.floor(Math.random() * 16));

interface BoardProps {
  width: number;
  height: number;
  map: PosGroup[];
  onRotate: (rotation: number[]) => void;
  size: number;
}

const boardStyle = (width: number, height: number, size: number) =>
  css({
    position: 'absolute',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: size * width,
    height: size * height,
  });

export default ({width = 4, height = 4, map, onRotate, size}: BoardProps) => {
  const [rotation, setRotation] = useState(makeRotationMap(width * height));
  useEffect(() => setRotation(makeRotationMap(width * height)), [width, height, map]);
  function rotate(num: number) {
    const newRotation = rotation.map((tile, index) => (index === num ? tile + 1 : tile));
    setRotation(newRotation);
    onRotate(newRotation);
  }
  return (
    <FullScreenCenter>
      <div css={boardStyle(width, height, size)}>
        {map.map((tile, index) => {
          const {x, y} = getPosition(index, width);
          return (
            <Tile
              lines={tile.tiles}
              rotation={rotation[index]}
              onClick={() => rotate(index)}
              x={x}
              y={y}
              size={size}
              key={`${x},${y}`}
            />
          );
        })}
      </div>
    </FullScreenCenter>
  );
};
