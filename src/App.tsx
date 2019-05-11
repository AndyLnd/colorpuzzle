/** @jsx jsx */
import {jsx, css, Global} from '@emotion/core';
import React, {useState} from 'react';
import Board from './Board';
import {makeMap, checkSolved} from './map';
import LevelSelect from './LevelSelect';

const globalStyle = css`
  body: {
    margin: 0;
  }
`;

export default () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [isSolved, setIsSolved] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [map, setMap] = useState(makeMap(width, height));

  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      {isGameStarted && (
        <Board
          width={width}
          height={height}
          map={map}
          onRotate={(rotation: number[]) => setIsSolved(checkSolved(map, rotation, width, height))}
        />
      )}
      {(!isGameStarted || isSolved) && (
        <LevelSelect
          onSelect={(w, h) => {
            setMap(makeMap(w, h));
            setWidth(w);
            setHeight(h);
            setIsSolved(false);
            setIsGameStarted(true);
          }}
        />
      )}
    </React.Fragment>
  );
};
