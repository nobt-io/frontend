export class StateBuilder {

  App = {};
  router = {};

  /**
   * @param {AppStateBuilder} appStateBuilder
   * @returns {StateBuilder}
   */
  withApp = (appStateBuilder) => {
    this.App = appStateBuilder.build();
    return this;
  };

  build = () => {
    return {
      App: {...this.App},
      router: {...this.router}
    }
  }
}

export class AppStateBuilder {

  addBillForm = {};
  currentNobt = {};
  viewState = {};

  /**
   * @param {NobtStateBuilder} currentNobtStateBuilder
   * @return {AppStateBuilder}
   */
  withCurrentNobt = (currentNobtStateBuilder) => {
    this.currentNobt = currentNobtStateBuilder.build();
    return this;
  };

  build = () => {
    return {
      addBillForm: {...this.addBillForm},
      currentNobt: {...this.currentNobt},
      viewState: {...this.viewState}
    }
  }
}

export class NobtStateBuilder {

  data = {
    bills: [],
    payments: []
  };
  fetchNobtStatus = {};
  nobtFetchTimestamp = {};

  /**
   * @param id
   * @returns {NobtStateBuilder}
   */
  withId = (id) => {
    this.data.id = id;
    return this;
  };

  /**
   * @param name
   * @returns {NobtStateBuilder}
   */
  withName = (name) => {
    this.data.name = name;
    return this;
  };

  /**
   * @param currency
   * @returns {NobtStateBuilder}
   */
  withCurrency = (currency) => {
    this.data.currency = currency;
    return this;
  };

  /**
   * @param persons
   * @returns {NobtStateBuilder}
   */
  withParticipatingPersons = (...persons) => {
    this.data.persons = [ ...persons ];
    return this;
  };

  /**
   * @param status
   * @return {NobtStateBuilder}
   */
  withFetchNobtStatus = (status) => {
    this.fetchNobtStatus = status;
    return this;
  };

  /**
   * @param timestamp
   * @return {NobtStateBuilder}
   */
  withNobtFetchTimestamp = (timestamp) => {
    this.nobtFetchTimestamp = timestamp;
    return this;
  };

  /**
   * @param {BillBuilder} billBuilder
   * @returns {NobtStateBuilder}
   */
  withBill = (billBuilder) => {
    this.data.bills.push(billBuilder.build());
    return this;
  };

  /**
   * @param {PaymentBuilder} paymentBuilder
   * @returns {NobtStateBuilder}
   */
  withPayment = (paymentBuilder) => {
    this.data.payments.push(paymentBuilder.build());
    return this;
  };

  build = () => {
    return {
      data: {...this.data},
      fetchNobtStatus: this.fetchNobtStatus,
      nobtFetchTimestamp: this.nobtFetchTimestamp
    }
  }
}

class BillBuilder {

  shares = [];

  /**
   * @param {Number} id
   * @returns {BillBuilder}
   */
  withId(id) {
    this.id = id;
    return this;
  }

  /**
   * @returns {BillBuilder}
   */
  withCreationDate(date) {
    this.createdOn = date;
    return this;
  }

  /**
   * @param {String} name
   * @returns {BillBuilder}
   */
  withName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {String} name
   * @returns {BillBuilder}
   */
  withDebtee(name) {
    this.debtee = name;
    return this;
  }

  /**
   * @param {String} debtor
   * @param {Number} amount
   * @returns {BillBuilder}
   */
  addShare(debtor, amount) {
    this.shares.push({debtor, amount});
    return this;
  }

  /**
   *
   * @returns {{id: *, createdOn: *}}
   */
  build() {
    return {
      id: this.id,
      createdOn: this.createdOn,
      name: this.name,
      debtee: this.debtee,
      shares: this.shares
    }
  }
}

class PaymentBuilder {

  /**
   * @param {Number} id
   * @returns {PaymentBuilder}
   */
  withId(id) {
    this.id = id;
    return this;
  }

  /**
   * @returns {PaymentBuilder}
   */
  withCreationDate(date) {
    this.createdOn = date;
    return this;
  }

  /**
   * @param {String} name
   * @returns {PaymentBuilder}
   */
  withSender(name) {
    this.sender = name;
    return this;
  }

  /**
   * @param {String} name
   * @returns {PaymentBuilder}
   */
  withRecipient(name) {
    this.recipient = name;
    return this;
  }

  /**
   * @param {Number} amount
   * @returns {PaymentBuilder}
   */
  withAmount(amount) {
    this.amount = amount;
    return this;
  }

  /**
   *
   * @returns {{id: *, createdOn: *}}
   */
  build() {
    return {
      id: this.id,
      createdOn: this.createdOn,
      sender: this.sender,
      recipient: this.recipient,
      amount: this.amount
    }
  }
}

/**
 * @returns {NobtStateBuilder}
 */
export const aNobtState = () => new NobtStateBuilder()
  .withId("3XtC8MMj4bpY")
  .withName("Some nobt")
  .withCurrency("EUR")
  .withParticipatingPersons("Thomas", "David", "Philipp");

/**
 * @returns {AppStateBuilder}
 */
export const anAppState = () => new AppStateBuilder()
  .withCurrentNobt(aNobtState());

/**
 * @returns {StateBuilder}
 */
export const aStoreState = () => new StateBuilder().withApp(anAppState());

/**
 * @returns {BillBuilder}
 */
export const aBill = () => new BillBuilder();

/**
 * @returns {PaymentBuilder}
 */
export const aPayment = () => new PaymentBuilder();
