const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title"],
    },
    sub_title: {
      type: String,
    },
    desc: {
      type: String,
      // required: true,
    },
    numviews: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    image_path: {
      type: Array,
    },
    posted_by: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
