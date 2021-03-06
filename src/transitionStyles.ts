import {css} from '@emotion/react';

export const scaleInTransition = css`
  &.scaleIn-enter {
    opacity: 0;
    transform: scale(0.8);
  }
  &.scaleIn-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 300ms;
  }
  &.scaleIn-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.scaleIn-exit-active {
    opacity: 0;
    transform: scale(1.2);
    transition: all 300ms;
  }
`;


