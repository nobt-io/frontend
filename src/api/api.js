import factory from "./axiosFactory";

const api = factory(window.location.host);

class Client {

  static fetchNobt(identifier) {
    return api.get(`nobts/${identifier}`);
  }

  static createNobt(nobt) {
    return api.post("nobts", JSON.stringify(nobt), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }

  static createBill(identifier, bill) {
    return api.post(`nobts/${identifier}/expenses`, JSON.stringify(bill), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }
}

export default Client
