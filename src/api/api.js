import api from "./axiosFactory";

export function getNobt(identifier) {
  return api.get(`nobts/${identifier}`);
}

export function createNobt(nobt) {
  return api.post("nobts", JSON.stringify(nobt), {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
}

export function createExpense(identifier, expense) {
  return api.post(`nobts/${identifier}/expenses`, JSON.stringify(expense), {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
}
