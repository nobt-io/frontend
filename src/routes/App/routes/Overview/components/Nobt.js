import React from "react";
import { Tab, Tabs } from "react-toolbox";
import { Button } from "react-toolbox/lib/button";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import Title from "components/Title";
import Header from "components/Header";
import NobtSummaryHeader from "components/NobtSummaryHeader";
import BillFilter from "components/BillFilter";
import HOList from "containers/HOList";
import BillItem from "components/BillItem";

export default class Nobt extends React.Component {

  constructor(props) {
    super(props)
    this.fetchCurrentNobt();
  }

  fetchCurrentNobt = () => {
    this.props.fetchNobt(this.props.params.id);
  };

  getChildContext = () => {
    return {
      currency: this.props.currency
    };
  };

  render = () => {
    return (
      <div className={styles.nobt}>
        <div>
          <AppBar>
            <Header
              left={<Title />}
              right={
                <Button
                  theme={ {button: styles.addBillButton} }
                  icon="add_box"
                  onClick={this.props.navigateAddNewBill}>
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
      </div>
    );
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    bills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    billFilter: React.PropTypes.string.isRequired,
    billSortProperty: React.PropTypes.string.isRequired,
    isNobtEmpty: React.PropTypes.bool.isRequired,
    navigateAddNewBill: React.PropTypes.func.isRequired
  };

  static childContextTypes = {
    currency: React.PropTypes.string
  };
};
