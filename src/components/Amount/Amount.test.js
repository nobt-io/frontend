import React from "react";
import renderer from "react-test-renderer";
import Amount from "components/Amount/index";
import { Provider } from "react-redux";
import createMockStore from "../../store/mockStore";
import { IntlProvider } from "react-intl";

test('should use absolute value of amount by default', () => {

  let mockStore = createMockStore();

  let cmp = renderer.create(
    <IntlProvider>
      <Provider store={mockStore}>
        <Amount value={-30} />
      </Provider>
    </IntlProvider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});

test('should display actual value if absolute property is falsy', () => {

  let mockStore = createMockStore();

  let cmp = renderer.create(

    <IntlProvider>
      <Provider store={mockStore}>
        <Amount value={-30} absolute={false}/>
      </Provider>
    </IntlProvider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});
