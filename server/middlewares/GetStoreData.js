const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const secret = "salestream";

module.exports.GetStoreData = asynchandler(async (req, res, next) => {
  try {
    const token = req.headers["store-access"];
    // console.log(token);
    if (token) {
      const data = {
        email: "hitesh",
        id: token,
      };
      req.decoded = data;
      next();
    } else {
      res.json({ success: false, message: "This Is Not Store" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
});



module.exports.isLogin = async (req, res, next) => {
  var token = req.body.token || req.body.query || req.headers["access-token"];

  if (token) {
     jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.json({ success: false, message: "Token invalid" });
      } else {
        req.customer = decoded;

        next();
      }
    })
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
};
