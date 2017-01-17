import React from "react";
import { Tab, Tabs } from "react-toolbox";
import { Button } from "react-toolbox/lib/button";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import Title from "components/Title";
import Header from "components/Header";
import DebtSummaryList from "components/DebtSummaryList";
import NobtSummaryHeader from "components/NobtSummaryHeader";
import BillFilter from "components/BillFilter";
import AddBillFormContainer from "./AddBillForm";
import Visibility from "../../../../../const/Visibility";
import HOList from "containers/HOList"
import BillItem from "components/BillItem"

export const Nobt = React.createClass({

  componentWillMount() {
    this.fetchCurrentNobt();
  },

  fetchCurrentNobt() {
    this.props.fetchNobt(this.props.params.id);
  },

  getInitialState() {
    return {
      addBillFormVisibility: Visibility.HIDDEN
    }
  },

  getChildContext() {
    return {
      currency: this.props.currency
    };
  },

  setAddBillFormVisibility(visibility) {
    this.setState({
      addBillFormVisibility: visibility
    })
  },

  handleOnBillSubmit(bill) {

    let nobtId = this.props.params.id;

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

              <HOList items={this.props.bills} renderItem={ (bill) => (
                <BillItem key={bill.id} bill={bill} location={this.props.location} />
              ) }/>
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
  currency: React.PropTypes.string
};

export default Nobt;
