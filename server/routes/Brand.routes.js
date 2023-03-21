const express = require("express");
const router = express.Router();
const brand = require("../controllers/Brand/Create");
const { DeleteBrand } = require("../controllers/Brand/EditDelete");
const upload = require("../helper/product-img");

router.post("/create", upload.single("brand_image"), brand.CreateBrand);
router.get("/", brand.ReadBrand);
router.delete("/delete/:id", DeleteBrand);

module.exports = router;
