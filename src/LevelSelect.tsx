/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import FullScreenCenter from './FullScreenCenter';

interface SelectProps {
  onSelect: (width: number, height: number) => void;
}

const buttonStyle = css({
  border: '1px solid #dde',
  padding: '16px',
  fontWeight: 'bold',
  fontSize: '16px',
  backgroundColor: '#dde',
  margin: '8px',
  color: '#667',
  borderRadius: '8px',
  boxShadow: '2px 2px 0 #eef inset, -2px -2px 0 #ccd inset',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#eef',
  },
});

export default ({onSelect}: SelectProps) => (
  <FullScreenCenter>
    {[[3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8]].map(([width, height]) => (
      <button css={buttonStyle} onClick={() => onSelect(width, height)}>{`${width} x ${height}`}</button>
    ))}
  </FullScreenCenter>
);
