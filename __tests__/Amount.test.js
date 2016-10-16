import React from "react";
import renderer from "react-test-renderer";
import Amount from "components/Amount";
import CurrencyContext from "../__mocks__/currencyContext";


test('should use absolute value of amount by dafult', () => {

  var cmp = renderer.create(
    <CurrencyContext currency="EUR">
      <Amount value={-30} />
    </CurrencyContext>
  );

  var tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});

test('should display actual value if absolute property is falsy', () => {

  var cmp = renderer.create(
    <CurrencyContext currency="EUR">
      <Amount value={-30} absolute={false} />
    </CurrencyContext>
  );

  var tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});
