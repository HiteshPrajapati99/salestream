//  Product Routes
const express = require("express");
const router = express.Router();
const upload = require("../helper/product-img");

const createproduct = require("../controllers/Product/Create");
const findproduct = require("../controllers/Product/FindProduct");
const Deleteproduct = require("../controllers/Product/DeleteProduct");
const { EditProduct, EditDeleteImage } = require("../controllers/Product/Edit");

const isAdmin = require("../middlewares/isAdmin");
const isLogin = require("../middlewares/veryfy");
const AddwishList = require("../controllers/user/AddwishList");
const Ratings = require("../controllers/Product/Ratings");

// Routes

router.post("/create", upload.array("product_img"), createproduct);
router.get("/", findproduct.findproduct);
router.get("/:id", findproduct.findone);
router.delete("/delete", Deleteproduct.DeleteMenny);
router.delete("/delete/:id", Deleteproduct.DeleteOne);
router.put("/edit/:id", upload.array("product_img"), EditProduct);
router.delete("/edit/delete/image/:id", EditDeleteImage);
router.put("/wishlist", isLogin, AddwishList);
router.put("/ratings", isLogin, Ratings);

module.exports = router;
