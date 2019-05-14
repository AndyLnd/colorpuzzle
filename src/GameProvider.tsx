import React, {useReducer} from 'react';
import {makeMap, checkSolved} from './map';
import {PosGroup} from './position';

interface State {
  width: number;
  height: number;
  rotation: number[];
  map: PosGroup[];
  isSolved: boolean;
  isStarted: boolean;
}

interface Context extends State {
  start: (width: number, height: number) => void;
  rotate: (num: number) => void;
}

type Action = {type: 'start'; payload: {width: number; height: number}} | {type: 'rotate'; payload: number};

const defaultState: State = {
  width: 3,
  height: 3,
  rotation: [],
  map: [],
  isSolved: false,
  isStarted: false,
};

const defaultContext = {
  ...defaultState,
  start: () => {},
  rotate: () => {},
};

const makeRotationMap = (length: number) => Array.from({length}, () => Math.floor(Math.random() * 16));

export const GameContext = React.createContext<Context>(defaultContext);

const gameReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'start': {
      const {width, height} = action.payload;
      return {
        isSolved: false,
        width,
        height,
        map: makeMap(width, height),
        rotation: makeRotationMap(width * height),
        isStarted: true,
      };
    }
    case 'rotate': {
      const num = action.payload;
      const rotation = state.rotation.map((tile, index) => (index === num ? tile + 1 : tile));
      const isSolved = checkSolved(state.map, rotation, state.width, state.width);
      return {...state, rotation, isSolved};
    }
    default: {
      return state;
    }
  }
};

export default ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);
  const start = (width: number, height: number) => dispatch({type: 'start', payload: {width, height}});
  const rotate = (num: number) => dispatch({type: 'rotate', payload: num});
  const {width, height, map, rotation, isSolved, isStarted} = state;

  return (
    <GameContext.Provider
      value={{
        width,
        height,
        isSolved,
        map,
        rotation,
        start,
        rotate,
        isStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
