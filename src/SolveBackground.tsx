/** @jsx jsx */
import {jsx, keyframes, ObjectInterpolation} from '@emotion/core';
import {useContext} from 'react';
import {GameContext} from './GameProvider';
import {svgMap} from './tileRenderer';

export const fadeInTransition = {};

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
  opacity: 0.3,
  animation: `${moveXAni(size)} 5s ease-in-out infinite, 
                ${moveYAni(size)} 5s linear infinite`,
  '&.fadeIn-enter': {
    opacity: 0,
  },
  '&.fadeIn-enter-active': {
    opacity: 0.3,
    transition: 'opacity 1.5s .5s',
  },
  '&.fadeIn-exit': {
    opacity: 0.3,
  },
  '&.fadeIn-exit-active': {
    opacity: 0,
    transition: 'opacity .3s',
  },
});

const size = 64;

export default (props: React.Props<HTMLDivElement>) => {
  const {width, height, map} = useContext(GameContext);
  const rendered = svgMap(map, width, height, size * 2);
  const bg = `data:image/svg+xml;utf8,${rendered.replace(/#/g, '%23')}`;
  return (
    <div
      css={solvedStyle(size * width)}
      style={{backgroundSize: `${size * width}px`, backgroundImage: `url('${bg}')`}}
      {...props}
    />
  );
};
