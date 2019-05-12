/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import FullScreenCenter from './FullScreenCenter';

interface SelectProps {
  onSelect: (width: number, height: number) => void;
}

const containerStyle = css({
  backgroundColor: 'rgba(255,255,255,.5)',
  maxWidth: 250,
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
  padding: '16px',
  fontWeight: 'bold',
  fontSize: '16px',
  backgroundColor: '#dde',
  margin: '8px',
  color: '#667',
  borderRadius: 4,
  boxShadow: '1px 1px 0 #eef inset, -1px -1px 0 #ccd inset',
  cursor: 'pointer',
  width: 100,
  '&:hover': {
    backgroundColor: '#eef',
  },
});

const sizes = Array.from({length: 8}, (_, index) => ({width: index + 3, height: index + 3}));

export default ({onSelect}: SelectProps) => (
  <FullScreenCenter>
    <div css={containerStyle}>
      {sizes.map(({width, height}) => {
        const key = `${width} x ${height}`;
        return (
          <button key={key} css={buttonStyle} onClick={() => onSelect(width, height)}>
            {key}
          </button>
        );
      })}
    </div>
  </FullScreenCenter>
);
