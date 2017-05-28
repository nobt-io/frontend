import React from "react";
import AppBar from "react-toolbox/lib/app_bar";
import styles from "./Nobt.scss";
import BillListTheme from "./BillListTheme.scss";
import LocationBuilder from "../modules/navigation/LocationBuilder";
import HOList from "containers/HOList";
import BillItem from "./BillItem";
import EmptyNobtPlaceholder from "./EmptyNobtPlaceholder";
import AsyncActionStatus from "const/AsyncActionStatus";
import { ProgressBar } from "react-toolbox/lib/progress_bar";
import { Snackbar } from "react-toolbox/lib/snackbar";
import { FontIcon } from "react-toolbox/lib/font_icon";
import { IconMenu, MenuItem } from "react-toolbox/lib/menu";
import AddBillFAB from "./AddBillFAB";
import AppBarTheme from "./AppBarTheme.scss";
import NobtItButtonTheme from "./NobtItButtonTheme.scss";
import { Button } from "react-toolbox/lib/button/index";
import HeadRoom from "react-headroom";
import Amount from "../../../components/Amount/Amount";


export default class Nobt extends React.Component {

  render = () => {
    return (
      <div className={styles.nobt}>
        <HeadRoom>
          <AppBar
            theme={AppBarTheme}
            title="nobt.io"
            />

          {
            this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL &&
              <div className={styles.overviewContainer}>
                <div className={styles.nobtTitle}>{this.props.name}</div>
                <div className={styles.nobtMetadata}>
                  <ul>
                    <li><div><FontIcon value="payment"/><Amount value={this.props.total}/></div></li>
                    <li><div><FontIcon value="supervisor_account"/>{this.props.members.length}</div></li>
                  </ul>
                </div>
              {(!this.props.isNobtEmpty) && (
                <Button
                  icon="whatshot"
                  label="Crunch Nobt"
                  primary
                  raised
                  onClick={() => LocationBuilder.fromWindow().push("balances").apply(this.props.push)}
                  theme={NobtItButtonTheme}
                />)}
            </div>

          }
        </HeadRoom>

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

            this.props.isNobtEmpty
              ? ( <EmptyNobtPlaceholder/> )
              : (
                <div>
                  <div className={BillListTheme.header}>
                    <div className={BillListTheme.title}>
                      <h4>Bills:</h4>
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

                </div>
              )
          )
        }

        {this.props.fetchStatus === AsyncActionStatus.SUCCESSFUL && <AddBillFAB />}

        <Snackbar
          action='Retry?'
          active={this.props.fetchStatus === AsyncActionStatus.FAILED}
          label='Failed to fetch nobt.'
          type='warning'
          onClick={this.props.invalidateNobtData}
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
    fetchStatus: React.PropTypes.string.isRequired,
    createdOn: React.PropTypes.string.isRequired,
    isNobtEmpty: React.PropTypes.bool.isRequired
  };
};
