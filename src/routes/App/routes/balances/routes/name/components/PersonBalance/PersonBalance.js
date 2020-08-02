import * as React from 'react';
import Amount from 'components/Amount/index';
import { List, ListItem } from 'react-toolbox-legacy/lib/list';
import HOList from '../../../../../../../../containers/HOList';
import { AppBar } from 'react-toolbox-legacy/lib/app_bar/index';
import Avatar from 'components/Avatar/index';
import { connect } from 'react-redux';
import {
  getBills,
  getFetchNobtStatus,
  getSumOfPaidBills,
  makeGetPaidBills,
  makeGetRelatedBills,
} from '../../../../../../modules/currentNobt/selectors';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import InfoMessageListTheme from './InfoMessageListTheme.scss';
import { AsyncActionStatus } from '../../../../../../../../const/AsyncActionStatus';
import { FormattedMessage } from 'react-intl';
import { SubTitle, Title } from 'components/text';
import AmountTheme from '../../../../themes/AmountTheme.scss';
import { Page } from 'components/Container';
import { useHistory, useParams } from 'react-router-dom';
import usePaths from '../../../../../../../../hooks/usePaths';
import { balanceDetailPathVariable } from '../../../../../../../index';
import { useBalance } from '../../../../../../../../hooks/useBalance';

const PersonBalance = ({
  sumOfPaidBills,
  paidBills,
  bills,
  relatedBills,
  fetchStatus,
}) => {
  const history = useHistory();
  const paths = usePaths();

  const params = useParams();
  const balanceOwner = params[balanceDetailPathVariable];
  const balance = useBalance(balanceOwner);

  return (
    <div>
      {fetchStatus === AsyncActionStatus.SUCCESSFUL && (
        <div>
          <AppBar
            onLeftIconClick={() => history.replace(paths.balances())}
            leftIcon={<FontIcon value="chevron_left" />}
            rightIcon={<FontIcon />}
            title={`${balance.me.name}`}
          />

          <Page>
            <div>
              <Title>Summary</Title>

              <List theme={InfoMessageListTheme}>
                <ListItem
                  ripple={false}
                  leftIcon="info_outline"
                  caption={
                    <FormattedMessage
                      id="PersonBalance.paidBillsSummary"
                      defaultMessage="{name} {numberOfBills, plural,
                                            =0 {did not pay any bills}
                                            =1 {paid 1 bill ({totalAmount})}
                                            other {paid {numberOfBills} bills ({totalAmount})}}."
                      values={{
                        name: balance.me.name,
                        numberOfBills: paidBills.length,
                        totalAmount: (
                          <Amount value={sumOfPaidBills} absolute={true} />
                        ),
                      }}
                    />
                  }
                />

                <ListItem
                  ripple={false}
                  leftIcon="info_outline"
                  caption={
                    <FormattedMessage
                      id="PersonBalance.paidBillsSummary"
                      defaultMessage={
                        bills.length !== relatedBills.length
                          ? '{name} participates in {numberOfBills} of {allBills} bills.'
                          : '{name} participates in all {allBills} bills.'
                      }
                      values={{
                        name: balance.me.name,
                        allBills: bills.length,
                        numberOfBills: relatedBills.length,
                      }}
                    />
                  }
                />
              </List>
            </div>

            <div>
              <Title>Debts</Title>
              <SubTitle>
                <FormattedMessage
                  id="PersonBalance.summary"
                  defaultMessage="{name} {verb} {amount} {preposition} {numberOfOtherPeople} {numberOfOtherPeople, plural,
                                                                                                =1 {person}
                                                                                                other {persons}}."
                  values={{
                    name: balance.me.name,
                    verb: balance.me.amount > 0 ? 'gets' : 'owes',
                    amount: (
                      <Amount value={balance.me.amount} absolute={true} />
                    ),
                    preposition: balance.me.amount > 0 ? 'from' : 'to',
                    numberOfOtherPeople: balance.persons.length,
                  }}
                />
              </SubTitle>

              <HOList
                items={balance.persons}
                renderItem={transaction => (
                  <ListItem
                    leftActions={[<Avatar name={transaction.name} medium />]}
                    ripple={false}
                    key={transaction.name}
                    caption={transaction.name}
                    legend={
                      <Amount
                        theme={AmountTheme}
                        value={transaction.amount}
                        absolute={false}
                      />
                    }
                  />
                )}
              />
            </div>
          </Page>
        </div>
      )}
    </div>
  );
};

const makeMapStateToProps = () => {
  const getPaidBills = makeGetPaidBills();
  const getRelatedBills = makeGetRelatedBills();

  return (state, props) => {
    let paidBills = getPaidBills(state, props);

    return {
      sumOfPaidBills: getSumOfPaidBills(paidBills),
      paidBills: paidBills,
      bills: getBills(state),
      relatedBills: getRelatedBills(state, props),
      fetchStatus: getFetchNobtStatus(state),
    };
  };
};

export default connect(makeMapStateToProps, () => ({}))(PersonBalance);
