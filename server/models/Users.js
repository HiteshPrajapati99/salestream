const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");

let schema = mongoose.Schema;

let EmailValidator = [
  validate({
    validator: "matches",
    arguments: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    message: "Please enter a valid email",
  }),
];

let passwordValidator = [
  validate({
    validator: "matches",
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
    message:
      "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.",
  }),
  validate({
    validator: "isLength",
    arguments: [8, 35],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

const UserSchema = new schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
      validate: EmailValidator,
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
      validate: passwordValidator,
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    isblocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    
    addwishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// password decrypt and Compare algorithm
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// {
//   UserSchema.pre("save", function (next) {
//     let user = this;
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified("password")) return next();

//     // generate a salt
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.password, salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           } else {
//             user.password = hash;
//             next();
//           }
//         });
//       }
//     });
//   });

//   // password decrypt and Compare algorithm

//   UserSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
//   };
// }
const model = mongoose.model("user", UserSchema);

module.exports = model;
