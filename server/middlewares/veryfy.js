const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = isLogin = async (req, res, next) => {
  var token = req.body.token || req.body.query || req.headers["x-access-token"];

  if (token) {
     jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.json({ success: false, message: "Token invalid" });
      } else {
        req.decoded = decoded;

        next();
      }
    })
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
};
