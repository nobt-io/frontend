import { getFeedItems } from "./selectors";
import { aBill, anAppState, aNobtState, aPayment, aStoreState } from "../../../../../__mocks__/mockState";

describe('feed', function () {

  it('should sort feed items descending by date', function () {

    let state = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(
          aNobtState()
            .withBill(aBill().withId(1).withCreationDate(new Date(2017, 0, 1)))
            .withPayment(aPayment().withId(2).withCreationDate(new Date(2017, 0, 2)))
            .withPayment(aPayment().withId(3).withCreationDate(new Date(2017, 0, 3)))
            .withBill(aBill().withId(4).withCreationDate(new Date(2017, 0, 3)))
        )
      )
      .build();

    let feedItems = getFeedItems(state);

    expect(feedItems.length).toEqual(4);
    expect(feedItems[0].id).toEqual(4);
    expect(feedItems[3].id).toEqual(1);
  });

  it('should assign correct icon for payment', function () {

    let state = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(
          aNobtState()
            .withPayment(aPayment())
        )
      )
      .build();

    let feedItems = getFeedItems(state);

    expect(feedItems[0].icon).toEqual('payment');
  });

  it('should assign correct icon for bill', function () {

    let state = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(
          aNobtState()
            .withBill(aBill())
        )
      )
      .build();

    let feedItems = getFeedItems(state);

    expect(feedItems[0].icon).toEqual('receipt');
  });

});
