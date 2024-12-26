const Trip = require("../student/tripModel");

module.exports.createTripDBService = async (tripDetails) => {
  try {
    const trip = new Trip(tripDetails);
    await trip.save();
    return { status: true, message: "Trip created successfully" };
  } catch (error) {
    console.error("Error creating trip:", error);
    return { status: false, message: "Failed to create trip" };
  }
};

module.exports.getTripsDBService = async () => {
  try {
    const trips = await Trip.find().populate("userId", "firstname lastname");
    return { status: true, data: trips };
  } catch (error) {
    console.error("Error fetching trips:", error);
    return { status: false, message: "Failed to fetch trips" };
  }
};
module.exports.deleteTripDBService = async (tripId) => {
    try {
      const result = await Trip.findByIdAndDelete(tripId);
      if (!result) {
        return { status: false, message: "Trip not found" };
      }
      return { status: true, message: "Trip deleted successfully" };
    } catch (error) {
      console.error("Error deleting trip:", error);
      return { status: false, message: "Failed to delete trip" };
    }
  };
  module.exports.updateTripDBService = async (tripId, updatedData) => {
  try {
    const result = await Trip.findByIdAndUpdate(tripId, updatedData, { new: true });

    if (!result) {
      return { status: false, message: "Trip not found" };
    }

    return { status: true, message: "Trip updated successfully", data: result };
  } catch (error) {
    console.error("Error updating trip:", error);
    return { status: false, message: "Failed to update trip" };
  }
};
