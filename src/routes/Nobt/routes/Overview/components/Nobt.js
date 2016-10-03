import React from 'react'
import styles from './Nobt.scss'

import Button from 'components/Button';
import Header from 'components/Header'
import NobtSummary from 'components/NobtSummary'
import {Tab, Tabs} from 'react-toolbox';

import _debug from 'debug';

var debug = _debug('nobt:overview');

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;

    this.props.loadNobt(nobtId);
  },

  componentWillReceiveProps(nextProps) {

    var newTab = nextProps.params.tab;
    var oldTab = this.props.params.tab;

    if (newTab !== oldTab) {
      this.props.changeTab(newTab);
    }
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
      <div className={styles.Nobt}>
        <Header showButton={true}>
          <Button className={styles.button} icon="add_box"
                  onClick={ () => this.navigate(`/nobt/${this.props.params.id}/expenses/add`) }>Add expense</Button>
        </Header>
        <NobtSummary nobtName={this.props.name} total={this.props.total} member={this.props.member}/>
        <Tabs index={this.props.tabIndex} onChange={this.onTabChange} fixed>
          <Tab label="Transactions">
            <small>First Content</small>
          </Tab>
          <Tab label="Expenses">
            <small>Second Content</small>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

export default Nobt
