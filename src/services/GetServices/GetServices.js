import axios from "axios";
import API_KEY from "../ApiKey/ApiKey";
const isMatch = require('lodash/isMatch');
const filter = require('lodash/filter');
const some = require('lodash/some');

const GetServices = {
  async retrieveServices({
    sort = "name",
    direction = "asc",
    offset = 0,
    taxonomyId = "",
    limit = 151,
    search = "",
  }) {
    try {
      const response = await axios.get("https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1/services", {
        headers: {"x-api-key": API_KEY},
        params: {
          sort,
          direction,
          offset,   
          taxonomyId,
          limit,
          search,
        },
      });

      let data = null;
      if (taxonomyId) {
        const isTaxonomy = o => isMatch(o, {id: taxonomyId});
        const allServices = filter(response.data.services, ({categories}) => categories.some(isTaxonomy));

        // console.log("allServices");
        // console.log(allServices);
        data = allServices;
      } else {
        data = response.data.services;
      }

      return data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getService(id) {
    try {
      const response = await axios.get(`https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1/services/${id}`, {
        headers: {"x-api-key": API_KEY}
      });

      // console.log("response.data");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetServices;
