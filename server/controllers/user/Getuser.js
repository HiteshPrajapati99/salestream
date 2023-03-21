const user = require("../../models/Users");

// Get Login User
module.exports.profile = async (req, res) => {
  try {
    const data = await user.findById(req.decoded.id);
    if (data) {
      res.json({ success: true, message: "User Found", userdata: data });
    } else {
      res.json({ success: false, message: "No User Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};

// Get All User List

module.exports.GetAllUser = async (req, res) => {
  try {
    const data = await user.find();

    if (data) {
      res.json({ success: true, message: "User List Found", users: data });
    } else {
      res.json({ success: false, message: "No User Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};
