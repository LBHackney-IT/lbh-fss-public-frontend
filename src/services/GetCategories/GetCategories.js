import axios from "axios";

const GetCategories = {
  async retrieveCategories({
    sort = "weight",
    direction = "asc",
    id = "",
  }) {
    try {
      const response = await axios.get("http://localhost:9000/api/taxonomy/category", {
        params: {
          sort,
          direction,
          id,
        },
      });
      
      let data = null;
      (id) ? data = response.data.entries.filter(obj => obj.id === id) : data = response.data.entries;
      return data;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetCategories;
