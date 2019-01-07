import * as React from 'react';
import Button from 'components/Button';
import theme from './ContinueButtonTheme.scss';

export default props => (
  <Button raised primary theme={theme} rightIcon {...props} />
);
