describe("BaseApiUrl", () => {
  const originalLocation = window.location;

  afterEach(() => {
    window.location = originalLocation;
    jest.resetModules();
  });

  it("returns production API URL when origin includes find-support-services.hackney", () => {
    delete window.location;
    window.location = { origin: "https://find-support-services.hackney.gov.uk" };
    const BaseApiUrl = require("./BaseApiUrl").default;
    expect(BaseApiUrl).toBe(
      "https://qtv3g90mcf.execute-api.eu-west-2.amazonaws.com/production/api/v1",
    );
  });

  it("returns staging API URL when origin includes find-support-services-staging.hackney", () => {
    delete window.location;
    window.location = {
      origin: "https://find-support-services-staging.hackney.gov.uk",
    };
    jest.resetModules();
    const BaseApiUrl = require("./BaseApiUrl").default;
    expect(BaseApiUrl).toBe(
      "https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1",
    );
  });

  it("returns staging API URL for localhost / other origins", () => {
    delete window.location;
    window.location = { origin: "http://localhost:3000" };
    jest.resetModules();
    const BaseApiUrl = require("./BaseApiUrl").default;
    expect(BaseApiUrl).toBe(
      "https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1",
    );
  });
});
