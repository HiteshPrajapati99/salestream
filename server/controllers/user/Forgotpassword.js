const user = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_secret = process.env.JWT_SECRET;
const SendEmail = require("../../helper/EmailCtr");

module.exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.json({ success: false, message: "Please Enter Email" });
    }
    const olduser = await user.findOne({ email });

    if (!olduser) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const secret = jwt_secret + olduser.password;
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, {
      expiresIn: "5m",
    });

    const link = `http://localhost:5000/store/reset/password/${olduser._id}/${token}`;
    // console.log(link);
    // const emailurl = `Hi , Please Fllow this link to reset your password. This lInk is valid till 5 minutes from now. <a href="${link}" > Click here </a>`;
    const data = {
      to: olduser.email,
      subject: "Forgot password Link",
      text: `Hi ${olduser.firstname}`,
      link: link,
    };
    SendEmail(data);
    res.json(link);
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};

module.exports.ResetpasswordLink = async (req, res) => {
  const { id, token } = req.params;

  const olduser = await user.findById({ _id: id });

  if (!olduser) {
    return res.json({ success: false, message: "User Not Found" });
  }

  const secret = jwt_secret + olduser.password;

  try {
    const veryfy = jwt.verify(token, secret);
    res.render("index", { email: veryfy.email, status: "Not verified" });
  } catch (error) {
    res.json({
      success: false,
      message: "Token Expired , Please try again later",
    });
  }
};

module.exports.ResetPassword = async (req, res) => {
  const { id, token } = req.params;

  const olduser = await user.findById({ _id: id });

  if (!olduser) {
    return res.json({ success: false, message: "User Not Found" });
  }

  const secret = jwt_secret + olduser.password;

  try {
    const veryfy = jwt.verify(token, secret);

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);

    const updated = await user.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          password: hash_password,
        },
      }
    );

    if (updated) {
      res.render("index", { email: veryfy.email, status: "verified" });
    } else {
      res.json("error");
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};
