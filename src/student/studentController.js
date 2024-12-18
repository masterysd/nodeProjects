var studentService = require("./studentService");

var createStudentControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    var status = await studentService.createStudentDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ status: true, message: "Student created successfully" });
    } else {
      res.send({ status: false, message: "Error creating student" });
    }
  } catch (err) {
    console.error("Error in createStudentControllerFn:", err);
    res.status(500).send({ status: false, message: "Server error" });
  }
};

var LoginUserControllerFn = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);

    var result = await studentService.LoginuserDBService(req.body);

    if (result.status) {
      res.status(200).send({ status: true, message: result.msg });
    } else {
      res.status(401).send({ status: false, message: result.msg });
    }
  } catch (err) {
    console.error("Error in LoginUserControllerFn:", err);
    res.status(500).send({ status: false, message: "Server error during login" });
  }
};

module.exports = { createStudentControllerFn, LoginUserControllerFn };
