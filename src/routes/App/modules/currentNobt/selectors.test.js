import {
  aBill,
  anAppState,
  aNobtState,
  aStoreState,
} from '../../../../store/mockState';
import { makeCanBillBeDeleted } from './selectors';

describe('can bill be deleted', () => {
  it('should report true if bill has delete action', () => {
    var storeState = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(
          aNobtState().withBill(
            aBill()
              .withId(1)
              .withDeleteLink('http://localhost/foo/bar')
          )
        )
      )
      .build();

    var canBillBeDeleted = makeCanBillBeDeleted();

    var canBeDeleted = canBillBeDeleted(storeState, {
      match: { params: { billId: 1 } },
    });

    expect(canBeDeleted).toBeTruthy();
  });

  it('should report false if bill has no delete action', () => {
    var storeState = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(aNobtState().withBill(aBill().withId(1)))
      )
      .build();

    var canBillBeDeleted = makeCanBillBeDeleted();

    var canBeDeleted = canBillBeDeleted(storeState, {
      match: { params: { billId: 1 } },
    });

    expect(canBeDeleted).toBeFalsy();
  });

  it('should report false for unknown bill', () => {
    var storeState = aStoreState()
      .withApp(
        anAppState().withCurrentNobt(aNobtState().withBill(aBill().withId(1)))
      )
      .build();

    var canBillBeDeleted = makeCanBillBeDeleted();

    var canBeDeleted = canBillBeDeleted(storeState, {
      match: { params: { billId: 2 } },
    });

    expect(canBeDeleted).toBeFalsy();
  });
});
