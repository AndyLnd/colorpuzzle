/** @jsxImportSource @emotion/react */

import React, {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import Board from './Board';
import LevelSelect from './LevelSelect';
import {scaleInTransition} from './transitionStyles';
import {GameContext} from './GameProvider';
import SolveBackground from './SolveBackground';
import FullScreenCenter from './FullScreenCenter';
import Finish from './Finish';

export default () => {
  const {isSolved, isStarted, introMap, map, rotateTile, width, height, reset, tileSize, showBackground} = useContext(
    GameContext
  );
  return (
    <React.Fragment>
      <CSSTransition in={showBackground} timeout={{enter: 2000, exit: 300}} unmountOnExit classNames="fadeIn">
        <SolveBackground />
      </CSSTransition>
      <CSSTransition in={isStarted} timeout={300} unmountOnExit mountOnEnter classNames="scaleIn">
        <FullScreenCenter css={scaleInTransition}>
          <Board
            map={map}
            rotateTile={rotateTile}
            width={width}
            height={height}
            tileSize={tileSize}
            isSolved={isSolved}
          />
          <CSSTransition in={isSolved} timeout={500} unmountOnExit classNames="growIn">
            <Finish onClick={reset}>reset</Finish>
          </CSSTransition>
        </FullScreenCenter>
      </CSSTransition>
      <CSSTransition in={!isStarted} timeout={300} unmountOnExit classNames="scaleIn">
        <FullScreenCenter css={scaleInTransition}>
          <Board map={introMap} rotateTile={rotateTile} width={4} height={4} tileSize={50} />
          <LevelSelect css={scaleInTransition} />
        </FullScreenCenter>
      </CSSTransition>
    </React.Fragment>
  );
};
