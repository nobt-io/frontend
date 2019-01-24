import * as React from 'react';
import { ProgressBar } from 'react-toolbox-legacy/lib/progress_bar/index';
import ProgressBarTheme from './ProgressBarTheme.scss';

export default () => (
  <ProgressBar theme={ProgressBarTheme} type="circular" mode="indeterminate" />
);
