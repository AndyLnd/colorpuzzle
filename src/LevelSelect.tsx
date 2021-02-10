/** @jsxImportSource @emotion/react */

import {css} from '@emotion/react';
import React from 'react';
import {useContext} from 'react';
import {GameContext} from './GameProvider';

const containerStyle = css({
  backgroundColor: 'rgba(255,255,255,.5)',
  maxWidth: 160,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0',
  borderRadius: 4,
});

const buttonStyle = css({
  // border: '1px solid #dde',
  border: 'none',
  padding: '8px',
  fontWeight: 500,
  fontSize: '14px',
  backgroundColor: '#dde',
  margin: '4px',
  color: '#667',
  borderRadius: 4,
  boxShadow: '1px 1px 0 #eef inset, -1px -1px 0 #ccd inset',
  cursor: 'pointer',
  width: 64,
  '&:hover': {
    backgroundColor: '#eef',
  },
});

const sizes = Array.from({length: 8}, (_, index) => ({width: index + 3, height: index + 3}));

export default (props: React.Props<HTMLDivElement>) => {
  const {start} = useContext(GameContext);
  return (
    <React.Fragment>
      <div css={containerStyle}>
        {sizes.map(({width, height}) => {
          const key = `${width}×${height}`;
          return (
            <button key={key} css={buttonStyle} onClick={() => start(width, height)}>
              {key}
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
};
