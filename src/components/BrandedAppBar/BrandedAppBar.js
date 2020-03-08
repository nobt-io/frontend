import * as React from 'react';
import BackLink from '../BackLink';

const BrandedAppBar = ({ canGoBack }) => {
  return (
    <div className={`bg-black h-24 px-10 flex flex-row items-center}`}>
      {canGoBack === true ? <BackLink /> : null}
      <h1 className="text-white hover:no-underline cursor-pointer font-logo text-3xl flex items-center">
        nobt.io
      </h1>
    </div>
  );
};

export default BrandedAppBar;
