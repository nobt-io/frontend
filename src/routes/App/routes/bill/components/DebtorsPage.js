import React from "react";
import { Heading, SubHeading, Caption } from "components/text/index";
import { Main } from "components/Container/index";
import { SectionGroup, Section } from "components/Section/index";
import { List, CheckboxItem, AddMemberItem } from "components/List/index"
import { ListDivider } from "react-toolbox/lib/list/index";
import { connect } from "react-redux";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../components/hoc/withNavigation";
import { areAllMembersSelected, getAllMembers, getShares } from "../modules/selectors";
import { newMemberAdded, shareValueChanged } from "../modules/actions";
import BrandedAppBar from "components/BrandedAppBar/index";
import Button from "components/Button/index";
import { withCtrlAndEnterKeyDownLister } from "components/hoc/keyDownListener";

const goBack = (replace) => LocationBuilder.fromWindow().pop(1).apply(replace);

const DebtorsPage = ({replace, shares, onNewMember, onShareValueChanged, areAllMembersSelected, allMembers}) => {

  const setAllValues = (value) => allMembers.forEach(member => onShareValueChanged(member, value));

  return (
    <div>
      <BrandedAppBar canGoBack={true} />
      <Main>
        <Heading>Select debtors</Heading>
        <SubHeading>Choose who is in.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Persons</Caption>
            <List>
              <CheckboxItem autoFocus={true} name="Everyone" selected={areAllMembersSelected}
                            selectAction={() => setAllValues(!areAllMembersSelected)} noAvatar />
              <ListDivider />
              {shares.map(share =>
                <CheckboxItem key={share.name} name={share.name} selected={share.value}
                              selectAction={(name, value) => onShareValueChanged(name, value)} />)}
            </List>
          </Section>
          <Section>
            <Caption>Someone else?</Caption>
            <List>
              <AddMemberItem placeholder="Sheldon, Penny, Leonard, ..." onNewMember={(name) => onNewMember(name)} />
            </List>
          </Section>
        </SectionGroup>
        <Button raised primary onClick={() => goBack(replace)} label="Back" icon="arrow_back" />
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
    onShareValueChanged: (name, value) => dispatch(shareValueChanged(name, value))
  })
)(withCtrlAndEnterKeyDownLister(({replace}) => goBack(replace))(DebtorsPage)))
