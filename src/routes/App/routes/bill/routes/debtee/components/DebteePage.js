import React from "react";
import { SubHeading, Heading, Caption } from "components/text/index";
import { Main } from "components/Container";
import { connect } from "react-redux";
import { getAllMembers, getDebtee } from "../../../modules/addBillForm/selectors";
import { newDebteeSelected } from "../../../modules/addBillForm/actions";
import LocationBuilder from "../../../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Section, SectionGroup } from "components/Section";
import { List, RadioboxItem, AddMemberItem } from "components/List"

const debteePage = ({members, debtee, onPersonPicked, replace}) => {

  const selectPerson = (name) => {
    onPersonPicked(name);
    LocationBuilder.fromWindow().pop().apply(replace);
  };

  return (
    <div>
      <BrandedAppBar
        onBackHandle={() => LocationBuilder.fromWindow().pop(1).apply(replace)}
      />
      <Main>
        <Heading>Select debtee</Heading>
        <SubHeading>Select the person who paid this bill.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Persons</Caption>
            <List>
              {members.map(name => (<RadioboxItem key={name} name={name} selected={name === debtee} selectAction={name => selectPerson(name)} />))}
            </List>
          </Section>
          <Section>
            <Caption>Someone else?</Caption>
            <List>
              <AddMemberItem placeholder="Bart, Milhouse, Nelson, ..." onNewMember={(name) => selectPerson(name)} />
            </List>
          </Section>
        </SectionGroup>
      </Main>
    </div>
  );
};

export default withNavigation(connect(
  (state) => ({
    members: getAllMembers(state),
    debtee: getDebtee(state)
  }),
  (dispatch) => ({
    onPersonPicked: (debtee) => dispatch(newDebteeSelected(debtee)),
  })
)(debteePage))
