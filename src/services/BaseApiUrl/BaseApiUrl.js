let BASE_API_URL = "";

const location = window.location.origin;

if (location.includes("find-support-services.hackney")) {
  BASE_API_URL = `https://qtv3g90mcf.execute-api.eu-west-2.amazonaws.com/production/api/v1`;
} else if (location.includes("find-support-services-staging.hackney")) {
  BASE_API_URL = `https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1`;
} else {
  // BASE_API_URL = `https://qtv3g90mcf.execute-api.eu-west-2.amazonaws.com/production/api/v1`;
  BASE_API_URL = `https://xx0z3bot52.execute-api.eu-west-2.amazonaws.com/staging/api/v1`;
//   BASE_API_URL = "/api";
}

export default BASE_API_URL;
