/** @jsx jsx */
import {jsx, css, keyframes} from '@emotion/core';
import React, {useRef, useContext} from 'react';
import {rndArrayElement} from './util';
import {GameContext} from './GameProvider';

const style = (boardSize: number) =>
  css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 100,
    cursor: 'pointer',
    marginTop: boardSize / -8,
    animation: `${glow} 1s ease-in-out alternate infinite`,
    '&.growIn-enter': {
      fontSize: 0,
      marginTop: 0,
    },
    '&.growIn-enter-active': {
      fontSize: 100,
      marginTop: boardSize / -8,
      transition: 'font-size .5s ease-in-out, margin-top .5s ease-in-out',
    },
  });

const glow = keyframes({
  '0%': {
    textShadow: '0 0 0px rgba(255,255,255,.6)',
  },
  '100%': {
    textShadow: '0 0 9px rgba(255,255,255,.6)',
  },
});
const animals = Array.from('🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵');
export default (props: React.HTMLAttributes<HTMLDivElement>) => {
  const animal = useRef(rndArrayElement(animals));
  const {height, tileSize} = useContext(GameContext);
  return (
    <div css={style(height * tileSize)} {...props}>
      {animal.current}
    </div>
  );
};
