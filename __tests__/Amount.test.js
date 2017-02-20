import React from "react";
import renderer from "react-test-renderer";
import Amount from "components/Amount";
import { Provider } from "react-redux";
import createMockStore from "../__mocks__/mockStore";

test('should use absolute value of amount by default', () => {

  let mockStore = createMockStore();

  let cmp = renderer.create(
    <Provider store={mockStore}>
      <Amount value={-30} />
    </Provider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});

test('should display actual value if absolute property is falsy', () => {

  let mockStore = createMockStore();

  let cmp = renderer.create(

    <Provider store={mockStore}>
      <Amount value={-30} absolute={false}/>
    </Provider>
  );

  let tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});
