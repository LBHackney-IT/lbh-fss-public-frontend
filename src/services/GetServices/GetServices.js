import axios from "axios";
const pickBy = require('lodash/pickBy');

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
    limit = 100,
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



      // var result = _.pickBy(response.data.entries.categories, value => value.name);

      // console.log("result");
      // console.log(result);




      if (response.data.entries.map(x => x.categories.filter(g=> g.id === taxonomyId))) {
        console.log("if");
        console.log(response.data.entries);
      }

      for (var i = 0; i < response.data.entries.length; i++) {
        
        // console.log(Object.keys(response.data.entries[i].categories.id));


        // console.log("for response.data.entries");
        // console.log(response.data.entries[i]);
        let a = '';
        if (a = response.data.entries[i].categories.filter(g=> g.id === taxonomyId)) {
          // console.log(response.data.entries);
          // console.log("a");
          // console.log(a);
        }
        // let a = response.data.entries[i].categories.filter(g=> g.id === taxonomyId);
        
        // if (a.length !== 0) {
        //   console.log("a");
        //   console.log(a);
        //   console.log(response.data.entries.filter(b => b.categories == a));
        // }
      }


      // get all services
      // with categories.id == taxonomyId
      // console.log("response.data.entries1");
      // console.log(response.data.entries.filter(obj => obj.categories.filter(id => id.id)));
      // console.log("response.data.entries2");
      // console.log(response.data.entries);
      // console.log("response.data.entries.filter(obj => obj.categories)");
      // console.log(response.data.entries.filter(obj => obj.categories)); // returns services
      const selectgroups =  [].concat(...response.data.entries.map(x => x.categories.filter(g=> g.id === taxonomyId))); // returns category array item within a service
      const selectedGroupIds = response.data.entries.map(g => g.categories);
      // console.log("selectedGroupIds");
      // console.log(selectedGroupIds);
      
      let data = null;
      (taxonomyId) ? data = [].concat(...response.data.entries.map(x => x.categories.filter(g=> g.id === taxonomyId))) : data = response.data.entries;
      return response.data.entries;
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
