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

  data = {};
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

  build = () => {
    return {
      data: {...this.data},
      fetchNobtStatus: this.fetchNobtStatus,
      nobtFetchTimestamp: this.nobtFetchTimestamp
    }
  }
}

/**
 * @type {NobtStateBuilder}
 */
export const aNobtState = new NobtStateBuilder()
  .withId("3XtC8MMj4bpY")
  .withName("Some nobt")
  .withCurrency("EUR")
  .withParticipatingPersons("Thomas", "David", "Philipp");

/**
 * @type {AppStateBuilder}
 */
export const anAppState = new AppStateBuilder()
  .withCurrentNobt(aNobtState);

/**
 * @type {StateBuilder}
 */
export const aStoreState = new StateBuilder()
  .withApp(anAppState);
