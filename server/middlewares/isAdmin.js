const user = require("../models/Users");

module.exports = isAdmin = async (req, res, next) => {
  // console.log(req.decoded.id);
  const { id } = req.decoded;
  try {
    const userdata = await user.findById(id);
    if (userdata.role === "admin") {
      next();
    } else {
      res.json({ success: false, message: "You Are Not Admin" });
    }
  } catch (error) {
    res.json({ success: false, message: "Servere Error" + error });
  }
};
