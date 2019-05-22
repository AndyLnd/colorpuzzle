/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import React, {useRef, useEffect, useContext} from 'react';
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
