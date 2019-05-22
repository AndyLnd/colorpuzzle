import {css, Global} from '@emotion/core';
import React from 'react';
import Game from './Game';
import GameProvider from './GameProvider';

const globalStyle = css({
  body: {
    margin: 0,
    background: 'linear-gradient(135deg, #45484d 0%,#000000 100%);',
    minHeight: '100vh',
    overflow: 'hidden',
  },
});

export default () => {
  return (
    <>
      <Global styles={globalStyle} />
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  );
};
