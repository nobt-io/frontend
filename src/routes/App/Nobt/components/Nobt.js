import React from "react";
import { Button } from "react-toolbox/lib/button";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import BillListTheme from "./BillListTheme.scss";
import Title from "components/Title";
import Header from "components/Header";
import NobtSummaryHeader from "./NobtSummaryHeader";
import LocationBuilder from "../modules/navigation/LocationBuilder";
import { Link } from "react-router";
import HOList from "containers/HOList";
import BillItem from "./BillItem";
import AsyncActionStatus from "../../../../const/AsyncActionStatus";
import { ProgressBar } from "react-toolbox/lib/progress_bar";
import { Snackbar } from "react-toolbox/lib/snackbar";
import { IconMenu, MenuItem } from "react-toolbox/lib/menu";
import ReactPullToRefresh from "react-pull-to-refresh"

export default class Nobt extends React.Component {

  render = () => {
    return (
      <div className={styles.nobt}>
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

        {
          this.props.fetchStatus === AsyncActionStatus.IN_PROGRESS && (
            <div className={styles.loader}>
              <div className={styles.separator}></div>
              <div className={styles.progressBar}>
                <ProgressBar type='circular' mode='indeterminate' multicolor />
              </div>
            </div>
          )
        }


        {
          this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL && (

            <ReactPullToRefresh onRefresh={this.props.invalidateNobtData}>

              <NobtSummaryHeader nobtName={this.props.name} totalAmount={this.props.total}
                                 memberCount={this.props.members.length} isNobtEmpty={this.props.isNobtEmpty} />

              <div className={BillListTheme.header}>

                <div className={BillListTheme.title}>
                  <h4>Your bills:</h4>
                </div>

                <IconMenu className={BillListTheme.menu}>
                  <MenuItem
                    caption="Sort bills"
                    icon="sort"
                    onClick={ () => LocationBuilder.fromWindow().push("changeSort").apply(this.props.push) }
                  />

                  <MenuItem
                    caption="Filter bills"
                    icon="filter_list"
                    onClick={ () => LocationBuilder.fromWindow().push("changeFilter").apply(this.props.push) }
                  />
                </IconMenu>
              </div>

              <HOList
                theme={BillListTheme}
                items={this.props.bills}
                renderItem={ (bill) => (
                  <div key={bill.id} className={BillListTheme.item}>
                    <BillItem bill={bill} />
                  </div>
                ) } />

              {this.props.children}

            </ReactPullToRefresh>
          )
        }

        <Snackbar
          action='Retry?'
          active={this.props.fetchStatus === AsyncActionStatus.FAILED}
          label='Failed to fetch nobt.'
          type='warning'
          onClick={this.props.invalidateNobtData}  // TODO: Make this work. NobtLoader somehow doesn't react on that.
        />
      </div>
    );
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    bills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    billFilter: React.PropTypes.string.isRequired,
    billSortProperty: React.PropTypes.string.isRequired,
    isNobtEmpty: React.PropTypes.bool.isRequired,
    fetchStatus: React.PropTypes.string.isRequired
  };
};
