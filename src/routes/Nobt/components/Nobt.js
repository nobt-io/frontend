import React from 'react'
import styles from './Nobt.scss'

import Button from 'components/Button';
import Header from 'components/Header'
import NobtSummary from 'components/NobtSummary'
import TransactionList from 'components/TransactionList'
import {Tab, Tabs} from 'react-toolbox';

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;
    this.props.loadNobt(nobtId);
  },

  render: function () {
    return (
      <div className={styles.nobt}>
        <Header showButton={true}>
          <Button className={styles.button} icon="add_box" onClick={this.createNobt}>Add Nobt</Button>
        </Header>
        <NobtSummary nobtName={this.props.name} total={this.props.total} member={this.props.member}/>
        <div>
          <Tabs
            theme={{pointer: styles.pointer, tabs: styles.tabs}}
            index={this.props.tabIndex}
            onChange={this.props.changeTab} fixed>
            <Tab label="Transactions"><TransactionList></TransactionList></Tab>
            <Tab label="Expenses"><small>Second Content</small></Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

export default Nobt
