import {css} from '@emotion/core';

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

export const fadeInTransition = css`
&.fadeIn-enter {
  opacity: 0;
}
&.fadeIn-enter-active {
  opacity: 1;
  transition: opacity 1s;
}
&.fadeIn-exit {
  opacity: 1;
}
&.fadeIn-exit-active {
  opacity: 0;
  transition: opacity 1s;
}
`
