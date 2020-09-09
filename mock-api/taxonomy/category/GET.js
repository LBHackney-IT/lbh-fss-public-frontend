let mockCategories = require("./mockCategories.json");

module.exports = (req, res) => {
  const sort = req.query.sort || "weight";
  const direction = req.query.direction || "asc";
  const id = req.query.id || "";

  const categories = [...mockCategories]
    .sort(function (a, b) {
      return a.weight - b.weight;
    });

  return res.status(200).send({
    entries: categories,
    id: id,
    order: [
      {
        by: sort,
        direction: direction.toUpperCase(),
      },
    ],
    total_count: mockCategories.length,
  });
};
