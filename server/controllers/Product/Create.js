const Products = require("../../models/Product");
const slugify = require("slugify");
const asynchandler = require("express-async-handler");

module.exports = createproduct = asynchandler(async function (req, res) {
  const {
    name,
    desc,
    price,
    quantity,
    category,
    sku,
    type,
    isfeatured,
    status,
    special_price,
    brand,
  } = req.body;

  const { id } = req.decoded;

  try {
    const model = new Products();
    model.name = name;
    model.desc = desc;
    model.price = price;
    model.quantity = quantity || 0;
    model.sku = sku || null;
    model.type = type;
    model.slug = slugify(name, { replacement: "", lower: true, trim: true });
    model.isfeatured = isfeatured || false;
    model.status = status || "draft";
    model.special_price = special_price;
    model.user_id = id;

    if (category?.length !== 0) {
      model.category = category;
    }
    if (Array.from(brand).length !== 0) {
      model.brand = brand;
    }
    if (req.files) {
      var listImg = [];
      var Listimgpath = [];

      for (var i = 0; i < req.files.length; i++) {
        var imgge = req.files[i];
        var imagepath = "http://localhost:5000/" + req.files[i].path;

        listImg.push(imgge);
        Listimgpath.push(imagepath);
      }
      model.product_img = listImg;
      model.product_img_path = Listimgpath;
    }

    model.save(function (err) {
      // console.log(err);
      if (err) {
        if (err.errors !== null) {
          if (err.errors.name) {
            res.json({ success: false, message: err.errors.name.message });
          } else if (err.errors.price) {
            res.json({
              success: false,
              message: err.errors.price.message,
            });
          } else if (err.errors.quantity) {
            res.json({ success: false, message: err.errors.quantity.message });
          }
        } else {
          res.json({ success: false, message: err.message });
        }
      } else {
        res.json({
          success: true,
          message: "Product added successfully",
          items: model,
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
