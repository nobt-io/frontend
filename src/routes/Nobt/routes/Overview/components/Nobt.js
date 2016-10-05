import React from "react";
import styles from "./Nobt.scss";
import Button from "components/Button";
import Header from "components/Header";
import NobtSummary from "components/NobtSummary";
import TransactionList from "components/TransactionList";
import ExpenseList from "components/ExpenseList";
import ExpenseFilter from "components/ExpenseFilter";
import { Tab, Tabs } from "react-toolbox";
import { initialState } from "../modules/Nobt";

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;
    var tabIdentifier = this.props.location.hash.substring(1);
    this.props.loadNobt(nobtId);

    this.props.changeTab(tabIdentifier);
  },

  componentWillReceiveProps(nextProps) {

    var currentTabIdentifier = this.props.location.hash.substring(1);
    var nextTabIdentifier = nextProps.location.hash.substring(1);

    if (currentTabIdentifier !== nextTabIdentifier) {
      this.props.changeTab(nextTabIdentifier);
    }
  },

  getInitialState: function () {
    return initialState;
  },

  navigate(path) {
    this.props.history.push(path);
  },


  handleToggle() {
    this.setState({active: !this.state.active});
  },

  onTabChange(index) {

    var indexHashMapping = {
      0: 'transactions',
      1: 'expenses'
    };

    var hashRoute = indexHashMapping[index] || 'transactions';

    this.navigate(`/nobt/${this.props.params.id}#${hashRoute}`);
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
            theme={{pointer: styles.pointer, tabs: styles.tabs, tab: styles.tab}}
            index={this.props.tabIndex}
            onChange={this.onTabChange} fixed>
            <Tab label="Transactions">
              <TransactionList transactions={this.props.transactions}/>
            </Tab>
            <Tab label="Expenses">
              <ExpenseFilter
                persons={this.props.members}
                onFilterChange={(filter) => this.props.changeExpenseViewInfo(filter, this.props.expensesViewInfo.sort)}
                onSortChange={(sort) => this.props.changeExpenseViewInfo(this.props.expensesViewInfo.filter, sort)}
                onReset={(sort) => this.props.changeExpenseViewInfo("", "Date")}
                currentFilter={this.props.expensesViewInfo.filter}
                currentSort={this.props.expensesViewInfo.sort}/>
              <ExpenseList expenses={this.props.expensesFiltered}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

export default Nobt
