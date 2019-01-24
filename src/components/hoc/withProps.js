import React from 'react';

const withProps = additionalProps => Component => props => {
  return <Component {...props} {...additionalProps} />;
};

export default withProps;
