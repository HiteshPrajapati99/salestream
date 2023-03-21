const express = require("express");
const router = express.Router();

const { FindUserData } = require("../controllers/store/Create");
const { findproduct, findone } = require("../controllers/Product/FindProduct");
const {GetStoreData , isLogin} = require("../middlewares/GetStoreData");
const { ReadAllCategories } = require("../controllers/categories/Create");
const { GetAllBanners } = require("../controllers/Banner/Create");
const { ReadBrand } = require("../controllers/Brand/Create");
const { GetAllBlog } = require("../controllers/Blog/Create");
const {customerRegister ,customerLogin} = require("../controllers/Customers/auth")
const {CreateOrder} = require("../controllers/Order/Create")

//  Customer Auth Routes 
router.post("/login" , GetStoreData , customerLogin)
router.post("/register" , GetStoreData, customerRegister )

//  Customer Services Routes
router.get("/apiv1/:title", FindUserData);
router.get("/products", GetStoreData, findproduct);
router.get("/product/:id", findone);
router.get("/categories", GetStoreData, ReadAllCategories);
router.get("/banner", GetStoreData, GetAllBanners);
router.get("/brands", GetStoreData, ReadBrand);
router.get("/blogs", GetStoreData, GetAllBlog);


// Make Order
router.post("/order" ,  isLogin,CreateOrder )


module.exports = router;
