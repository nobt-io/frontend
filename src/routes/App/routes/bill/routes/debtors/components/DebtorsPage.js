import React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import Page from "components/Page";
import { ListDivider, ListItem } from "react-toolbox/lib/list/index";
import HOList from "../../../../../../../containers/HOList/HOList";
import { connect } from "react-redux";
import AddMember from "../../../../new/components/AddMember/AddMember";
import { IconButton } from "react-toolbox/lib/button/index";
import Avatar from "../../../../../../../components/Avatar/Avatar";
import LocationBuilder from "../../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../../components/hoc/withNavigation";
import { getShares } from "../../../../new/modules/addBillForm/selectors";
import { newMemberAdded } from "../../../../new/modules/addBillForm/actions";


const debteePage = ({replace, ...props}) => {

  return(
    <div>
      <HeadRoom>
        <AppBar
          onLeftIconClick={ () => LocationBuilder.fromWindow().pop().apply(replace) }
          leftIcon={<FontIcon value="chevron_left" />}
          rightIcon={<FontIcon />}
          title="Add Bill"
        />
      </HeadRoom>
      <Page>
        <Title>Select debtors</Title>
        <SubTitle>Select who is involved in this bill.</SubTitle>
        <HOList
          selectable
          items={props.shares}
          renderItem={(share) => (
            <ListItem
              key={share.name}
              leftActions={[
                <Avatar name={share.name} medium />
              ]}
              rightActions={[
                // Use an IconButton instead of an Icon in order to align things nicely.
                <IconButton
                  icon={share.value ? "check_circle" : "radio_button_unchecked"}
                  ripple={false}
                />
              ]}
              caption={share.name}
              onClick={() => props.onShareValueChanged(share.name, !share.value)}>
            </ListItem>
          )}>
          <ListDivider />
          <AddMember onNewMember={(name) => props.onNewMember(name)} />
        </HOList>
      </Page>
    </div>
  );
};

export default withNavigation(connect(
  (state) => ({
    shares: getShares(state),
  }),
  (dispatch) => ({
    onNewMember: (member) => dispatch(newMemberAdded(member)),
    onShareValueChanged: (name, value) => dispatch({type: "ShareValueChanged", payload: {name, value}}),
  })
)(debteePage))
