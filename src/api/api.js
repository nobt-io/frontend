import axios from 'axios';
import debug from 'debug';

const requestConfig = {headers: {'Content-Type': 'application/json; charset=UTF-8'}};
const apiBase = "http://localhost:8080/";

var log = (namespace) => (value) => {
  debug(namespace)(value);
  return value;
};

export function getNobt(identifier) {
  return axios
    .get(apiBase + 'nobts/' + identifier)
    .then((log('api:get-nobt:successs')), log('api:get-nobt:error'));
}

export function createNobt(nobt) {
  return axios
    .post(apiBase + "nobts", JSON.stringify(nobt), requestConfig)
    .then(log('api:create-nobt:successs'), log('api:create-nobt:error'));
}
