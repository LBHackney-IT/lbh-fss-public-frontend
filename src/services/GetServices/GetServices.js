import axios from "axios";
import API_KEY from "../ApiKey/ApiKey";
import qs from "qs";

const GetServices = {
  async retrieveServices({
    sort = "id",
    search = "",
    offset = 0,
    taxonomyids = "",
    limit = 0,
    postcode = "",
    
  }) {
    // get subarray from SelectCategories
    if (Array.isArray(taxonomyids[0])) {
      taxonomyids = taxonomyids[0];
    }
    // if array only has 1 item, check to see if it is a concatenated array element and split
    if (taxonomyids.length === 1) {
      taxonomyids = taxonomyids[0].split("+");
    }
    try {
      const response = await axios.get("https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1/services", {
        headers: {"x-api-key": API_KEY},
        params: {
          sort,
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
      // console.log(response);
      // console.log("response.data.services");
      // console.log(response.data.services);
      return response.data.services;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getService(id) {
    const options = {
      headers: {'Content-Type': 'application/json', 'x-api-token': 'h6Iu4Ocm1S9ttoJsXBBGl8NpdgEn7sTVRLBfGSZ6'}
    };
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
