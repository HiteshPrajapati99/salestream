const User = require("../../models/Users");
const jwt = require("jsonwebtoken");

// Register Module
module.exports.register = async function (req, res) {
  const { firstname, lastname, email, password, role } = req.body;
  try {
    // if (
    //   firstname == null ||
    //   lastname == null ||
    //   email == null ||
    //   password == null
    // ) {
    //   return res.json({ success: false, message: "All Fields Are Mandatory" });
    // }

    // Chek User Is new or Not
    const preUser = await User.findOne({ email });
    if (preUser) {
      return res.json({
        success: false,
        message: "This account is already exists !!...",
      });
    }

    // add user
    const user = new User();

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.role = role || "admin";

    user.save(function (err) {
      if (err) {
        if (err.errors != null) {
          if (err.errors.firstname) {
            return res.json({
              success: false,
              message: "Please Enter First Name",
            });
          }

          if (err.errors.lastname) {
            return res.json({
              success: false,
              message: "Please Enter Last Name",
            });
          }

          if (err.errors.email) {
            return res.json({
              success: false,
              message: err.errors.email.message,
            });
          }

          if (err.errors.password) {
            return res.json({
              success: false,
              message: err.errors.password.message,
            });
          }
        } else {
          res.json({ success: false, message: "ERROR" + err });
        }
      } else {
        res.json({
          success: true,
          message: "You have registered successfully...",
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};

// Login Module

module.exports.login = function (req, res) {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.json({
      success: false,
      message: "Please Enter Email And Password",
    });
  }

  try {
    User.findOne({ email })
      .select("email password role")
      .exec(function (err, user) {
        if (err) {
          return res.json({ success: false, message: "ERROR" + err.message });
        }

        if (!user) {
          return res.json({
            success: false,
            message: "This User Is Not Register !!!",
          });
        }
        if (!password) {
          res.json({
            success: false,
            message: "Please Enter password !!! ",
          });
        } else {
          let validPassword = user.comparePassword(password);
          if (!validPassword) {
            res.json({
              success: false,
              message: "Email and Password combination is incorrect !!!",
            });
          } else {
            let token = jwt.sign(
              { email: user.email, id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            let role = user.role;

            res.json({
              success: true,
              message: "Login Successfull....",
              token: token,
              role: role,
            });
          }
        }
      });
  } catch (error) {
    res.json({ success: false, message: "ERROR" + error });
  }
};
