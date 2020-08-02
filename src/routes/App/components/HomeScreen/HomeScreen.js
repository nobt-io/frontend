import React from 'react';
import styles from './HomeScreen.scss';
import EmptyNobtPlaceholder from '../EmptyNobtPlaceholder/index';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon';
import NobtFAB from '../NobtFAB';
import NobtItButtonTheme from './NobtItButtonTheme.scss';
import { Button } from 'react-toolbox-legacy/lib/button';
import Amount from '../../../../components/Amount/Amount';
import BrandedAppBar from '../../../../components/BrandedAppBar/index';
import Feed from '../Feed/Feed';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../hooks/usePaths';
import { useNobt } from '../../../../hooks/useNobt';

const GoToBalancesButton = () => {
  const history = useHistory();
  const paths = usePaths();

  return (
    <Button
      label="Show balances"
      data-cy={'show-balances-button'}
      primary
      raised
      onClick={() => history.push(paths.balances())}
      theme={NobtItButtonTheme}
    />
  );
};

export default function HomeScreen() {
  const nobt = useNobt();

  return (
    <div className={styles.homeScreen}>
      <BrandedAppBar />

      <div className={styles.overviewContainer}>
        <div className={styles.nobtTitle}>{nobt.name}</div>
        <div className={styles.nobtMetadata}>
          <ul>
            <li>
              <div>
                <FontIcon value="payment" />
                <Amount value={nobt.total} />
              </div>
            </li>
            <li>
              <div>
                <FontIcon value="group" />
                {nobt.numberOfMembers}
              </div>
            </li>
          </ul>
        </div>
        {!nobt.isEmpty && <GoToBalancesButton />}
      </div>

      {nobt.isEmpty ? <EmptyNobtPlaceholder /> : <Feed />}

      <NobtFAB />
    </div>
  );
}
