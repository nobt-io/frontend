import factory from "api/axiosFactory";

describe("API-Factory", () => {
  it("should resolve API-Host for localhost", () => {
    var instance = factory("localhost:3000");

    expect(instance.defaults.baseURL).toBe("http://localhost:8080");
  });

  it("should resolve API-Host for nobt.io", () => {
    var instance = factory("nobt.io");

    expect(instance.defaults.baseURL).toBe("http://api.nobt.io");
  });
});
