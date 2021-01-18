import axios from "axios";
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
        taxonomyids[0] = taxonomyids[0].toString();
        if (taxonomyids[0].indexOf('+') > -1) {
          taxonomyids = taxonomyids[0].split("+");
        } else {
          taxonomyids = taxonomyids[0];
        }
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

      return {
        "services": []
      };
    }
  },
  async getService({
    id,
    postcode = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/services/${id}`, {
        params: {
          postcode,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return {
        "service": {"demographic": []}
      };
    }
  },
};

export default GetServices;
