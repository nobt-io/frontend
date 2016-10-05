import React from "react";

export const SimpleLayout = ({children}) => (
  <div>
    {children}
  </div>
);

SimpleLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default SimpleLayout
