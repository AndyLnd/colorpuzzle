/** @jsx jsx */
import {jsx, css, Global, keyframes} from '@emotion/core';
import React, {useState, useRef} from 'react';
import Board from './Board';
import {makeMap, checkSolved} from './map';
import LevelSelect from './LevelSelect';
import {renderMap} from './tileRenderer';

const globalStyle = css({
  body: {
    margin: 0,
    background: 'linear-gradient(135deg, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%)',
    minHeight: '100vh',
  },
});

const revealAni = keyframes({
  '0%': {
    clipPath: 'circle(0%)',
  },
  '100%': {
    clipPath: 'circle(100%)',
  },
});

const moveXAni = (size: number) =>
  keyframes({
    '0%': {
      backgroundPositionX: '50%',
    },
    '50%': {
      backgroundPositionX: `calc(50% - ${size / 2}px)`,
    },
    '100%': {
      backgroundPositionX: '50%',
    },
  });

const moveYAni = (size: number) =>
  keyframes({
    '0%': {
      backgroundPositionY: '50%',
    },
    '100%': {
      backgroundPositionY: `calc(50% - ${size}px)`,
    },
  });

const solvedStyle = (size: number) =>
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundPosition: 'center',
    clipPath: 'circle(100%)',
    animation: `${revealAni} 1s linear .25s backwards, 
                ${moveXAni(size)} 5s ease-in-out infinite, 
                ${moveYAni(size)} 5s linear infinite`,
  });

const boardWrapperStyle = (visible: boolean) =>
  css({
    opacity: visible ? 1 : 0,
    transition: 'opacity .5s ease-in-out',
  });

export default () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [isSolved, setIsSolved] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [map, setMap] = useState(makeMap(width, height));
  const solvedBg = useRef('');
  const check = (rotation: number[]) => {
    const isSolved = checkSolved(map, rotation, width, height);
    setIsSolved(isSolved);
    if (isSolved) {
      const solvedCan = renderMap(map, rotation, width, height);
      solvedBg.current = solvedCan.toDataURL();
    }
  };
  const size = Math.floor(100 / Math.max(width, height)) * 4;
  return (
    <React.Fragment>
      <Global styles={globalStyle} />
      <div css={boardWrapperStyle(isGameStarted && !isSolved)}>
        {isGameStarted && <Board width={width} height={height} map={map} onRotate={check} size={size} />}
      </div>
      {isGameStarted && isSolved && (
        <div
          css={solvedStyle(size * width)}
          style={{backgroundSize: `${size * width}px`, backgroundImage: `url(${solvedBg.current})`}}
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
