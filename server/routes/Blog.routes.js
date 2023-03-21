const express = require("express");
const router = express.Router();
const upload = require("../helper/product-img");

const {
  CreateBlog,
  GetAllBlog,
  GetBlog,
} = require("../controllers/Blog/Create");

const { DeleteBlog, EditBlog } = require("../controllers/Blog/EditandDelete");

router.post("/create", upload.array("blog_img"), CreateBlog);
router.get("/", GetAllBlog);
router.get("/:id", GetBlog);
router.delete("/delete/:id", DeleteBlog);
router.put("/edit/:id", upload.array("blog_img"), EditBlog);

module.exports = router;
