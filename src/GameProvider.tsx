import React, {useReducer, useEffect} from 'react';
import {makeMap, checkSolved, makeDemoMap} from './map';
import {Map, Tile} from './position';
import {rndArrayElement, rndInt} from './util';

interface State {
  width: number;
  height: number;
  introMap: Map;
  map: Map;
  isSolved: boolean;
  isStarted: boolean;
  tileSize: number;
  showBackground: boolean;
}

interface Context extends State {
  start: (width: number, height: number) => void;
  rotateTile: (tile: Tile, turns: number) => void;
  reset: () => void;
}

type Action =
  | {type: 'start'; payload: {width: number; height: number}}
  | {type: 'rotate'; payload: {tile: Tile; turns: number}}
  | {type: 'reset'}
  | {type: 'showBackground'}
  | {type: 'rotateDemo'};

const defaultState: State = {
  width: 4,
  height: 4,
  introMap: makeDemoMap(),
  map: makeMap(4, 4, true),
  isSolved: false,
  isStarted: false,
  tileSize: 50,
  showBackground: false,
};

const defaultContext = {
  ...defaultState,
  start: () => {},
  rotateTile: () => {},
  reset: () => {},
};

export const GameContext = React.createContext<Context>(defaultContext);

const gameReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'start': {
      const {width, height} = action.payload;
      const totalSize = Math.min(document.body.offsetHeight, document.body.offsetWidth, 532) - 32;
      const tileSize = Math.floor(totalSize / (Math.max(width, height) * 4)) * 4;
      return {
        ...state,
        isSolved: false,
        width,
        height,
        map: makeMap(width, height, true),
        isStarted: true,
        tileSize,
      };
    }
    case 'rotate': {
      const map = state.map.map((tile) =>
        tile === action.payload.tile ? {...tile, rotation: tile.rotation + action.payload.turns} : tile
      );
      const isSolved = state.isStarted && checkSolved(map, state.width, state.width);
      return {...state, map, isSolved};
    }
    case 'reset': {
      return {
        ...state,
        introMap: makeDemoMap(),
        isStarted: false,
        showBackground: false,
      };
    }
    case 'showBackground': {
      return {
        ...state,
        showBackground: true,
      };
    }
    case 'rotateDemo': {
      const randomTile = rndArrayElement(state.introMap.filter((t) => t.strokes.length > 0));
      const introMap = state.introMap.map((tile) =>
        tile === randomTile ? {...tile, rotation: tile.rotation + (rndInt(2) > 0 ? 1 : -1)} : tile
      );
      return {...state, introMap};
    }
    default: {
      return state;
    }
  }
};

export default ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState);
  const start = (width: number, height: number) => dispatch({type: 'start', payload: {width, height}});
  const rotateTile = (tile: Tile, turns: number) => dispatch({type: 'rotate', payload: {tile, turns}});
  const reset = () => dispatch({type: 'reset'});
  const {width, height, introMap, map, isSolved, isStarted, tileSize, showBackground} = state;
  useEffect(() => {
    let id: number;
    if (isSolved) {
      id = window.setTimeout(() => {
        dispatch({type: 'showBackground'});
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isSolved]);
  useEffect(() => {
    const loop = () => {
      id = window.setTimeout(() => {
        dispatch({type: 'rotateDemo'});
        loop();
      }, rndInt(600) + 200);
    };
    let id: number;
    if (!isStarted) {
      loop();
    }
    return () => {
      clearTimeout(id);
    };
  }, [isStarted]);

  return (
    <GameContext.Provider
      value={{
        width,
        height,
        isSolved,
        introMap,
        map,
        start,
        rotateTile,
        reset,
        isStarted,
        tileSize,
        showBackground,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
