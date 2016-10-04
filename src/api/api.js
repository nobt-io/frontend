import api from './axiosFactory'

export function getNobt(identifier) {
  return api.get(`nobts/${identifier}`);
}

export function createNobt(nobt) {
  return api.post("nobts", JSON.stringify(nobt), {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
}