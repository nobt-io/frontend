import React from 'react';
import Avatar from 'components/Avatar/index';
import { ListItem } from 'react-toolbox-legacy/lib/list';
import Amount from 'components/Amount/Amount';
import { HOList } from 'containers/HOList/HOList';
import { IconButton } from 'react-toolbox-legacy/lib/button';
import AmountTheme from '../../../../themes/AmountTheme.scss';
import { AppBar } from 'react-toolbox-legacy/lib/app_bar/index';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon/index';
import { SubTitle, Title } from 'components/text/index';
import { Page } from 'components/Container';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../../../../../hooks/usePaths';
import { useNobt } from '../../../../../../../../hooks/useNobt';
import NoUnderlineLink from '../../../../../../../../components/NoUnderlineLink';

export default function BalanceOverview() {
  const history = useHistory();
  const paths = usePaths();
  const nobt = useNobt();

  return (
    <div>
      <AppBar
        onLeftIconClick={() => history.replace(paths.feed())}
        leftIcon={<FontIcon value="chevron_left" />}
        rightIcon={<FontIcon />}
        title="Balances"
      />

      <Page>
        <Title>Balance Overview</Title>
        <SubTitle>The balances of all users in this Nobt.</SubTitle>

        <HOList
          items={nobt.balances}
          renderItem={balance => (
            <NoUnderlineLink to={paths.balanceFor(balance.me.name)}>
              <ListItem
                leftActions={[<Avatar name={balance.me.name} medium />]}
                key={balance.me.name}
                caption={balance.me.name}
                legend={
                  <Amount
                    theme={AmountTheme}
                    value={balance.me.amount}
                    absolute={false}
                  />
                }
                rightActions={[<IconButton icon="chevron_right" />]}
              />
            </NoUnderlineLink>
          )}
        />
      </Page>
    </div>
  );
}
