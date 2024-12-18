var express = require("express");
var studentController = require("../src/student/studentController");
const router = express.Router();

// Route for creating a student
router.route("/student/create").post(studentController.createStudentControllerFn);

// Route for user login
router.route("/user/login").post(studentController.LoginUserControllerFn);

module.exports = router;
