import * as React from 'react';
import { connect } from 'react-redux';
import styles from './AddMembersForm.scss';
import HOList from 'containers/HOList';
import { IconButton } from 'react-toolbox-legacy/lib/button';
import {
  getCreationStatus,
  getNobtName,
  getPersonNames,
  getPersonToAdd,
} from '../../../../modules/selectors';
import {
  addCurrentNameAsPerson,
  createNobt,
  removePerson,
  updateNameOfPersonToAdd,
} from '../../../../modules/actions';
import ContinueButton from '../../../../components/ContinueButton';
import AddMemberInputTheme from './AddMemberInputTheme.scss';
import { Snackbar } from 'react-toolbox-legacy/lib/snackbar';
import { AsyncActionStatus } from 'const/AsyncActionStatus';
import CreateNobtProgressBar from '../../components/CreateNobtProgressBar';
import { Input } from 'react-toolbox-legacy/lib/input/index';
import {
  getAddPersonButtonLabel,
  isAddPersonButtonDisabled,
  isCreateNobtButtonDisabled,
  shouldRenderAddPersonButton,
} from '../../../../modules/selectors.ui';
import { ListItem } from 'react-toolbox-legacy/lib/list/index';
import Box from '../../../../../../components/Box/Box';
import Avatar from '../../../../../../components/Avatar/Avatar';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AddMembersForm = props => {
  const history = useHistory();
  const creationStatus = props.creationStatus;
  const nobtName = props.nobtName;

  useEffect(() => {
    if (creationStatus === AsyncActionStatus.SUCCESSFUL) {
      history.push('/create/done');
    }
  }, [creationStatus]);

  useEffect(() => {
    if (!nobtName) {
      history.replace('/create/name');
    }
  }, [nobtName]);

  const getAddPersonButtonProps = ({
    addPersonButtonLabel,
    addCurrentNameAsPerson,
    isAddPersonButtonDisabled,
  }) => ({
    label: addPersonButtonLabel,
    icon: 'add',
    onClick: addCurrentNameAsPerson,
    disabled: isAddPersonButtonDisabled,
    rightIcon: false,
    'data-cy': 'add-person-button',
  });

  const getCreateNobtButtonProps = ({
    createNobt,
    isCreateNobtButtonDisabled,
  }) => ({
    label: 'Create Nobt',
    icon: 'done',
    onClick: createNobt,
    disabled: isCreateNobtButtonDisabled,
    rightIcon: false,
    'data-cy': 'create-nobt-button',
  });

  const handleOnKeyPress = event => {
    const currentNameCanBeAdded =
      !props.isAddPersonButtonDisabled && props.shouldRenderAddPersonButton;
    const enterKeyPressed = event.charCode === 13;

    if (enterKeyPressed && currentNameCanBeAdded) {
      props.addCurrentNameAsPerson();
    }
  };

  const renderContinueButton = () => {
    let { shouldRenderAddPersonButton } = props;

    let buttonProps = shouldRenderAddPersonButton
      ? getAddPersonButtonProps(props)
      : getCreateNobtButtonProps(props);

    return <ContinueButton {...buttonProps} />;
  };

  return (
    <div>
      <section>
        <h1 className="text-5xl">Add participants</h1>

        <div className={styles.introductionTextContainer}>
          <p>Add anyone you want to split bills with.</p>
        </div>
      </section>

      <section>
        <fieldset
          disabled={props.creationStatus === AsyncActionStatus.IN_PROGRESS}
        >
          <Box>
            <Input
              value={props.personToAdd}
              autoComplete="off"
              type="text"
              icon="person"
              data-cy={'name-input'}
              placeholder="Name"
              onChange={props.updateNameOfPersonToAdd}
              onKeyPress={handleOnKeyPress}
              theme={AddMemberInputTheme}
              error={
                props.isAddPersonButtonDisabled &&
                `${props.personToAdd} is already in the list.`
              }
            />
          </Box>

          {props.personNames.length > 0 && (
            <Box>
              <HOList
                items={props.personNames}
                renderItem={name => (
                  <ListItem
                    ripple={false}
                    key={name}
                    leftActions={[<Avatar name={name} medium />]}
                    legend={name}
                    rightActions={[
                      <IconButton
                        data-cy={'remove-person-button'}
                        icon="clear"
                        onClick={() => props.removePerson(name)}
                      />,
                    ]}
                  />
                )}
              />
            </Box>
          )}
        </fieldset>
      </section>

      <section>
        <div className={styles.createNobtButtonContainer}>
          {props.creationStatus !== AsyncActionStatus.IN_PROGRESS &&
            renderContinueButton()}

          {props.creationStatus === AsyncActionStatus.IN_PROGRESS && (
            <CreateNobtProgressBar />
          )}
        </div>
      </section>

      <section>
        <div className={styles.note}>
          <p>
            Don't worry about forgetting someone, <br /> you can add further
            people later.
          </p>
        </div>
      </section>

      <Snackbar
        action="Retry?"
        active={props.creationStatus === AsyncActionStatus.FAILED}
        label="Failed to create nobt."
        type="warning"
        onClick={props.createNobt}
      />
    </div>
  );
};

export default connect(
  state => ({
    personNames: getPersonNames(state),
    creationStatus: getCreationStatus(state),
    personToAdd: getPersonToAdd(state),

    addPersonButtonLabel: getAddPersonButtonLabel(state),
    shouldRenderAddPersonButton: shouldRenderAddPersonButton(state),
    isCreateNobtButtonDisabled: isCreateNobtButtonDisabled(state),
    isAddPersonButtonDisabled: isAddPersonButtonDisabled(state),

    nobtName: getNobtName(state),
  }),
  {
    addCurrentNameAsPerson,
    removePerson,
    createNobt,
    updateNameOfPersonToAdd,
  }
)(AddMembersForm);
