import React from 'react';
import renderer from 'react-test-renderer';
import Amount from 'components/Amount/index';
import { IntlProvider } from 'react-intl';
import { NobtContext } from '../../hooks/useNobt';
import { Nobt } from '../../nobt';

test('should use absolute value of amount by default', () => {
  let cmp = renderer.create(
    <IntlProvider>
      <NobtContext.Provider value={new Nobt('', '', 'EUR', [], [], [], [], '')}>
        <Amount value={-30} />
      </NobtContext.Provider>
    </IntlProvider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});

test('should display actual value if absolute property is falsy', () => {
  let cmp = renderer.create(
    <IntlProvider>
      <NobtContext.Provider value={new Nobt('', '', 'EUR', [], [], [], [], '')}>
        <Amount value={-30} absolute={false} />
      </NobtContext.Provider>
    </IntlProvider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});
