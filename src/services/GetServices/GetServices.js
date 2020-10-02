import axios from "axios";
import API_KEY from "../ApiKey/ApiKey";
import BASE_API_URL from "../BaseApiUrl/BaseApiUrl";
import qs from "qs";

const GetServices = {
  async retrieveServices({
    search = "",
    offset = 0,
    taxonomyids = "",
    limit = 0,
    postcode = "",
  }) {
    // prepare taxonomies into an array
    if (taxonomyids.length === 1) {
      // if only one vocabulary is selected
      if (Array.isArray(taxonomyids[0])) {
        taxonomyids = taxonomyids[0];
      } else {
        taxonomyids = taxonomyids[0].split("+");
      }
    } else if (taxonomyids.length > 1) {
      // check if elements are array and convert to string by +
      if (Array.isArray(taxonomyids[0])) {
        taxonomyids[0] = taxonomyids[0].join("+");
      }
      if (Array.isArray(taxonomyids[1])) {
        taxonomyids[1] = taxonomyids[1].join("+");
      }
      // append + before concatenating both categories and demographics array
      taxonomyids[0] = taxonomyids[0]+"+";
      taxonomyids = taxonomyids[0].concat(taxonomyids[1]);
      taxonomyids = taxonomyids.split("+");
    }
    
    try {
      const response = await axios.get(`${BASE_API_URL}/services`, {
        headers: {"x-api-key": API_KEY},
        params: {
          search,
          offset,
          taxonomyids,
          limit,
          postcode,
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getService({
    id,
    postcode = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/services/${id}`, {
        headers: {"x-api-key": API_KEY},
        params: {
          postcode,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetServices;
