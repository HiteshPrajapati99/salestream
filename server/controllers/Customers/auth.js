const Customers = require("../../models/Store_Customers");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const secret = "salestream";
const store = require("../../models/Store")

// =================== Customers Register

module.exports.customerRegister = asyncHandler(async (req, res) => {
  const { name, mo_number, email, password } = req.body;
  const {id} = req.decoded;
  // console.log(req.decoded);
  const storeData = await store.findOne({user_id : id})

  try {
    
    const allRedyUser = await Customers.findOne({store_id : storeData._id , email })
// console.log(allRedyUser);
    if (allRedyUser) {
      return res.json({
        success: false,
        message: "This account is already exists !!...",
      });
    }

    const user = new Customers();

    user.name = name;
    user.mo_number = mo_number;
    user.email = email;
    user.password = password;
    user.store_id  = storeData._id;
    user.isBlocked = false;
    

    user.save((err) => {
      if (err) {
        if (err.errors.name) {
          res.json({ success: false, message: err.errors.name.message });
        } else if (err.errors.mo_number) {
          res.json({ success: false, message: err.errors.mo_number.message });
        } else if (err.errors) {
          res.json({ success: false, message: err.message });
        }
      } else {
        res.json({
          success: true,
          message: "You have registered successfully...",
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

// ==================== Customer Login

module.exports.customerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
const {id} = req.decoded;
  try {
    if (!email && !password) {
      return res.json({
        success: false,
        message: "Please Enter Email And Password",
      });
    }
    const storeData = await store.findOne({user_id : id})

    Customers.findOne({ store_id : storeData._id , email  })
      .select("email password")
      .exec(function (err, customer) {
        if (err) {
          return res.json({ success: false, message: err.message });
        }

        if (!customer) {
          return res.json({
            success: false,
            message: "This User Is Not Register !!!",
          });
        }

        if (!password) {
          res.json({
            success: false,
            message: "Please Enter password !!! ",
          });
        } else {
          let validPassword = customer.comparePassword(password);
          if (!validPassword) {
            res.json({
              success: false,
              message: "Email and Password combination is incorrect !!!",
            });
          } else {
            let token = jwt.sign(
              {
                email: customer.email,
                id: customer.id,
              },
              secret,
              { expiresIn: "24h" }
            );

            res.json({
              success: true,
              message: "Login Successfull....",
              token: token,
            });
          }
        }
      });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});
