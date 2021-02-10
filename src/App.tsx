import {css, Global} from '@emotion/react';
import React from 'react';
import Game from './Game';
import GameProvider from './GameProvider';

const globalStyle = css({
  body: {
    margin: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,.05) 0, rgba(255,255,255,0) 3px,rgba(0,0,0,0) 30px,rgba(0,0,0,.05) 100%), 
      linear-gradient(90deg, rgba(255,255,255,.05) 0, rgba(255,255,255,0) 3px,rgba(0,0,0,0) 30px,rgba(0,0,0,.05) 100%),
      linear-gradient(135deg, #58484d 0%,#000008 100%)
      `,
    backgroundSize: 'auto 4px, 4px auto, auto',
    backgroundPosition: 'center',
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
