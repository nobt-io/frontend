import * as React from 'react';
import { AppBar } from 'react-toolbox-legacy/lib/app_bar/index';
import BrandedAppBarTheme from './BrandedAppBarTheme.scss';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import { useHistory } from 'react-router-dom';

const BrandedAppBar = ({ canGoBack }) => {
  const history = useHistory();

  return (
    <AppBar
      theme={BrandedAppBarTheme}
      leftIcon={canGoBack === true ? <FontIcon value="chevron_left" /> : null}
      onLeftIconClick={canGoBack === true ? () => history.goBack() : null}
    >
      <h1 className={BrandedAppBarTheme.title}>
        <a href={location.protocol + '//' + location.host}>nobt.io</a>
      </h1>
    </AppBar>
  );
};

export default BrandedAppBar;
