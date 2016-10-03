import axios from 'axios';
import debug from 'debug';

var instance = axios.create({
  baseURL: "http://localhost:8080/"
});

instance.interceptors.request.use(function (config) {

  debug('api:request')(`${config.method.toUpperCase()} ${config.url}`);

  if (config.data) {
    debug('api:request:data')(config.data);
  }

  return config;
}, function (error) {

  debug('api:request:error')(error);

  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {

  debug('api:response')(response);

  return response;
}, function (error) {

  debug('api:response:error')(error);
  debug('api:response:data')(error.response.data);

  return Promise.reject(error);
});

export default instance;
