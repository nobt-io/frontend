import React from "react";
import styles from "./HomeScreen.scss";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import EmptyNobtPlaceholder from "../EmptyNobtPlaceholder/index";
import { FontIcon } from "react-toolbox/lib/font_icon";
import AddBillFAB from "../AddBillFAB/index";
import NobtItButtonTheme from "./NobtItButtonTheme.scss";
import { Button } from "react-toolbox/lib/button/index";
import Amount from "../../../../components/Amount/Amount";
import BrandedAppBar from "../../../../components/BrandedAppBar/index";
import Feed from "../Feed/Feed";
import { getCreatedOn, getCurrency, getFilteredBills, getMembers, getName, getTotal, isNobtEmpty } from "../../modules/currentNobt/selectors";
import { getBillFilter, getBillSortProperty } from "../../modules/viewState/selectors";
import { updateBillFilter, updateBillSortProperty } from "../../modules/viewState/actions";
import { connect } from "react-redux";
import withNavigation from "../../../../components/hoc/withNavigation";
import { addMember, invalidateNobt } from "../../modules/currentNobt/actions";

const GoToBalancesButton = ({push}) => (
  <Button
    label="Show balances"
    primary
    raised
    onClick={() => LocationBuilder.fromWindow().push("balances").apply(push)}
    theme={NobtItButtonTheme}
  />
);

class HomeScreen extends React.Component {

  render = () => {
    return (
      <div className={styles.homeScreen}>
        <BrandedAppBar />

        <div className={styles.overviewContainer}>
          <div className={styles.nobtTitle}>{this.props.name}</div>
          <div className={styles.nobtMetadata}>
            <ul>
              <li>
                <div><FontIcon value="payment" /><Amount value={this.props.total} /></div>
              </li>
              <li>
                <div><FontIcon value="group" />{this.props.members.length}</div>
              </li>
            </ul>
          </div>
          {!this.props.isNobtEmpty && <GoToBalancesButton push={this.props.push}/>}
        </div>

        {
          this.props.isNobtEmpty ? <EmptyNobtPlaceholder /> : <Feed />
        }

        <AddBillFAB />
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
    createdOn: React.PropTypes.string.isRequired
  };
}

const mapStateToProps = (state) => {
  return {
    name: getName(state),
    currency: getCurrency(state),
    total: getTotal(state),
    members: getMembers(state),
    bills: getFilteredBills(state),
    billFilter: getBillFilter(state),
    billSortProperty: getBillSortProperty(state),
    createdOn: getCreatedOn(state),
    isNobtEmpty: isNobtEmpty(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addMember: (name) => dispatch(addMember(name)),
    updateBillFilter: (memberName) => dispatch(updateBillFilter(memberName)),
    updateBillSortProperty: (property) => dispatch(updateBillSortProperty(property)),
    invalidateNobtData: () => dispatch(invalidateNobt())
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
