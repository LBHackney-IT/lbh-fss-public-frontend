const fs = require("fs");
var faker = require("faker");

let categories = [];

const category = ["Loneliness or isolation", "Anxiety or mental health", "Safe and healthy body", "Exercise and wellbeing", "Arts and creativity", "Food or shopping", "Faith-led activities", "Money advice", "Employment advice", "Housing advice", "Immigration advice"];

for (let i = 0; i < category.length; i++) {
  const newCategory = {
    id: i + 1,
    name: category[i],
    description: faker.lorem.sentences(),
    vocabulary: "category",
    weight: faker.random.number(),
  };

  categories.push(newCategory);
}


const mockCategoryFile = "./mock-api/taxonomy/category/mockCategories.json";

fs.writeFileSync(mockCategoryFile, JSON.stringify(categories, null, 2));

console.log("Successfully generated new mock categories");
