var mockServices = require("../mockServices.json");

module.exports = (req, res) => {
  const { serviceId } = req.params;

  const service = mockServices.find((service) => service.id === parseInt(serviceId));

  if (service) {
    res.status(200).json(service);
  } else {
    res.status(404).json({});
  }
};
