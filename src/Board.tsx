/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useContext} from 'react';
import Tile from './Tile';
import {getPosition} from './position';
import FullScreenCenter from './FullScreenCenter';
import css from '@emotion/css';
import {GameContext} from './GameProvider';

const boardStyle = (width: number, height: number, tileSize: number) =>
  css({
    position: 'absolute',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: tileSize * width,
    height: tileSize * height,
  });

export default (props: React.Props<HTMLDivElement>) => {
  const {rotate, map, width, height, tileSize} = useContext(GameContext);
  return (
    <FullScreenCenter {...props}>
      <div css={boardStyle(width, height, tileSize)}>
        {map.map((tile, index) => {
          const {x, y} = getPosition(index, width);
          return (
            <Tile strokes={tile.strokes} rotation={tile.rotation} onClick={() => rotate(index)} key={`${x},${y}`} />
          );
        })}
      </div>
    </FullScreenCenter>
  );
};
