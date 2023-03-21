const mongoose = require("mongoose");

const { Schema } = mongoose;

const Banner = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter banner title !!"],
    },
    slug: {
      type: String,
    },
    sub_title: {
      type: String,
    },
    images: {
      type: Array,
    },
    images_path: {
      type: Array,
    },
    button: {
      type: String,
    },
    button_link: {
      type: String,
    },
    posted_by: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product_banner", Banner);
