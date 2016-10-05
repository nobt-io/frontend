import React from "react";
import styles from "./Nobt.scss";
import Header from "components/Header";
import NobtSummary from "components/NobtSummary";
import TransactionList from "components/TransactionList";
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
        <Header rightButton={{icon:"add_box", onClick: this.props.openCreateExpenseModal, title: "Add expense", show: true}}/>
        <CreateExpenseModal active={this.props.showCreateExpenseModal}
                            onClose={this.props.closeCreateExpenseModal}
                            onCreateExpense={this.props.createExpense}/>
        <NobtSummary
          nobtName={this.props.name} nobtIsEmpty={this.props.nobtIsEmpty}
          totalAmount={this.props.total} memberCount={this.props.members.length}/>
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

Nobt.defaultProps = {
  name: "",
  nobtIsEmpty: true,
  total: "",
  members: [],
  showCreateExpenseModal: true,
  tabIndex: 0,
  expensesFiltered: [],
  transactions: [],
  changeExpenseViewInfo: () => {},
  expensesViewInfo: { sort: "Date", filter: "" },
};

export default Nobt
