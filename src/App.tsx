import React, {useState} from 'react';
import Board from './Board';
import {makeMap} from './map';

export default () => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [map, setMap] = useState(makeMap(width, height));
  return (
    <>
      <Board width={width} height={height} map={map} />
      <button style={{position: 'absolute'}} onClick={() => setMap(makeMap(width, height))}>
        new
      </button>
    </>
  );
};
