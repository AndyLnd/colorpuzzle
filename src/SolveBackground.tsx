/** @jsx jsx */
import {jsx, keyframes, ObjectInterpolation} from '@emotion/core';
import {useState, useEffect, useContext} from 'react';
import {GameContext} from './GameProvider';
import {renderMap} from './tileRenderer';

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

const solvedStyle = (size: number): ObjectInterpolation<undefined> => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundPosition: 'center',
  clipPath: 'circle(100%)',
  animation: `${moveXAni(size)} 5s ease-in-out infinite, 
                ${moveYAni(size)} 5s linear infinite`,
});

const size = 64;

export default (props: React.Props<HTMLDivElement>) => {
  const {width, height, map, rotation, isSolved} = useContext(GameContext);
  const [bg, setBG] = useState('data:,');
  useEffect(() => {
    if (isSolved) {
      const rendered = renderMap(map, rotation, width, height, size * 2);
      setBG(rendered.toDataURL());
    }
  }, [isSolved]);
  return (
    <div
      css={solvedStyle(size * width)}
      style={{backgroundSize: `${size * width}px`, backgroundImage: `url(${bg})`}}
      {...props}
    />
  );
};
