import React from "react";
import { Heading, SubHeading, Caption } from "components/text/index";
import { Main } from "components/Container";
import { SectionGroup, Section } from "components/Section";
import { List, CheckboxItem } from "components/List"
import { ListDivider } from "react-toolbox/lib/list/index";
import { connect } from "react-redux";
import AddMember from "components/AddMember";
import LocationBuilder from "../../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../../components/hoc/withNavigation";
import { areAllMembersSelected, getAllMembers, getShares } from "../../../modules/addBillForm/selectors";
import { newMemberAdded } from "../../../modules/addBillForm/actions";
import BrandedAppBar from "components/BrandedAppBar";


const debteePage = ({replace, shares, onNewMember, onShareValueChanged, areAllMembersSelected, allMembers}) => {

  const setAllValues = (value) => allMembers.forEach(member => onShareValueChanged(member, value));

  return (
    <div>
      <BrandedAppBar
        onBackHandle={() => LocationBuilder.fromWindow().pop(1).apply(replace)}
      />
      <Main>
        <Heading>Select debtors</Heading>
        <SubHeading>Choose who is in.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Persons</Caption>
            <List>
              <CheckboxItem name="Everyone" selected={areAllMembersSelected} selectAction={() => setAllValues(!areAllMembersSelected)} noAvatar />
              <ListDivider />
              {shares.map(share =>
                <CheckboxItem name={share.name} selected={share.value} selectAction={(name, value) => onShareValueChanged(name, value)} />)}
            </List>
          </Section>
          <Section>
            <Caption>Someone else?</Caption>
            <List>
              <AddMember placeholder="Sheldon, Penny, Leonard, ..." onNewMember={(name) => onNewMember(name)} />
            </List>
          </Section>
        </SectionGroup>
      </Main>
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
