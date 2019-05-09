import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import {RichPosition, getPosition} from './position';

const makeRotationMap = (length: number) => Array.from({length}, () => Math.floor(Math.random() * 16));

interface BoardProps {
  width: number;
  height: number;
  map: RichPosition[][];
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
  return (
    <div>
      {map.map((tile, index) => {
        const {x, y} = getPosition(index, width);
        return (
          <Tile
            lines={tile}
            rotation={rotation[index]}
            onClick={() => rotate(index)}
            x={x}
            y={y}
            size={60}
            key={`${x},${y}`}
          />
        );
      })}
    </div>
  );
};
