const user = require("../../models/Users");
const asyncHandler = require("express-async-handler");

// update user

module.exports.UpdateUser = async (req, res) => {
  const { firstname, lastname, email, role } = req.body;
  try {
    const data = await user.findByIdAndUpdate(req.params.id);

    if (data) {
      data.firstname = firstname;
      data.lastname = lastname;
      data.email = email;
      data.role = role || data.role;
      data.save(function (err) {
        if (err) {
          if (err.errors.firstname) {
            res.json({ success: false, message: "Please Enter First Name" });
          } else if (err.errors.lastname) {
            res.json({ success: false, message: "Please Enter Last Name" });
          } else if (err.errors.email) {
            res.json({ success: false, message: err.errors.email.message });
          } else if (err) {
            res.json({ success: false, message: "Error" + err });
          }
        } else {
          res.json({ success: true, message: "User Details Updated" });
        }
      });
    } else {
      res.json({ success: false, message: "No User Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};

//   Delete one User
module.exports.DelteUser = asyncHandler(async (req, res) => {
  try {
    const id = req.decoded;
    if (id.id === req.params.id) {
      res.json({ success: false, message: "You Can Not Delete Your Self" });
    } else {
      user.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) {
          res.json({
            success: false,
            message: "Error While Delet This User" + err,
          });
        } else {
          res.json({ success: true, message: "User Deleted successfully" });
        }
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error.message });
  }
});
