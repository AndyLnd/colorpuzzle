/** @jsx jsx */
import {jsx} from '@emotion/core';
import {TileContent} from './position';
import {MouseEvent, useEffect, useState} from 'react';
import {renderTile} from './tileRenderer';

interface TileProps extends TileContent {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const tileStyle = {
  transition: 'transform .2s ease-in-out',
  backgroundSize: 'cover',
  opacity: 0.8,
};

export default ({strokes, rotation, onClick}: TileProps) => {
  const [backgroundImage, setBackgroundImage] = useState('data:,');
  useEffect(() => {
    const can = renderTile(strokes);
    setBackgroundImage(can.toDataURL());
  }, [strokes]);
  return (
    <div
      css={tileStyle}
      style={{transform: `rotate(${rotation * 90}deg)`, backgroundImage: `url(${backgroundImage})`}}
      onClick={onClick}
    />
  );
};
