const express = require("express");
const router = express.Router();
const auth = require("../controllers/user/auth");
const LoginUser = require("../controllers/user/Getuser");
const Users = require("../controllers/user/DeleteAndEdit");
const isLogin = require("../middlewares/veryfy");
const isAdmin = require("../middlewares/isAdmin");
const UserSattus = require("../controllers/user/BlockUnblock");
const password = require("../controllers/user/Forgotpassword");
const Categories = require("./ProCategories.routes");
const Brand = require("./Brand.routes");
const Blog = require("./Blog.routes");
const Banner = require("./banner.routes");
const product = require("./product.routes");

// Auth Routes
router.post("/register", auth.register);
router.post("/login", auth.login);

// Auth User Routes

router.get("/profile", isLogin, LoginUser.profile);
router.put("/profile/update/:id", isLogin, Users.UpdateUser);
router.put("/user/block/:id", UserSattus.BlockUser);
router.put("/user/unblock/:id", UserSattus.UnblockUser);

// Forgot Login User Password
router.post("/forgot-password", password.ForgotPassword);
router.get("/reset/password/:id/:token", password.ResetpasswordLink);
router.post("/reset/password/:id/:token", password.ResetPassword);

// Admin Routes
router.get("/users", isLogin, isAdmin, LoginUser.GetAllUser);
router.delete("/user/:id", isLogin, isAdmin, Users.DelteUser);

//  Product Routes
router.use("/product", isLogin, product);
router.use("/categories", isLogin, Categories);
router.use("/brand", isLogin, Brand);
router.use("/blog", isLogin, Blog);
router.use("/banner", isLogin, Banner);

//  Store Routes
const { CreateStore, FindbyTitle } = require("../controllers/store/Create");
const { EditStore } = require("../controllers/store/EditDelete");
router.post("/store/create", isLogin, CreateStore);
router.get("/store/getStoredata", isLogin, FindbyTitle);
router.put("/store/edit/:id", isLogin, EditStore);


// Customers Routes
const {GetAllCustomers} = require("../controllers/Customers/GetCustomers")
const {BlockCustomer , UnblockCustomer} = require("../controllers/Customers/BlockUnblock")

router.get("/customers" , isLogin , isAdmin , GetAllCustomers)
router.get("/customers/block/:id" , isLogin , isAdmin , BlockCustomer)
router.get("/customers/unblock/:id" , isLogin , isAdmin , UnblockCustomer)

// dectypt Data

const { decryptdata } = require("../middlewares/crypto");
router.post("/decyrpt", decryptdata);

module.exports = router;
// routes
