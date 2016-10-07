import React from "react";
import styles from "./Nobt.scss";
import Header from "components/Header";
import NobtSummary from "components/NobtSummary";
import DebtSummaryList from "components/DebtSummaryList";
import ExpenseList from "components/ExpenseList";
import ExpenseFilter from "components/ExpenseFilter";
import CreateExpenseModal from "components/CreateExpenseModal";
import { Tab, Tabs } from "react-toolbox";

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

  getChildContext() {
    return {
      currency: this.props.currency
    };
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

    var hashRoute = indexHashMapping[ index ] || 'transactions';

    this.navigate(`/${this.props.params.id}#${hashRoute}`);
  },

  render: function () {
    return (
      <div className={styles.nobt}>
        <Header rightButton={{
          icon: "add_box",
          onClick: this.props.openNewExpenseOverlay,
          title: "Add a bill",
          active: true
        }}/>
        {this.props.newExpenseMetaData.active &&
        <CreateExpenseModal metaData={this.props.newExpenseMetaData}
                            personData={this.props.newExpensePersonData}
                            setMetaData={this.props.setNewExpenseMetaData}
                            setPersonValue={this.props.setNewExpensePersonValue}
                            nobtMembers={this.props.members}
                            onClose={() => this.props.closeNewExpenseOverlay()}
                            createExpense={this.props.createExpense}
                            reloadNobt={() => this.props.loadNobt(this.props.params.id)}/>
        }
        <NobtSummary nobtName={this.props.name} totalAmount={this.props.total}
                     memberCount={this.props.members.length} isNobtEmpty={this.props.isNobtEmpty}/>
        <div>
          <Tabs
            theme={{pointer: styles.pointer, tabs: styles.tabs, tab: styles.tab}}
            index={this.props.activeTabIndex}
            onChange={this.onTabChange} fixed>
            <Tab label="Transactions">
              <DebtSummaryList debtSummaries={this.props.debtSummaries}/>
            </Tab>
            <Tab label="Bills">
              <ExpenseFilter
                personNames={this.props.members}
                onFilterChange={(filter) => this.props.updateExpensesFilter(filter)}
                onSortChange={(sort) => this.props.updateExpenseSortProperty(sort)}
                onReset={() => {
                  this.props.updateExpensesFilter("");
                  this.props.updateExpenseSortProperty("Date");
                }}
                currentFilter={this.props.expenseFilter}
                currentSort={this.props.expenseSortProperty}/>
              <ExpenseList expenses={this.props.expenses}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
});

// NOTE: No PropTypes defined because this is a root component

Nobt.defaultProps = {
  name: "",
  total: 0,
  members: [],
  expenses: [],
  expenseFilter: '',
  expenseSortProperty: 'Date',
  debtSummaries: [],
  activeTabIndex: 0,
  nobtIsEmpty: true
};

Nobt.childContextTypes = {
  currency: React.PropTypes.string
};

export default Nobt;
