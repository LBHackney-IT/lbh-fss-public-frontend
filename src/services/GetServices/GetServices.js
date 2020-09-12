import axios from "axios";
const isMatch = require('lodash/isMatch');
const filter = require('lodash/filter');
const some = require('lodash/some');

const GetServices = {
  async retrieveServices({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get("http://localhost:9000/api/services", {
        params: {
          sort,
          direction,
          offset,
          limit,
          search,
        },
      });

      return response.data.entries;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async retrieveServicesByCategory({
    sort = "name",
    direction = "asc",
    offset = 0,
    taxonomyId = "",
    limit = 151,
    search = "",
  }) {
    try {
      const response = await axios.get("http://localhost:9000/api/services", {
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
        const isCategory = o => isMatch(o, {id: taxonomyId});
        const allServices = filter(response.data.entries, ({categories}) => categories.some(isCategory));

        // console.log("allServices");
        // console.log(allServices);
        data = allServices;
      } else {
        data = response.data.entries;
      }

      return data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getService(id) {
    try {
      const response = await axios.get(`http://localhost:9000/api/services/${id}`);

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetServices;
