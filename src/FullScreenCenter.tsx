/** @jsxImportSource @emotion/react */

import {css} from '@emotion/react';
import React from 'react';

const style = css({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
export default (props: React.Props<HTMLDivElement>) => <div css={style} {...props} />;
