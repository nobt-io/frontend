import * as React from 'react';
import classNames from 'classnames';
import styles from './Item.scss';
import ItemButtonTheme from './ItemButtonTheme.scss';
import { Button as RTButton } from 'react-toolbox-legacy/lib/button/index';

export default ({ children, expanded, disabled }) => (
  <div
    className={classNames(styles.item, {
      [styles.expanded]: expanded,
    })}
  >
    {React.Children.map(children, child => {
      switch (child.type) {
        case RTButton: {
          return React.cloneElement(child, {
            disabled,
            className: classNames({
              [ItemButtonTheme.expanded]: expanded,
            }),
            floating: true,
            primary: true,
          });
        }

        default: {
          return React.cloneElement(child, {
            disabled,
            expanded,
          });
        }
      }
    })}
  </div>
);
