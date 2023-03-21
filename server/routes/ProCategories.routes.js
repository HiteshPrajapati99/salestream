//  Product Categories Routes

const express = require("express");
const {
  CreateCategories,
  ReadAllCategories,
  listCategory,
} = require("../controllers/categories/Create");
const {
  EditCategory,
  DeleteCategory,
} = require("../controllers/categories/EditDelete");
const router = express.Router();

router.post("/create", CreateCategories);
router.get("/", ReadAllCategories);
router.put("/edit/:id", EditCategory);
router.delete("/delete/:id", DeleteCategory);
router.get("/list", listCategory);

module.exports = router;
