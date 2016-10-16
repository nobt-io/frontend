import React from "react";

it("stub test", () => {

});

/*
import renderer from "react-test-renderer";
import DebtSummaryList from "./DebtSummaryList";
import CurrencyContext from "../__mocks__/CurrencyContext";

// jest.mock('react-intl');

TODO needs React 15.4.0 to work properly

it.skip('should render a list of debt summaries', () => {

  let debtSummaries = [
    {
      me: { name: "Thomas", amount: 10 },
      persons: [
        { name: "David", amount: 20 },
        { name: "Lukas", amount: 10 },
      ]
    },
    {
      me: { name: "David", amount: -20 },
      persons: [
        { name: "Thomas", amount: 10 },
      ]
    },
  ];

  var cmp = renderer.create(
    <CurrencyContext currency="EUR">
      <DebtSummaryList debtSummaries={debtSummaries}/>
    </CurrencyContext>
  );

  var tree = cmp.toJSON();

  expect(tree).toMatchSnapshot();
});
 */
