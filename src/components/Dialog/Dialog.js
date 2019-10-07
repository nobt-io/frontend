import React from 'react';
import { Dialog as RTDialog } from 'react-toolbox-legacy/lib/dialog';
import { useHistory } from 'react-router-dom';

export default function Dialog(props) {
  const history = useHistory();

  return (
    <RTDialog
      active={true}
      onOverlayClick={() => history.goBack()}
      {...props}
      theme={props.theme}
    />
  );
}
