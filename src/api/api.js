import factory from "./axiosFactory";

class Client {

  static instance = null;

  static api() {

  if (Client.instance === null) {
    Client.instance = factory(window.location.host);
  }

  return Client.instance;
}

  static fetchNobt(identifier) {
    return Client.api().get(`nobts/${identifier}`);
  }

  static createNobt(nobt) {
    return Client.api().post("nobts", JSON.stringify(nobt), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }

  static createBill(identifier, bill) {
    return Client.api().post(`nobts/${identifier}/expenses`, JSON.stringify(bill), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }
}

export default Client
