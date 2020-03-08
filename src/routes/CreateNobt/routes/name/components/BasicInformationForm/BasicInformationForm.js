import * as React from 'react';
import { Input } from 'react-toolbox-legacy/lib/input';
import ContinueButton from '../../../../components/ContinueButton';
import styles from './BasicInformationForm.scss';
import NobtNameInputTheme from './NobtNameInputTheme.scss';
import { connect } from 'react-redux';
import { getCurrency, getNobtName } from '../../../../modules/selectors';
import { changeNobtName, selectCurrency } from '../../../../modules/actions';
import CurrencySelect from '../../../../../../components/CurrencySelect/CurrencySelect';
import { useHistory } from 'react-router-dom';

const BasicInformationForm = props => {
  const history = useHistory();

  return (
    <div className={styles.formContainer}>
      <h1 className="text-5xl">Create</h1>

      <div className={styles.introductionTextContainer}>
        <p>
          Nobts are used for any occasion where you want to split bills among a
          group of people.
        </p>
      </div>

      <div className={styles.form}>
        <div className={styles.formLine}>
          <label>Name your Nobt</label>
          <Input
            hint="Barbecue, London Trip, ..."
            theme={NobtNameInputTheme}
            value={props.nobtName}
            onChange={props.changeNobtName}
            data-cy="nobt-name-input"
          />
        </div>

        <div className={styles.formLine}>
          <label>Choose currency</label>
          <CurrencySelect
            selectedCurrency={props.currency}
            onCurrencyChanged={option =>
              option
                ? props.selectCurrency(option.value)
                : props.selectCurrency(null)
            }
          />
          <div className={styles.description}>
            <p>
              This is the default currency for all bills you add to the Nobt.
              Bills in foreign currencies can be converted to this one.
            </p>
          </div>
        </div>

        <div className={styles.continueButtonContainer}>
          <ContinueButton
            data-cy={'continue-button'}
            label="Continue"
            disabled={!props.nobtName}
            icon="arrow_forward"
            onClick={() => history.push('/create/members')}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    nobtName: getNobtName(state),
    currency: getCurrency(state),
  }),
  {
    changeNobtName,
    selectCurrency,
  }
)(BasicInformationForm);
