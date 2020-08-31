import axios from "axios";

const GetCategories = {
  async retrieveCategories({
    sort = "weight",
    direction = "asc",
  }) {
    try {
      const response = await axios.get("http://localhost:9000/api/taxonomy/category", {
        params: {
          sort,
          direction,
        },
      });

      return response.data.entries;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetCategories;
