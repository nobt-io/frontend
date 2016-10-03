import React from 'react'
import styles from './Nobt.scss'

import Button from 'components/Button';
import Header from 'components/Header'
import NobtSummary from 'components/NobtSummary'
import TransactionList from 'components/TransactionList'
import ExpenseList from 'components/ExpenseList'
import {Tab, Tabs} from 'react-toolbox';

import {initialState} from '../modules/Nobt'

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;
    this.props.loadNobt(nobtId);

    this.props.changeTab(this.props.params.tab);
  },

  componentWillReceiveProps(nextProps) {

    var newTab = nextProps.params.tab;
    var oldTab = this.props.params.tab;

    if (newTab !== oldTab) {
      this.props.changeTab(newTab);
    }
  },

  getInitialState: function() {
    return initialState;
  },

  navigate(path) {
    this.props.history.push(path);
  },

  onTabChange(index) {

    var subRoutes = {
      0: 'transactions',
      1: 'expenses'
    };

    var subRoute = subRoutes[index] || 'transactions';

    this.navigate(`/nobt/${this.props.params.id}/${subRoute}`);
  },

  render: function () {
    return (
      <div className={styles.nobt}>
        <Header showButton={true}>
          <Button className={styles.button} icon="add_box"
                  onClick={ () => this.navigate(`/nobt/${this.props.params.id}/expenses/add`) }>Add expense</Button>
        </Header>
        <NobtSummary nobtName={this.props.name} total={this.props.total} members={this.props.members}/>
        <div>
          <Tabs
            theme={{pointer: styles.pointer, tabs: styles.tabs, tag: styles.tab}}
            index={this.props.tabIndex}
            onChange={this.onTabChange} fixed>
            <Tab label="Transactions"><TransactionList transactions={this.props.transactions}/></Tab>
            <Tab label="Expenses"><ExpenseList expenses={this.props.expenses}/></Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

export default Nobt
