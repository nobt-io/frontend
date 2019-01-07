import PropTypes from 'prop-types';
import React from "react";
import styles from "./HomeScreen.scss";
import LocationBuilder from "../../modules/navigation/LocationBuilder";
import EmptyNobtPlaceholder from "../EmptyNobtPlaceholder/index";
import { FontIcon } from "react-toolbox-legacy/lib/font_icon";
import NobtFAB from "../NobtFAB";
import NobtItButtonTheme from "./NobtItButtonTheme.scss";
import { Button } from "react-toolbox-legacy/lib/button/index";
import Amount from "../../../../components/Amount/Amount";
import BrandedAppBar from "../../../../components/BrandedAppBar/index";
import Feed from "../Feed/Feed";
import { getCreatedOn, getCurrency, getDeNormalizedBills, getMembers, getName, getTotal, isNobtEmpty } from "../../modules/currentNobt/selectors";
import { connect } from "react-redux";
import withNavigation from "../../../../components/hoc/withNavigation";
import { invalidateNobt } from "../../modules/currentNobt/actions";

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

        <NobtFAB hash={this.props.location.hash}/>
      </div>
    );
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    bills: PropTypes.arrayOf(PropTypes.object).isRequired,
    isNobtEmpty: PropTypes.bool.isRequired,
    createdOn: PropTypes.string.isRequired
  };
}

const mapStateToProps = (state) => {
  return {
    name: getName(state),
    currency: getCurrency(state),
    total: getTotal(state),
    members: getMembers(state),
    bills: getDeNormalizedBills(state),
    createdOn: getCreatedOn(state),
    isNobtEmpty: isNobtEmpty(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    invalidateNobtData: () => dispatch(invalidateNobt())
  };
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
