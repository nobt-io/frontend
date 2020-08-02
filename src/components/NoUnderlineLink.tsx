import { Link as RRLink, LinkProps } from 'react-router-dom';
import * as React from 'react';

export default function NoUnderlineLink({
  children,
  ...linkProps
}: React.PropsWithChildren<LinkProps>) {
  return (
    <RRLink
      {...linkProps}
      style={{
        textDecoration: 'none',
      }}
    >
      {children}
    </RRLink>
  );
}
