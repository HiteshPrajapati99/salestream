const categories = require("../../models/Product_Categories");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");

//  Create Categories
module.exports.CreateCategories = asynchandler(async (req, res) => {
  const { name, status, parent_id } = req.body;
  const { id } = req.decoded;
  try {
    const oldcategory = await categories.findOne({ name });
    if (oldcategory) {
      return res.json({ success: false, message: "Category already exist!" });
    }

    const model = new categories();

    model.name = name;
    model.slug = slugify(name, { replacement: "", lower: true, trim: true });
    model.parent_id = parent_id || null;
    model.status = status || false;
    model.user_id = id;

    model.save((err) => {
      if (err) {
        if (err.errors.name) {
          res.json({ success: false, message: err.errors.name.message });
        } else {
          res.json({ success: false, message: "Error" + err.message });
        }
      } else {
        res.json({
          success: true,
          message: "category Create Succesfully",
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  Read All Categoris

module.exports.ReadAllCategories = asynchandler(async (req, res) => {
  try {
    const { id } = req.decoded;
    const data = await categories.find({ user_id: id });

    if (data.length === 0) {
      return res.json({ success: false, message: "No Data Found" });
    }

    res.json({
      success: true,
      message: "Categories List Found",
      data: nestedCategories(data),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

function nestedCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((item) => item.parent_id === null);
  } else {
    category = categories.filter(
      (item) => String(item.parent_id) === String(parentId)
    );
  }
  // console.log(category);

  for (let items of category) {
    categoryList.push({
      _id: items._id,
      name: items.name,
      slug: items.slug,
      status: items.status,
      url: items.url,
      sub_categories: nestedCategories(categories, items._id),
    });
  }
  return categoryList;
}

// Get Category List No nested
module.exports.listCategory = asynchandler(async (req, res) => {
  try {
    const { id } = req.decoded;
    const data = await categories.find({ user_id: id }).populate("parent_id");

    if (data.length === 0) {
      return res.json({ success: false, message: "No Data Found" });
    }

    res.json({
      success: true,
      message: "Categories List Found",
      data: data,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
