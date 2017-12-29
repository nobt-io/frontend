import React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import { Page } from "components/Container";
import { List, ListDivider, ListItem } from "react-toolbox/lib/list/index";
import { connect } from "react-redux";
import AddMember from "../../../../new/components/AddMember/AddMember";
import Avatar from "../../../../../../../components/Avatar/Avatar";
import LocationBuilder from "../../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../../components/hoc/withNavigation";
import { Checkbox } from "react-toolbox/lib/checkbox/index";
import { areAllMembersSelected, getAllMembers, getShares } from "../../../modules/addBillForm/selectors";
import Amount from "../../../../../../../components/Amount/Amount";
import { newMemberAdded } from "../../../modules/addBillForm/actions";


const debteePage = ({replace, shares, onNewMember, onShareValueChanged, areAllMembersSelected, allMembers}) => {

  return (
    <div>
      <HeadRoom>
        <AppBar
          onLeftIconClick={() => LocationBuilder.fromWindow().pop().apply(replace)}
          leftIcon={<FontIcon value="chevron_left" />}
          rightIcon={<FontIcon />}
          title="Add Bill"
        />
      </HeadRoom>
      <Page>
        <Title>Debtors</Title>
        <SubTitle>Choose who is in.</SubTitle>
        <List>

          <ListItem
            caption="Everyone"
            ripple={false}
            rightActions={[
              <Checkbox
                checked={areAllMembersSelected}
                onChange={ () => {
                  allMembers.forEach(member => onShareValueChanged(member, true))
                } }
              />
            ]}
          />

          <ListDivider />

          {
            shares.map(share => <ListItem
              key={share.name}
              ripple={false}
              leftActions={[
                <Avatar name={share.name} medium />
              ]}
              rightActions={[
                // Use an IconButton instead of an Icon in order to align things nicely.
                <Checkbox
                  checked={share.value}
                  ripple={false}
                  onChange={ (newState) => onShareValueChanged(share.name, newState) }
                />
              ]}
              caption={share.name}
              legend={share.value && <Amount value={share.amount}/>}
              >
            </ListItem>)
          }

          <ListDivider />

          <AddMember onNewMember={onNewMember} />
        </List>
      </Page>
    </div>
  );
};

export default withNavigation(connect(
  (state) => ({
    shares: getShares(state),
    allMembers: getAllMembers(state),
    areAllMembersSelected: areAllMembersSelected(state)
  }),
  (dispatch) => ({
    onNewMember: (member) => dispatch(newMemberAdded(member)),
    onShareValueChanged: (name, value) => dispatch({type: "ShareValueChanged", payload: {name, value}})
  })
)(debteePage))
