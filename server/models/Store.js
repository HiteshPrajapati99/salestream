const mongoose = require("mongoose");

const Store = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Store Name"],
  },
  email: {
    type: String,
  },
  template: {
    type: String,
  },
  user_id: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
});

module.exports = mongoose.model("store", Store);
