const mongoose = require("mongoose");

module.exports = UserValidation = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id);

  if (!isvalid) {
    throw new Error("Not Valid");
  }
};

module.exports.IdValidation = (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    if (isvalid) {
      next();
    } else {
      res.json({ success: false, message: "This is Not Valid Request" });
    }
  } catch (error) {
    res.json({ success: false, message: "Servere Error" + error });
  }
};
