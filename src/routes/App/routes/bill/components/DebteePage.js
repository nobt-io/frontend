import React from 'react';
import { Caption, Heading, SubHeading } from 'components/text/index';
import { Main } from 'components/Container/index';
import { connect } from 'react-redux';
import { getAllMembers, getDebtee } from '../modules/selectors';
import { newDebteeSelected } from '../modules/actions';
import BrandedAppBar from 'components/BrandedAppBar/BrandedAppBar';
import { Section, SectionGroup } from 'components/Section/index';
import { AddMemberItem, List, RadioboxItem } from 'components/List/index';
import Button from 'components/Button/index';
import { useHistory } from 'react-router-dom';

const DebteePage = ({ members, debtee, onPersonPicked, replace }) => {
  const history = useHistory();

  return (
    <div>
      <BrandedAppBar canGoBack={true} />
      <Main>
        <Heading>Select debtee</Heading>
        <SubHeading>Select the person who paid this bill.</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Persons</Caption>
            <List>
              {members.map((name, i) => (
                <RadioboxItem
                  autoFocus={i === 0}
                  key={name}
                  name={name}
                  selected={name === debtee}
                  selectAction={name => onPersonPicked(name)}
                />
              ))}
            </List>
          </Section>
          <Section>
            <Caption>Someone else?</Caption>
            <List>
              <AddMemberItem
                placeholder="Bart, Milhouse, Nelson, ..."
                onNewMember={name => onPersonPicked(name)}
              />
            </List>
          </Section>
        </SectionGroup>
        <Button
          raised
          primary
          onClick={() => history.goBack()}
          label="Back"
          icon="arrow_back"
        />
      </Main>
    </div>
  );
};

export default connect(
  state => ({
    members: getAllMembers(state),
    debtee: getDebtee(state),
  }),
  dispatch => ({
    onPersonPicked: debtee => dispatch(newDebteeSelected(debtee)),
  })
)(DebteePage);
