import React from "react";
import styles from "./Nobt.scss";
import Header from "components/Header";
import NobtSummaryHeader from "components/NobtSummaryHeader";
import DebtSummaryList from "components/DebtSummaryList";
import BillList from "components/BillList";
import BillFilter from "components/BillFilter";
import NewBillOverlay from "components/NewBillOverlay";
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
      1: 'bills'
    };

    var hashRoute = indexHashMapping[ index ] || 'transactions';

    this.navigate(`/${this.props.params.id}#${hashRoute}`);
  },

  render: function () {
    return (
      <div className={styles.nobt}>
        <Header rightButton={{
          icon: "add_box",
          onClick: this.props.openNewBillOverlay,
          title: "Add a bill",
          active: true
        }}/>
        {this.props.newBillMetaData.active &&
        <NewBillOverlay metaData={this.props.newBillMetaData}
                        personData={this.props.newBillPersonData}
                        setMetaData={this.props.setNewBillMetaData}
                        setPersonValue={this.props.setNewBillPersonValue}
                        nobtMembers={this.props.members}
                        onClose={() => this.props.closeNewBillOverlay()}
                        addBill={this.props.addBill}
                        reloadNobt={() => this.props.loadNobt(this.props.params.id)}/>
        }
        <NobtSummaryHeader nobtName={this.props.name} totalAmount={this.props.total}
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
              <BillFilter
                personNames={this.props.members}
                onFilterChange={(filter) => this.props.updateBillFilter(filter)}
                onSortChange={(sort) => this.props.updateBillSortProperty(sort)}
                onReset={() => {
                  this.props.updateBillFilter("");
                  this.props.updateBillSortProperty("Date");
                }}
                currentFilter={this.props.billFilter}
                currentSort={this.props.billSortProperty}/>
              <BillList bills={this.props.bills}/>
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
  bills: [],
  billFilter: '',
  billSortProperty: 'Date',
  debtSummaries: [],
  activeTabIndex: 0,
  nobtIsEmpty: true
};

Nobt.childContextTypes = {
  currency: React.PropTypes.string
};

export default Nobt;
