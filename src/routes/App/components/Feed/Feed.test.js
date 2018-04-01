import renderer from "react-test-renderer";
import { aBill, anAppState, aNobtState, aPayment } from "../../../../store/mockState";
import Feed from "./Feed";
import * as React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import createMockStore from "../../../../store/mockStore";

describe('Feed', function () {

  it('should render feed correctly', function () {

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const now = new Date(2017, 11, 9);

    let mockStore = createMockStore(
      stateBuilder => stateBuilder
        .withApp(
          anAppState()
            .withCurrentNobt(
              aNobtState()
                .withBill(
                  aBill()
                    .withCreationDate(now - DAY * 3)
                    .withName('Bier')
                    .withDebtee('Thomas')
                    .addShare('David', 10)
                    .addShare('Thomas', 10)
                    .addShare('Matthias', 10)
                )
                .withBill(
                  aBill()
                    .withCreationDate(now - DAY)
                    .withName('Tanken')
                    .withDebtee('David')
                    .addShare('David', 20)
                    .addShare('Thomas', 20)
                    .addShare('Matthias', 20)
                )
                .withBill(
                  aBill()
                    .withCreationDate(now - DAY)
                    .withName('Essen')
                    .withDebtee('Thomas')
                    .addShare('David', 15)
                    .addShare('Thomas', 15)
                    .addShare('Matthias', 15)
                )
                .withPayment(
                  aPayment()
                    .withCreationDate(now - DAY)
                    .withSender('David')
                    .withRecipient('Matthias')
                    .withAmount(15)
                )
            )
        )
    );

    let cmp = renderer.create(
      <IntlProvider initialNow={now}>
        <Provider store={mockStore}>
          <Feed />
        </Provider>
      </IntlProvider>
    );

    let tree = cmp.toJSON();

    expect(tree).toMatchSnapshot();

  });

});
