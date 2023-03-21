const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },

    desc: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "price is Required"],
    },

    special_price: {
      type: Number,
    },

    status: {
      type: String,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
    },

    sku: {
      type: String,
    },

    type: {
      type: String,
    },
    slug: {
      type: String,
      // required: true,
    },
    isfeatured: {
      type: Boolean,
      default: false,
    },

    product_img: {
      type: Array,
    },

    product_img_path: {
      type: Array,
    },
    color: {
      type: String,
      enum: ["black", "red", "yellow", "blue"],
    },
    category: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "pro_categories" }],
    },
    brand: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "pro_brand" }],
    },
    ratings: [
      {
        star: Number,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
