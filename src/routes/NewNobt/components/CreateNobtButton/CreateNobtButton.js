// npm module imports
import React from 'react'
import Button from 'react-toolbox/lib/button';

// local component imports
import Spinner from "components/Spinner"

// local imports
import styles from './CreateNobtButton.scss'

export const CreateNobtButton = (props, context) => (
  <div className={styles.createNobtButtonContainer}>
    {context.createNobtInProgress &&
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    }

    {!context.createNobtInProgress &&
    <Button
      theme={ {button: styles.createNobtButton} }
      disabled={!props.canClick}
      onClick={props.onClick}>
      Create Nobt
    </Button>
    }
  </div>
);

export default CreateNobtButton

CreateNobtButton.contextTypes = {
  createNobtInProgress: React.PropTypes.bool.isRequired
};

CreateNobtButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  canClick: React.PropTypes.bool.isRequired,
};
