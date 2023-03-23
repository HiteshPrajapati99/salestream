const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer" }],
    },
    store_id : {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "store" }],

    },
    fullName: {
      type: String,
    },
    cartItems: {
      type: Array,
    },
    order_Price  :{
      type : Number,
    },
    address: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer_address" }],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("order" , orderSchema)