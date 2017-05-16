import axios from "axios";
import debug from "debug";

const apiBaseURLs = [
  {
    url: "http://nobt-io-api-prod.eu-central-1.elasticbeanstalk.com",
	    active: (host) => {
      return host === "nobt-io-frontend-prod.s3-website.eu-central-1.amazonaws.com"
    }
  },
  {
    url: "http://localhost:8080",
    active: (host) => host.includes("localhost")
  },
];

const factory = (location) => {
  const entry = apiBaseURLs.find(e => e.active(location)) || (() => {
    throw new Error(`No API host was configured for '${window.location.href}'.`);
  })();

  debug("api:factory")(`Running against API-Host: ${entry.url}`);

  var instance = axios.create({
    baseURL: entry.url
  });

  instance.interceptors.request.use(function (config) {

    debug("api:request")(`${config.method.toUpperCase()} ${config.url}`);

    if (config.data) {
      debug("api:request:data")(config.data);
    }

    return config;
  }, function (error) {

    debug("api:request:error")(error);

    return Promise.reject(error);
  });

  instance.interceptors.response.use(function (response) {

    debug("api:response")(response);

    return response;
  }, function (error) {

    debug("api:response:error")(error);

    if (error.response) {
      debug("api:response:data")(error.response.data);
    }

    return Promise.reject(error);
  });

  return instance;
};

export default factory;
