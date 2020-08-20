let mockCategories = require("./mockCategories.json");

module.exports = (req, res) => {
  const sort = req.query.sort || "name";
  const direction = req.query.direction || "asc";

  const categories = [...mockCategories]
    .sort(function (a, b) {
      return direction.toLowerCase() === "asc"
        ? a[sort].localeCompare(b[sort])
        : b[sort].localeCompare(a[sort]);
    });

  return res.status(200).send({
    entries: categories,
    order: [
      {
        by: sort,
        direction: direction.toUpperCase(),
      },
    ],
    total_count: mockCategories.length,
  });
};
