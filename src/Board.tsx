/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useContext} from 'react';
import Tile from './Tile';
import {getPosition} from './position';
import FullScreenCenter from './FullScreenCenter';
import css from '@emotion/css';
import {GameContext} from './GameProvider';

const boardStyle = (width: number, height: number, size: number) =>
  css({
    position: 'absolute',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: size * width,
    height: size * height,
  });

export default (props: React.Props<HTMLDivElement>) => {
  const {rotate, rotation, map, width, height} = useContext(GameContext);
  const totalSize = Math.min(document.body.offsetHeight, document.body.offsetWidth, 532) - 32;
  const size = Math.floor(totalSize / (Math.max(width, height) * 4)) * 4;
  return (
    <FullScreenCenter {...props}>
      <div css={boardStyle(width, height, size)}>
        {map.map((tile, index) => {
          const {x, y} = getPosition(index, width);
          return (
            <Tile
              lines={tile.tiles}
              rotation={rotation[index]}
              onClick={() => rotate(index)}
              x={x}
              y={y}
              size={size}
              key={`${x},${y}`}
            />
          );
        })}
      </div>
    </FullScreenCenter>
  );
};
