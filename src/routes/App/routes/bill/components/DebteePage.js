import React from "react";
import { SubHeading, Heading, Caption } from "components/text/index";
import { Main } from "components/Container/index";
import { connect } from "react-redux";
import { getAllMembers, getDebtee } from "../modules/selectors";
import { newDebteeSelected } from "../modules/actions";
import LocationBuilder from "../../../modules/navigation/LocationBuilder";
import withNavigation from "components/hoc/withNavigation";
import BrandedAppBar from "components/BrandedAppBar/BrandedAppBar";
import { Section, SectionGroup } from "components/Section/index";
import { List, RadioboxItem, AddMemberItem } from "components/List/index"
import Button from "components/Button/index";
import { withCtrlAndEnterKeyDownLister } from "components/hoc/keyDownListener";

const goBack = (replace) => LocationBuilder.fromWindow().pop().apply(replace);

const DebteePage = ({members, debtee, onPersonPicked, replace}) => {
  return (
    <div>
      <BrandedAppBar
        onBackHandle={() => goBack(replace)}
      />
      <Main>
        <Heading>Select debtee</Heading>
        <SubHeading>Select the person who paid this bill.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Persons</Caption>
            <List>
              {members.map((name, i) => (<RadioboxItem autoFocus={i === 0} key={name} name={name} selected={name === debtee}
                                                       selectAction={name => onPersonPicked(name)} />))}
            </List>
          </Section>
          <Section>
            <Caption>Someone else?</Caption>
            <List>
              <AddMemberItem placeholder="Bart, Milhouse, Nelson, ..." onNewMember={(name) => onPersonPicked(name)} />
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
    members: getAllMembers(state),
    debtee: getDebtee(state)
  }),
  (dispatch) => ({
    onPersonPicked: (debtee) => dispatch(newDebteeSelected(debtee)),
  })
)(withCtrlAndEnterKeyDownLister(({replace}) => goBack(replace))(DebteePage)))
