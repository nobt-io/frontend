import React from "react";
import { FormattedDate } from "react-intl";
import FontIcon from "react-toolbox/lib/font_icon";
import { ListDivider } from "react-toolbox/lib/list";
import styles from "./BillItem.scss";
import Card from "components/Card";
import { AvatarList, AvatarSize } from "components/Avatar";
import Header from "components/Header";
import CloseButton from "components/CloseButton";
import Amount from "components/Amount";
import PersonMoneyList from "components/PersonMoneyList";
import Overlay from "components/Overlay";
import { Person, AvatarPosition } from "components/Person";
import OverlayVisibilityTracker from "../Overlay/OverlayVisibilityTracker";
import { connect } from "react-redux";
import { push, goBack } from 'react-router-redux'

class BillItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._overlay = new OverlayVisibilityTracker(`/${props.bill.id}`, (path) => props.dispatch(push(path)), () => props.dispatch(goBack()));
    this._overlay.updateLocation(props.location);
  }

  componentWillReceiveProps(nextProps) {
    this._overlay.updateLocation(nextProps.location)
  }

  render = () => {

    const {bill} = this.props;
    const debtee = bill.debtee;

    return (
      <Card>

        <Overlay visibility={this._overlay.visibility} onClickOutside={this._overlay.hide}>
          <div className={styles.billDetailOverlay}>

            <Header
              left={<h3>{`Shares for ${bill.name}`}</h3>}
              right={<CloseButton onClick={this._overlay.hide} />}
            />

            <ListDivider />

            <PersonMoneyList persons={bill.debtors}/>

            <div className={styles.debteeContainer}>

              <span>{debtee.name}&nbsp;paid&nbsp;</span>
              <Amount value={debtee.amount} />

            </div>


            <div className={styles.billDetailMetaDataContainer}>

              <div className={styles.addedOnTimestamp}>

                <FontIcon value="cloud_done"/>
                <span>&nbsp;created&nbsp;on&nbsp;</span>
                <FormattedDate value={new Date(bill.createdOn)} year='numeric' month='numeric' day='numeric' />

              </div>

              <div className={styles.paidOnTimestamp}>

                <FontIcon value="access_time"/>
                <span>&nbsp;paid&nbsp;on&nbsp;</span>
                <FormattedDate value={new Date(bill.date)} year='numeric' month='numeric' day='numeric' />

              </div>

            </div>
          </div>
        </Overlay>

        <div onClick={ this._overlay.show } className={styles.billContainer}>

          <div className={styles.billMetaDataContainer}>
            <div className={styles.nameContainer}>
              <span>{bill.name}</span>
            </div>
            <div className={styles.amountContainer}>
              <Amount value={debtee.amount}/>
            </div>
          </div>

          <div className={styles.billPersonInformationContainer}>
            <div className={styles.debtee}>
              <Person name={debtee.name} avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.BIG}/>
            </div>
            <div className={styles.debtors}>
              <AvatarList names={bill.debtors.map(debtor => debtor.name)} size={AvatarSize.MEDIUM}/>
            </div>
          </div>

        </div>

      </Card>
    );
  }
};

BillItem.propTypes = {
  bill: React.PropTypes.object.isRequired
};

let mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
};

export default connect(() => ({}), mapDispatchToProps)(BillItem)
