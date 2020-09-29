import axios from "axios";
import API_KEY from "../ApiKey/ApiKey";

const GetTaxonomies = {
  async retrieveTaxonomies({
    sort = "weight",
    direction = "asc",
    vocabulary = "",
  }) {
    try {
      const response = await axios.get(`https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1/taxonomies`, {
        headers: {"x-api-key": API_KEY},
        params: {
          sort,
          direction,
          vocabulary,
        },
      });

      let data = null;
      (vocabulary) ? data = response.data.taxonomies.filter(obj => obj.vocabulary === vocabulary) : data = response.data.taxonomies;
      return data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
  async getTaxonomy(id) {
    try {
      const response = await axios.get(`https://1ah37v184c.execute-api.eu-west-2.amazonaws.com/development/api/v1/taxonomies/${id}`, {
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
