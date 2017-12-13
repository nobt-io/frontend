import React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import Page from "components/Page";
import { ListDivider, ListItem } from "react-toolbox/lib/list/index";
import HOList from "../../../../../../../containers/HOList/HOList";
import { connect } from "react-redux";
import { getAllMembers, getDebtee } from "../../../modules/addBillForm/selectors";
import AddMember from "../../../../new/components/AddMember/AddMember";
import { IconButton } from "react-toolbox/lib/button/index";
import Avatar from "../../../../../../../components/Avatar/Avatar";
import { newDebteeSelected } from "../../../modules/addBillForm/actions";
import LocationBuilder from "../../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../../components/hoc/withNavigation";


const debteePage = ({members, debtee, onPersonPicked, replace}) => (
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
      <Title>Select debtee</Title>
      <SubTitle>Select who paid for this bill.</SubTitle>
      <HOList
        selectable
        items={members}
        renderItem={(name) => (
          <ListItem
            key={name}
            leftActions={[
              <Avatar name={name} medium />
            ]}
            rightActions={[
              // Use an IconButton instead of an Icon in order to align things nicely.
              <IconButton
                icon={name === debtee ? "check_circle" : "radio_button_unchecked"}
                ripple={false}
              />
            ]}
            caption={name}
            onClick={() => this.handleOnPersonPicked(name)}>
          </ListItem>
        )}>
        <ListDivider />
        <AddMember onNewMember={(name) => onPersonPicked(name)} />
      </HOList>
    </Page>
  </div>
);

export default withNavigation(connect(
  (state) => ({
    members: getAllMembers(state),
    debtee: getDebtee(state)
  }),
  (dispatch) => ({
    onPersonPicked: (debtee) => dispatch(newDebteeSelected(debtee)),
  })
)(debteePage))
