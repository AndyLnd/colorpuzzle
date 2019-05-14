/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import Board from './Board';
import LevelSelect from './LevelSelect';
import {scaleInTransition, fadeInTransition} from './transitionStyles';
import {GameContext} from './GameProvider';
import SolveBackground from './SolveBackground';

export default () => {
  const {isSolved, isStarted} = useContext(GameContext);
  return (
    <React.Fragment>
      <CSSTransition in={isStarted && isSolved} timeout={1000} unmountOnExit mountOnEnter classNames="fadeIn">
        <SolveBackground css={fadeInTransition} />
      </CSSTransition>
      <CSSTransition in={isStarted && !isSolved} timeout={300} unmountOnExit mountOnEnter classNames="scaleIn">
        <Board css={scaleInTransition} />
      </CSSTransition>
      <CSSTransition in={!isStarted || isSolved} timeout={300} unmountOnExit classNames="scaleIn">
        <LevelSelect css={scaleInTransition} />
      </CSSTransition>
    </React.Fragment>
  );
};
