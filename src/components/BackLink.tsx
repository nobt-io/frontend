import * as React from 'react';
import { useHistory } from 'react-router';

export default function BackLink() {
  const history = useHistory();

  return (
    <a
      className={
        'text-white hover:text-white hover:no-underline cursor-pointer flex items-center'
      }
      onClick={() => history.goBack()}
    >
      <i className="material-icons">chevron_left</i>
    </a>
  );
}
