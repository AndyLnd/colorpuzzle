import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import {getPosition, PosGroup, Position} from './position';
import FullScreenCenter from './FullScreenCenter';

const makeRotationMap = (length: number) => Array.from({length}, () => Math.floor(Math.random() * 16));

interface BoardProps {
  width: number;
  height: number;
  map: PosGroup[];
  onRotate: (rotation: number[]) => void;
}

export default ({width = 4, height = 4, map, onRotate}: BoardProps) => {
  const [rotation, setRotation] = useState(makeRotationMap(width * height));
  useEffect(() => setRotation(makeRotationMap(width * height)), [width, height, map]);
  function rotate(num: number) {
    const newRotation = rotation.map((tile, index) => (index === num ? tile + 1 : tile));
    setRotation(newRotation);
    onRotate(newRotation);
  }
  const size = Math.floor(100 / Math.max(width, height)) * 4;
  return (
    <FullScreenCenter>
      <div style={{width: `${size * width}px`, height: `${size * height}px`, position: 'relative'}}>
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
