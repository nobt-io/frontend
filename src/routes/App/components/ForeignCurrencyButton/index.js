import * as React from 'react';
import { Button } from 'react-toolbox-legacy/lib/button/index';
import ButtonTheme from './ButtonTheme.scss';
import { connect } from 'react-redux';
import {
  getConvertedAmount,
  isForeignCurrencyBill,
} from '../../routes/bill/modules/selectors';
import { FontIcon } from 'react-toolbox-legacy/lib/font_icon';
import { clearConversionInformation } from '../../routes/bill/modules/actions';
import { getNobtCurrency } from '../../modules/currentNobt/selectors';
import getCurrencySymbol from 'currency-symbol-map';
import { ListItem } from 'react-toolbox-legacy/lib/list';
import ListItemTheme from './ListItemTheme.scss';
import List from '../../../../components/List/List';
import { useHistory } from 'react-router-dom';
import usePaths from '../../../../hooks/usePaths';

const ForeignCurrencyButton = ({
  convertedAmount,
  clearConversionInformation,
  nobtCurrency,
  isForeignCurrencyBill,
}) => {
  const history = useHistory();
  const paths = usePaths();

  return (
    <div>
      {isForeignCurrencyBill ? (
        <List>
          <ListItem
            theme={ListItemTheme}
            leftIcon={[<span>{getCurrencySymbol(nobtCurrency)}</span>]}
            caption={convertedAmount}
            rightActions={[
              <FontIcon
                key="clear"
                data-cy={'reset-conversion-button'}
                value="clear"
                onClick={() => clearConversionInformation()}
              />,
              <FontIcon
                key="edit"
                value="edit"
                onClick={() => history.push(paths.newBill('convert'))}
              />,
            ]}
          />
        </List>
      ) : (
        <Button
          theme={ButtonTheme}
          icon={<i className={'fa fa-refresh'} />}
          label={'Change currency'}
          data-cy={'change-currency-button'}
          raised
          primary
          onClick={() => history.push(paths.newBill('convert'))}
        />
      )}
    </div>
  );
};

export default connect(
  state => ({
    nobtCurrency: getNobtCurrency(state),
    convertedAmount: getConvertedAmount(state),
    isForeignCurrencyBill: isForeignCurrencyBill(state),
  }),
  dispatch => ({
    clearConversionInformation: () => dispatch(clearConversionInformation()),
  })
)(ForeignCurrencyButton);
