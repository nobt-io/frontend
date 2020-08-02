import PropTypes from 'prop-types';
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
import {
  getMembers,
  getName,
  isNobtEmpty,
} from '../../modules/currentNobt/selectors';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../hooks/usePaths';
import { useNobt } from '../../../../hooks/useNobt';
import { useTotal } from '../../../../hooks/useTotal';

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

const HomeScreen = ({ name, members, isNobtEmpty }) => {
  const total = useTotal();

  return (
    <div className={styles.homeScreen}>
      <BrandedAppBar />

      <div className={styles.overviewContainer}>
        <div className={styles.nobtTitle}>{name}</div>
        <div className={styles.nobtMetadata}>
          <ul>
            <li>
              <div>
                <FontIcon value="payment" />
                <Amount value={total} />
              </div>
            </li>
            <li>
              <div>
                <FontIcon value="group" />
                {members.length}
              </div>
            </li>
          </ul>
        </div>
        {!isNobtEmpty && <GoToBalancesButton />}
      </div>

      {isNobtEmpty ? <EmptyNobtPlaceholder /> : <Feed />}

      <NobtFAB />
    </div>
  );
};

HomeScreen.propTypes = {
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  isNobtEmpty: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    name: getName(state),
    members: getMembers(state),
    isNobtEmpty: isNobtEmpty(state),
  };
};
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
