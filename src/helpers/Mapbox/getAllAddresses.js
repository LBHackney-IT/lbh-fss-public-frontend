const getAllAddresses = data => {
  if (data.constructor !== Array) {
    data = [data];
  }
  let duplicateService = [...data];

  let i = 0;
  while (i < data.length) {
    // check if any services have multiple locations
    if (data[i].locations.length > 1) {
      // store the locations for the specific service
      const locationsArray = data[i].locations;
      // iterate through each locationsArray and push to thisService.locations
      for (const [key, value] of Object.entries(locationsArray.slice(1))) {
        // duplicate the specific service
        let thisService = {...data[i]};
        // reset the specific service locations array to be rewritten
        thisService.locations = [];
        // push specific service location object value into the empty array
        thisService.locations.push(value);
        // push thisService into duplicateService
        duplicateService.push(thisService);
      }
    }
    i++;
  }
  return duplicateService;
}

export default getAllAddresses;