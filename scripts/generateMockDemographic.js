const fs = require("fs");
var faker = require("faker");

let demographics = [];

const demographic = ["Men", "Women", "Children", "Young people", "Families"];

for (let i = 0; i < demographic.length; i++) {
  const newDemographic = {
    id: i + 1,
    name: demographic[i],
    vocabulary: "demographic",
  };

  demographics.push(newDemographic);
}


const mockDemographicFile = "./mock-api/taxonomy/demographic/mockDemographic.json";

fs.writeFileSync(mockDemographicFile, JSON.stringify(demographics, null, 2));

console.log("Successfully generated new mock demographics");
