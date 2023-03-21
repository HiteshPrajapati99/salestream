const model = require("../../models/Product");
const fs = require("fs");
const slugify = require("slugify");
const asynchandler = require("express-async-handler");

module.exports.EditProduct = asynchandler(async (req, res) => {
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
    brand,
    special_price,
  } = req.body;

  try {
    const data = await model.findByIdAndUpdate(req.params.id);

    if (data) {
      data.name = name;
      data.desc = desc;
      data.price = price;
      data.special_price = special_price;
      data.quantity = quantity;
      data.category = category || data.category;
      data.sku = sku || null;
      data.type = type;
      data.slug = slugify(name, { replacement: "", lower: true, trim: true });
      data.isfeatured = isfeatured;
      data.status = status;
      data.brand = brand || data.brand;

      if (req.files.length > 0) {
        // console.log(req.files);
        // Object.keys(data.product_img).forEach((item) => {
        //   if (
        //     fs.existsSync(`./product_img/${data.product_img[item].filename}`)
        //   ) {
        //     fs.unlinkSync(`./product_img/${data.product_img[item].filename}`);
        //   }
        // });
        var listImg = [];
        var Listimgpath = [];

        for (var i = 0; i < req.files.length; i++) {
          var imgge = req.files[i];
          var imagepath = "http://localhost:5000/" + req.files[i].path;

          listImg.push(imgge);
          Listimgpath.push(imagepath);
        }
        // data.product_img = listImg;
        data.product_img_path.push(imagepath);
        data.product_img.push(imgge);
        // data.product_img_path = Listimgpath;
      }

      data.save(function (err) {
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
              res.json({
                success: false,
                message: err.errors.quantity.message,
              });
            }
          } else {
            res.json({ success: false, message: err });
          }
        } else {
          res.json({ success: true, message: "Update success!" });
        }
      });
    } else {
      res.json({ success: false, message: "product Not Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
});

module.exports.EditDeleteImage = asynchandler(async (req, res) => {
  try {
    // console.log(req.body);
    const data = await model.updateOne(
      { _id: req.params.id },
      {
        $pull: { product_img_path: req.body.file, product_img: req.body.image },
      }
    );

    if (
      data.acknowledged === true &&
      fs.existsSync(`./images/product/${req.body.image.filename}`)
    ) {
      fs.unlinkSync(`./images/product/${req.body.image.filename}`);
    }

    if (data.acknowledged == true) {
      res.json({ success: true, message: "Image Deleted Successfully !!" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
});
