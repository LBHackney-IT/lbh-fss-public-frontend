import axios from "axios";

const GetCategories = {
  async retrieveCategories({
    sort = "name",
    direction = "asc",
    offset = 0,
    limit = 10,
    search = "",
  }) {
    try {
      const response = await axios.get("http://localhost:9000/api/taxonomy/category", {
        
      });

      return response.data.entries;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default GetCategories;
