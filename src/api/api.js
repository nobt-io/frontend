import axios from 'axios';

const requestConfig = {headers: {'Content-Type': 'application/json; charset=UTF-8'}};
const apiBase =  "http://localhost:8080/";

export function getNobt(identifier, callback) {
  axios.get(apiBase + 'nobts/' + identifier)
    .then(response => {
      callback(response);
    });
}

export function createNobt(nobt, callback) {
  axios
    .post(apiBase + "nobts", JSON.stringify(nobt), requestConfig)
    .then(response => {
      callback(response);
    })
}
