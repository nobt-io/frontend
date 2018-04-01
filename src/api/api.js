import factory from "./axiosFactory";

class Client {

  static axiosInstance = null;

  static instance() {

  if (Client.axiosInstance === null) {
    Client.axiosInstance = factory(window.location.host);
  }

  return Client.axiosInstance;
}

  static delete(uri) {
    return Client.instance().delete(uri);
  }

  static fetchNobt(identifier) {
    return Client.instance().get(`nobts/${identifier}`);
  }

  static createNobt(nobt) {
    return Client.instance().post("nobts", JSON.stringify(nobt), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }

  static createBill(identifier, bill) {
    return Client.instance().post(`nobts/${identifier}/expenses`, JSON.stringify(bill), {headers: {"Content-Type": "application/json; charset=UTF-8"}});
  }
}

export default Client
