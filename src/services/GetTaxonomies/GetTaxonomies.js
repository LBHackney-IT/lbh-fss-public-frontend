import axios from "axios";
import BASE_API_URL from "../BaseApiUrl/BaseApiUrl";

const GetTaxonomies = {
  async retrieveTaxonomies({
    sort = "weight",
    direction = "asc",
    vocabulary = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies`, {
        params: {
          sort,
          direction,
          vocabulary,
        },
      });

      return response.data.taxonomies;
    } catch (error) {
      console.error(error);

      return {
        "taxonomies": []
      };
    }
  },
  async getTaxonomy(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies/${id}`, {

      });

      return response.data;
    } catch (error) {
      console.error(error);

      return {};
    }
  },
};

export default GetTaxonomies;
