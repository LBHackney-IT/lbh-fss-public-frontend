import { computeBaseApiUrl } from "./BaseApiUrl";

describe("BaseApiUrl", () => {
  it("returns production API URL when origin includes find-support-services.hackney", () => {
    expect(computeBaseApiUrl(() => "https://find-support-services.hackney.gov.uk")).toBe(
      "https://qtv3g90mcf.execute-api.eu-west-2.amazonaws.com/production/api/v1",
    );
  });

  it("returns staging API URL when origin includes find-support-services-staging.hackney", () => {
    expect(
      computeBaseApiUrl(() => "https://find-support-services-staging.hackney.gov.uk"),
    ).toBe("https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1");
  });

  it("returns staging API URL for localhost / other origins", () => {
    expect(computeBaseApiUrl(() => "http://localhost:3000")).toBe(
      "https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1",
    );
  });
});
