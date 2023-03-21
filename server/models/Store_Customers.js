const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CustomersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name...."],
    },
    mo_number: {
      type: Number,
      required: [true, "Please Enter Number...."],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password....."],
    },
    store_id : {
      type : [{type : mongoose.Schema.Types.ObjectId , ref: "store"}]
    },
    isBlocked : {
      type : Boolean ,
      default : false,
    },
    address: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer_address" }],
    },
  },
  { timestamps: true }
);

CustomersSchema.pre("save", function (next) {
  var Customer = this;

  if (!Customer.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(Customer.password, salt, function (err, hash) {
      if (err) return next(err);

      // set hash password to database

      Customer.password = hash;
      next();
    });
  });
});


//  decrypt and compare password for login

CustomersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password , this.password)
}

module.exports = mongoose.model("customer", CustomersSchema);
