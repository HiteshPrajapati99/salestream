const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Brand Name !!!"],
    },
    slug: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    images: {
      type: Array,
    },
    images_path: {
      type: Array,
    },
    user_id: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pro_brand", brandSchema);
