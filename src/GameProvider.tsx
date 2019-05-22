import React, {useReducer} from 'react';
import {makeMap, checkSolved, makeDemoMap} from './map';
import {Map} from './position';

interface State {
  width: number;
  height: number;
  map: Map;
  isSolved: boolean;
  isStarted: boolean;
  tileSize: number;
}

interface Context extends State {
  start: (width: number, height: number) => void;
  rotate: (num: number) => void;
}

type Action = {type: 'start'; payload: {width: number; height: number}} | {type: 'rotate'; payload: number};

const defaultState: State = {
  width: 4,
  height: 4,
  map: makeDemoMap(),
  isSolved: false,
  isStarted: false,
  tileSize: 50,
};

const defaultContext = {
  ...defaultState,
  start: () => {},
  rotate: () => {},
};

export const GameContext = React.createContext<Context>(defaultContext);

const gameReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'start': {
      const {width, height} = action.payload;
      const totalSize = Math.min(document.body.offsetHeight, document.body.offsetWidth, 532) - 32;
      const tileSize = Math.floor(totalSize / (Math.max(width, height) * 4)) * 4;
      const map = makeMap(width, height, true);
      return {
        isSolved: false,
        width,
        height,
        map,
        isStarted: true,
        tileSize,
      };
    }
    case 'rotate': {
      const num = action.payload;
      const map = state.map.map((tile, index) => (index === num ? {...tile, rotation: tile.rotation + 1} : tile));
      const isSolved = state.isStarted && checkSolved(map, state.width, state.width);
      return {...state, map, isSolved};
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
  const {width, height, map, isSolved, isStarted, tileSize} = state;

  return (
    <GameContext.Provider
      value={{
        width,
        height,
        isSolved,
        map,
        start,
        rotate,
        isStarted,
        tileSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
