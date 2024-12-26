const tripService = require("../student/tripService");

module.exports.createTripControllerFn = async (req, res) => {
  try {
    const status = await tripService.createTripDBService(req.body);
    if (status.status) {
      res.status(201).send(status);
    } else {
      res.status(400).send(status);
    }
  } catch (error) {
    console.error("Error in createTripControllerFn:", error);
    res.status(500).send({ status: false, message: "Server error" });
  }
};
  
module.exports.getTripsControllerFn = async (req, res) => {
  try {
    const status = await tripService.getTripsDBService();
    if (status.status) {
      res.status(200).send(status);
    } else {
      res.status(400).send(status);
    }
  } catch (error) {
    console.error("Error in getTripsControllerFn:", error);
    res.status(500).send({ status: false, message: "Server error" });
  }
};

module.exports.deleteTripControllerFn = async (req, res) => {
    try {
      const tripId = req.params.id;
      const result = await tripService.deleteTripDBService(tripId);
      if (result.status) {
        res.status(200).send(result);
      } else {
        res.status(400).send(result);
      }
    } catch (error) {
      console.error("Error in deleteTripControllerFn:", error);
      res.status(500).send({ status: false, message: "Server error" });
    }
  };
module.exports.updateTripControllerFn = async (req, res) => {
  try {
    const tripId = req.params.id;
    const updatedData = req.body;

    const result = await tripService.updateTripDBService(tripId, updatedData);

    if (result.status) {
      res.status(200).send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (error) {
    console.error("Error in updateTripControllerFn:", error);
    res.status(500).send({ status: false, message: "Server error" });
  }
};