/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import Board from './Board';
import LevelSelect from './LevelSelect';
import {scaleInTransition, fadeInTransition} from './transitionStyles';
import {GameContext} from './GameProvider';
import SolveBackground from './SolveBackground';
import FullScreenCenter from './FullScreenCenter';

export default () => {
  const {isSolved, isStarted} = useContext(GameContext);
  return (
    <React.Fragment>
{/*
      <CSSTransition in={isStarted && isSolved} timeout={1000} unmountOnExit classNames="fadeIn">
        <SolveBackground css={fadeInTransition} />
      </CSSTransition>
*/}
      <CSSTransition in={isStarted} timeout={300} unmountOnExit mountOnEnter classNames="scaleIn">
        <FullScreenCenter css={scaleInTransition}>
          <Board />
        </FullScreenCenter>
      </CSSTransition>
      <CSSTransition in={isSolved} timeout={300} unmountOnExit classNames="scaleIn">
        <FullScreenCenter css={scaleInTransition}>
          <LevelSelect css={scaleInTransition} />
        </FullScreenCenter>
      </CSSTransition>
      <CSSTransition in={!isStarted} timeout={300} unmountOnExit classNames="scaleIn">
        <FullScreenCenter css={scaleInTransition}>
          <Board />
          <LevelSelect css={scaleInTransition} />
        </FullScreenCenter>
      </CSSTransition>
    </React.Fragment>
  );
};
