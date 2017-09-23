import * as React from "react";
import classNames from "classnames";
import ItemStyles from "./Item.scss"
import ItemButtonTheme from "./ItemButtonTheme.scss"
import { Button as RTButton } from "react-toolbox/lib/button/index";

export default ({children, expanded, disabled}) =>
  <div className={classNames(ItemStyles.item, {
    [ItemStyles.expanded]: expanded
  })}>
    {
      React.Children.map(children, child => {
        switch (child.type) {
          case RTButton: {
            return React.cloneElement(child, {
              disabled,
              theme: ItemButtonTheme,
              className: classNames({
                [ItemButtonTheme.expanded]: expanded
              }),
              floating: true,
              primary: true
            })
          }

          default: {
            return React.cloneElement(child, {
              disabled,
              expanded
            });
          }
        }
      })
    }
  </div>;
