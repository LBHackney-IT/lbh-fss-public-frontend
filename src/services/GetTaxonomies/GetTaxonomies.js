import axios from "axios";
import API_KEY from "../ApiKey/ApiKey";
import BASE_API_URL from "../BaseApiUrl/BaseApiUrl";

const GetTaxonomies = {
  async retrieveTaxonomies({
    sort = "weight",
    direction = "asc",
    vocabulary = "",
  }) {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies`, {
        headers: {"x-api-key": API_KEY},
        params: {
          sort,
          direction,
          vocabulary,
        },
      });

      return response.data.taxonomies;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getTaxonomy(id) {
    try {
      const response = await axios.get(`${BASE_API_URL}/taxonomies/${id}`, {
        headers: {"x-api-key": API_KEY}
      });

      return response.data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetTaxonomies;
