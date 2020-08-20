const fs = require("fs");
var faker = require("faker");
var sample = require("lodash/sample");
var sampleSize = require("lodash/sampleSize");
var random = require("lodash/random");

const count = 151;
let tid = 5;
let oid = 10;

let services = [];

const statuses = ["awaiting review", "awaiting reverification", "draft", "published", "rejected"];
const categories = ["Benefits advice", "Chat and check-in", "Debt advice", "Employment advice", "Exercise and brain", "Faith-led activities", "Families", "Feeling anxious", "Food and shopping", "Get active", "Housing advice", "Stay safe and healthy"];
const demographic = ["Men", "Women", "Children", "Young people", "Families"];
const vocabularies = ["category", "demographic"];

for (let i = 0; i < count; i++) {
  const newService = {
    id: i + 1,
    name: faker.random
      .words(2)
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" "),
    categories: [
      {
        id: tid + i,
        name: sample(categories),
        description: faker.lorem.sentences(),
        vocabulary: "category",
        weight: faker.random.number(),
      },
    ],
    contact: {  
      email: faker.internet.email(),
      telephone: faker.phone.phoneNumber(),
      website: faker.internet.url(),
    },
    demographic: [
      {
        id: tid + i,
        name: sample(demographic),
        vocabulary: "demographic",
      },
    ],
    description: faker.lorem.sentences(),
    images: {
      medium: "https://i.picsum.photos/id/76/500/300.jpg?hmac=SG6vTqxIU2jIrg9ovA4f7vaY-iZ3H4V2x_6k7KoPrxk",
      original: "https://picsum.photos/1200/600",
    },
    locations: [
      {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        uprn: faker.random.number(),
        address_1: faker.address.streetAddress(),
        address_2: faker.address.streetAddress(),
        city: faker.address.city(),
        state_province: faker.address.state(),
        postal_code: faker.address.zipCode(),
        country: faker.address.country()
      }
    ],
    organization: {
      id: oid + i,
      name: faker.random
        .words(2)
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" "),
      status: sample(statuses),
    },
    referral: {
      email: faker.internet.email(),
      website: faker.internet.url(),
    },
    social: {
      facebook: "https://www.facebook.com/" + faker.lorem.slug(),
      twitter: "https://www.twitter.com/" + faker.lorem.slug(),
      instagram: "https://www.instagram.com/" + faker.lorem.slug(),
      linkedin: "https://www.linkedin.com/" + faker.lorem.slug(),
    },
    status: {
      status: sample(statuses),
    },
    taxonomies: [
      {
        id: tid + i,
        name: faker.random
        .words(2)
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" "),
        description: faker.lorem.sentences(),
        vocabulary: sample(vocabularies),
        weight: faker.random.number(),
      },
    ],
  };

  services.push(newService);
}


const mockServiceFile = "./mock-api/services/mockServices.json";

fs.writeFileSync(mockServiceFile, JSON.stringify(services, null, 2));

console.log("Successfully generated new mock services");
