import React, {useState} from 'react';
import Board from './Board';
import {makeMap, checkSolved} from './map';

export default () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [map, setMap] = useState(makeMap(width, height));
  return (
    <>
      <Board
        width={width}
        height={height}
        map={map}
        onRotate={(rotation: number[]) => console.log(checkSolved(map, rotation, width, height))}
      />
      <button style={{position: 'absolute'}} onClick={() => setMap(makeMap(width, height))}>
        new
      </button>
    </>
  );
};
