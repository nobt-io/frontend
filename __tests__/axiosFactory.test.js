import factory from "api/axiosFactory";

describe("API-Factory", () => {
  it("should resolve API-Host for localhost", () => {
    var instance = factory("localhost:3000");

    expect(instance.defaults.baseURL).toBe("http://localhost:8080");
  });

  it("should resolve API-Host for dev host", () => {
    var instance = factory("nobt-io-frontend-dev.cfapps.io");

    expect(instance.defaults.baseURL).toBe("http://nobt-io-dev.cfapps.io");
  });

  it("should resolve API-Host for beta host", () => {
    var instance = factory("nobt-io-frontend-beta.cfapps.io");

    expect(instance.defaults.baseURL).toBe("http://nobt-io-beta.cfapps.io");
  });


  it("should resolve API-Host for production host", () => {
    var instance = factory("nobt-io-frontend.cfapps.io");

    expect(instance.defaults.baseURL).toBe("http://nobt-io.cfapps.io");
  });

  it("should resolve API-Host for review instances", () => {
    var instance = factory("review-jest-support.cfapps.io");

    expect(instance.defaults.baseURL).toBe("http://nobt-io-dev.cfapps.io");
  });
});
