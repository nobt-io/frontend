import axios from 'axios';

const requestConfig = {headers: {'Content-Type': 'application/json; charset=UTF-8'}};
const apiBase =  "http://localhost:8080/";

export function getNobt(identifier) {
  return axios.get(apiBase + 'nobts/' + identifier);
}

export function createNobt(nobt) {
  return axios.post(apiBase + "nobts", JSON.stringify(nobt), requestConfig);
}
