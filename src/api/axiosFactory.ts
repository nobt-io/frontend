import axios from 'axios';
import debug from 'debug';

const apiBaseURLs = [
  {
    url: 'https://api.nobt.io',
    active: (host: string) => host === 'nobt.io',
  },
  {
    url: 'http://localhost:8080',
    active: (host: string) => host.includes('localhost'),
  },
];

const factory = (location: string) => {
  const entry =
    apiBaseURLs.find(e => e.active(location)) ||
    (() => {
      throw new Error(
        `No API host was configured for '${window.location.href}'.`
      );
    })();

  debug('api:factory')(`Running against API-Host: ${entry.url}`);

  const instance = axios.create({
    baseURL: entry.url,
  });

  instance.interceptors.request.use(
    config => {
      if (config.method) {
        debug('api:request')(`${config.method.toUpperCase()} ${config.url}`);
      }

      if (config.data) {
        debug('api:request:data')(config.data);
      }

      return config;
    },
    error => {
      debug('api:request:error')(error);

      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      debug('api:response')(response);

      return response;
    },
    error => {
      debug('api:response:error')(error);

      if (error.response) {
        debug('api:response:data')(error.response.data);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default factory;
