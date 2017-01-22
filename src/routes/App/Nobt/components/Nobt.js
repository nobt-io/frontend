import React from "react";
import { Button } from "react-toolbox/lib/button";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import Title from "components/Title";
import Header from "components/Header";
import NobtSummaryHeader from "./NobtSummaryHeader";
import LocationBuilder from "../modules/navigation/LocationBuilder";
import { FontIcon } from "react-toolbox/lib/font_icon";
import { Link } from "react-router";
import HOList from "containers/HOList";
import BillItem from "./BillItem";

export default class Nobt extends React.Component {

  constructor(props) {
    super(props)
  }

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
                <Link to={LocationBuilder.fromWindow().push("newBill").path}>
                  <Button theme={ {button: styles.addBillButton} } icon="add_box">
                    Add a bill
                  </Button>
                </Link>
              } />
          </AppBar>

          <NobtSummaryHeader nobtName={this.props.name} totalAmount={this.props.total}
                             memberCount={this.props.members.length} isNobtEmpty={this.props.isNobtEmpty} />


          <div>
          <span
            onClick={() => {
              this.props.updateBillFilter("");
              this.props.updateBillSortProperty("Date");
            }}
            // TODO: Style filter and sort links
            // style={{display: defaultFilter ? "none" : "inline"}}
            // className={styles.filterIcon}
          >
            <FontIcon value='clear' />
          </span>

            <Link to={LocationBuilder.fromWindow().push("changeSort").path}>{"Sort"}</Link>
            <Link to={LocationBuilder.fromWindow().push("changeFilter").path}>{"Filter"}</Link>

          </div>

          <HOList items={this.props.bills} renderItem={ (bill) => (
            <BillItem key={bill.id} bill={bill} location={this.props.location} />
          ) } />

          {this.props.children}

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
