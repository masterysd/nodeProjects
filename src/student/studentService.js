var studentModel = require("./studentModel");
var key = "123456789trytryrtyr";
var encryptor = require("simple-encryptor")(key);

// Service to create a student
module.exports.createStudentDBService = async (studentDetails) => {
  try {
    var studentModelData = new studentModel();

    studentModelData.firstname = studentDetails.firstname;
    studentModelData.lastname = studentDetails.lastname;
    studentModelData.email = studentDetails.email;
    studentModelData.password = encryptor.encrypt(studentDetails.password);

    await studentModelData.save();
    return true;
  } catch (error) {
    console.error("Error saving student data:", error);
    return false;
  }
};

module.exports.LoginuserDBService = async (studentDetails) => {
  try {
    console.log("Login attempt for email:", studentDetails.email);

    const user = await studentModel.findOne({ email: studentDetails.email });
    if (!user) {
      console.warn("User not found:", studentDetails.email);
      return { status: false, msg: "User not found" };
    }

    const decryptedPassword = encryptor.decrypt(user.password);
    if (decryptedPassword !== studentDetails.password) {
      console.warn("Invalid password for user:", studentDetails.email);
      return { status: false, msg: "Invalid password" };
    }

    console.log("Login successful for:", studentDetails.email);
    return { status: true, msg: "Login successful" };
  } catch (error) {
    console.error("Error during login:", error);
    return { status: false, msg: "Unexpected error during login" };
  }
};
