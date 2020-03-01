import React, { Component, useState } from 'react';
import { Caption, Heading, SubHeading } from 'components/text/index';
import { Main } from 'components/Container/index';
import { connect } from 'react-redux';
import { getAmount, getForeignCurrency, getRate } from '../modules/selectors';
import BrandedAppBar from 'components/BrandedAppBar/BrandedAppBar';
import { Section, SectionGroup } from 'components/Section/index';
import Button from 'components/Button/index';
import { CurrencyInput } from '../../../../../components/Input';
import Input from '../../../../../components/Input/Input';
import CurrencySelect from '../../../../../components/CurrencySelect/CurrencySelect';
import { getNobtCurrency } from '../../../modules/currentNobt/selectors';
import getCurrencySymbol from 'currency-symbol-map';
import { saveConversionInformation } from '../modules/actions';
import convertAmount from '../modules/convertAmount';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../../hooks/usePaths';

/*


  state = {
    amount: '',
    foreignCurrency: null,
    rate: '',
    saveAttempted: false,
  };
 */

const AmountConversionPage = props => {
  let { nobtCurrency, saveConversionInformation } = props;
  const history = useHistory();
  const paths = usePaths();
  const [amount, setAmount] = useState(props.amount);
  const [foreignCurrency, setForeignCurrency] = useState(props.foreignCurrency);
  const [rate, setRate] = useState(props.rate);
  const [saveAttempted, setSaveAttempted] = useState(false);

  const getForeignCurrencyValue = () => {
    if (foreignCurrency) {
      return foreignCurrency.value;
    }

    return null;
  };

  const hasForeignCurrency = () => {
    return foreignCurrency != null;
  };

  const hasRate = () => {
    return rate !== null && rate !== '' && !isNaN(rate);
  };

  const hasAmount = () => {
    return amount !== 0;
  };

  const getRate = () => {
    if (hasRate()) {
      return rate;
    }

    return '';
  };

  const getRateError = () => {
    return saveAttempted && !hasRate() && 'This field is mandatory.';
  };

  const getAmountError = () => {
    return saveAttempted && !hasAmount() && 'This field is mandatory.';
  };

  const getRateCaption = () => {
    return `Specify rate${
      hasForeignCurrency()
        ? ` for 1 ${nobtCurrency} to ${getForeignCurrencyValue()}`
        : ''
    }:`;
  };

  return (
    <div>
      <BrandedAppBar canGoBack={true} />
      <Main>
        <Heading>Convert amount</Heading>
        <SubHeading>Convert from foreign currency</SubHeading>
        <SectionGroup>
          <Section>
            <Caption>Select foreign currency</Caption>
            <CurrencySelect
              selectedCurrency={foreignCurrency}
              unavailableCurrencies={[nobtCurrency]}
              onCurrencyChanged={setForeignCurrency}
            />
            <Caption>{getRateCaption()}</Caption>
            <Input
              value={getRate()}
              type={'number'}
              onChange={newValue => setRate(parseFloat(newValue))}
              error={getRateError()}
              data-cy={'rate-input'}
            />
          </Section>
          <Section>
            <Caption>Amount in foreign currency:</Caption>
            <CurrencyInput
              placeholder="13.37"
              value={amount}
              onChange={newValue => setAmount(parseFloat(newValue))}
              currency={getForeignCurrencyValue() || nobtCurrency}
              error={getAmountError()}
              data-cy={'foreign-amount-input'}
            />
          </Section>
          <Section>
            <Caption>Converted amount:</Caption>
            <Input
              icon={<span>{getCurrencySymbol(nobtCurrency)}</span>}
              disabled
              value={convertAmount(amount, rate)}
              data-cy={'converted-amount-input'}
            />
          </Section>
        </SectionGroup>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            raised
            primary
            onClick={() => {
              setSaveAttempted(true);

              if (hasRate() && hasForeignCurrency() && hasAmount()) {
                saveConversionInformation({
                  amount,
                  foreignCurrency,
                  rate,
                });
                history.replace(paths.newBill());
              }
            }}
            label="Accept"
            data-cy={'accept-button'}
          />
          <Button
            raised
            onClick={() => history.replace(paths.newBill())}
            label="Cancel"
            data-cy={'cancel-button'}
          />
        </div>
      </Main>
    </div>
  );
};

export default connect(
  state => ({
    amount: getAmount(state),
    foreignCurrency: getForeignCurrency(state),
    rate: getRate(state),
    nobtCurrency: getNobtCurrency(state),
  }),
  dispatch => ({
    saveConversionInformation: payload =>
      dispatch(saveConversionInformation(payload)),
  })
)(AmountConversionPage);
