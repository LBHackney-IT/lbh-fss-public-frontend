const PRODUCTION_ORIGIN_SUBSTRING = "find-support-services.hackney";
const STAGING_ORIGIN_SUBSTRING = "find-support-services-staging.hackney";

const PRODUCTION_API_URL =
  "https://qtv3g90mcf.execute-api.eu-west-2.amazonaws.com/production/api/v1";
const STAGING_API_URL =
  "https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1";

export function computeBaseApiUrl(getOrigin) {
  const origin = getOrigin();
  if (origin.includes(PRODUCTION_ORIGIN_SUBSTRING)) {
    return PRODUCTION_API_URL;
  }
  if (origin.includes(STAGING_ORIGIN_SUBSTRING)) {
    return STAGING_API_URL;
  }
  return STAGING_API_URL;
}

export default computeBaseApiUrl(() => globalThis.window?.location?.origin ?? "");
