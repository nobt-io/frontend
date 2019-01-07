import * as React from 'react';
import MenuButtonTheme from './MenuButtonTheme.scss';
import classNames from 'classnames';

export default ({ children, expanded }) =>
  React.cloneElement(React.Children.only(children), {
    floating: true,
    theme: MenuButtonTheme,
    primary: true,
    className: classNames({
      [MenuButtonTheme.expanded]: expanded,
    }),
  });
