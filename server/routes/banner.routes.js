const express = require("express");
const router = express.Router();
const upload = require("../helper/product-img");

const {
  Create_Banner,
  GetAllBanners,
  DeleteBanner,
} = require("../controllers/Banner/Create");

const { EditBanner, GetBannerbyId } = require("../controllers/Banner/Edit");

router.post("/create", upload.single("banner_image"), Create_Banner);
router.put("/edit/:id", upload.single("banner_image"), EditBanner);
router.get("/:id", GetBannerbyId);
router.get("/", GetAllBanners);
router.delete("/delete/:id", DeleteBanner);

module.exports = router;
