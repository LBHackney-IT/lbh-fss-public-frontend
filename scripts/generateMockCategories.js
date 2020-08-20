const fs = require("fs");
var faker = require("faker");

let categories = [];

const category = ["Benefits advice", "Chat and check-in", "Debt advice", "Employment advice", "Exercise and brain", "Faith-led activities", "Families", "Feeling anxious", "Food and shopping", "Get active", "Housing advice", "Stay safe and healthy"];

for (let i = 0; i < category.length; i++) {
  const newCategory = {
    id: i + 1,
    name: category[i],
    description: faker.lorem.sentences(),
    vocabulary: "category",
  };

  categories.push(newCategory);
}


const mockCategoryFile = "./mock-api/taxonomy/category/mockCategories.json";

fs.writeFileSync(mockCategoryFile, JSON.stringify(categories, null, 2));

console.log("Successfully generated new mock categories");
