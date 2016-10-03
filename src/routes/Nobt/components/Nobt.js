import React from 'react'
import styles from './Nobt.scss'

import Button from 'components/Button';
import Header from 'components/Header'
import NobtSummary from 'components/NobtSummary'

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;
    this.props.loadNobt(nobtId);
  },

  render: function () {
    return (
      <div className={styles.Nobt}>
        <Header showButton={true}>
          <Button className={styles.button} icon="add_box" onClick={this.createNobt}>Add Nobt</Button>
        </Header>
        <NobtSummary>

        </NobtSummary>
      </div>)
  }
});

export default Nobt
