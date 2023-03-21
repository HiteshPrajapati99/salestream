const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "pro_categories",
    },
    url: {
      type: String,
    },
    user_id: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pro_categories", CategorySchema);
