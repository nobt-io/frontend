import React from "react";
import { Tab, Tabs } from "react-toolbox";
import { Button } from "react-toolbox/lib/button";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import Title from "components/Title";
import Header from "components/Header";
import DebtSummaryList from "components/DebtSummaryList";
import NobtSummaryHeader from "components/NobtSummaryHeader";
import BillList from "components/BillList";
import BillFilter from "components/BillFilter";
import AddBillFormContainer from "./AddBillForm";
import Visibility from "const/Visibility";

export const Nobt = React.createClass({

  componentWillMount(){
    var nobtId = this.props.params.id;
    var tabIdentifier = this.props.location.hash.substring(1);
    this.props.fetchNobt(nobtId);

    this.props.changeTab(tabIdentifier);
  },

  componentWillReceiveProps(nextProps) {

    var currentTabIdentifier = this.props.location.hash.substring(1);
    var nextTabIdentifier = nextProps.location.hash.substring(1);

    if (currentTabIdentifier !== nextTabIdentifier) {
      this.props.changeTab(nextTabIdentifier);
    }

    if (nextProps.addBillSuccessful) {
      this.setAddBillFormVisibility(Visibility.HIDDEN);
      this.props.acknowledgeAddBillStatus();
    }
  },

  getInitialState() {
    return {
      addBillFormVisibility: Visibility.HIDDEN
    }
  },

  getChildContext() {
    return {
      currency: this.props.currency,

      // TODO use this context in AddBillForm to disable the screen and show a loading indicator
      addBillInProgress: this.props.addBillInProgress,
    };
  },

  onTabChange(index) {

    var indexHashMapping = {
      0: 'transactions',
      1: 'bills'
    };

    var hashRoute = indexHashMapping[ index ] || 'transactions';

    this.props.router.replace(`/${this.props.params.id}#${hashRoute}`);
  },

  setAddBillFormVisibility(visibility) {
    this.setState({
      addBillFormVisibility: visibility
    })
  },

  handleOnBillSubmit(bill) {

    var nobtId = this.props.params.id;

    this.props.addBill(nobtId, bill);
  },

  handleOnAddBillCanceled() {
    this.setAddBillFormVisibility(Visibility.HIDDEN);
  },

  render: function () {
    return (
      <div className={styles.nobt}>
        {this.state.addBillFormVisibility === Visibility.VISIBLE && (
          <AddBillFormContainer
            onCancel={ this.handleOnAddBillCanceled }
            onSubmit={this.handleOnBillSubmit}
            members={this.props.members}
          />
        )}

        {this.state.addBillFormVisibility === Visibility.HIDDEN && (
          <div>
            <AppBar>
              <Header
                left={<Title />}
                right={
                  <Button
                    theme={ {button: styles.addBillButton} }
                    icon="add_box"
                    onClick={() => this.setAddBillFormVisibility(Visibility.VISIBLE)}>
                    Add a bill
                  </Button>
                } />
            </AppBar>

            <NobtSummaryHeader nobtName={this.props.name} totalAmount={this.props.total}
                               memberCount={this.props.members.length} isNobtEmpty={this.props.isNobtEmpty} />
            <div>
              <Tabs
                theme={{pointer: styles.pointer, tabs: styles.tabs, tab: styles.tab}}
                index={this.props.activeTabIndex}
                onChange={this.onTabChange} fixed>
                <Tab label="Transactions">
                  <DebtSummaryList debtSummaries={this.props.debtSummaries} />
                </Tab>
                <Tab label="Bills">
                  <BillFilter
                    personNames={this.props.members}
                    onFilterChange={(filter) => this.props.updateBillFilter(filter)}
                    onSortChange={(sort) => this.props.updateBillSortProperty(sort)}
                    onReset={() => {
                      this.props.updateBillFilter("");
                      this.props.updateBillSortProperty("Date");
                    }}
                    currentFilter={this.props.billFilter}
                    currentSort={this.props.billSortProperty} />
                  <BillList bills={this.props.bills} />
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    );
  }
});

Nobt.propTypes = {
  name: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired,
  members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  bills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired, // TODO instanceOf(BillViewModel),
  billFilter: React.PropTypes.string.isRequired,
  billSortProperty: React.PropTypes.string.isRequired,
  debtSummaries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired, // TODO instanceOf(DebtSummaryViewModel)
  activeTabIndex: React.PropTypes.number.isRequired,
  isNobtEmpty: React.PropTypes.bool.isRequired,

  addBillSuccessful: React.PropTypes.bool.isRequired,
  addBillInProgress: React.PropTypes.bool.isRequired,

  addBill: React.PropTypes.func.isRequired
};

Nobt.childContextTypes = {
  currency: React.PropTypes.string,
  addBillInProgress: React.PropTypes.bool.isRequired,
};

export default Nobt;
