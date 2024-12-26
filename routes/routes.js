var express = require("express");
var studentController = require("../src/student/studentController");
var tripController = require("../src/student/tripController");
const router = express.Router();

// Route for creating a student
router.route("/student/create").post(studentController.createStudentControllerFn);

// Route for user login
router.route("/user/login").post(studentController.LoginUserControllerFn);
// Route for user edit
router.put("/trips/:id", tripController.updateTripControllerFn);





router.post("/trips", tripController.createTripControllerFn);
router.get("/trips", tripController.getTripsControllerFn);
router.delete("/trips/:id", tripController.deleteTripControllerFn);



module.exports = router;
