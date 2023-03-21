const Banner = require("../../models/Store_banner");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");

//  Get Banner by Id

module.exports.GetBannerbyId = asynchandler(async (req, res) => {
  try {
    const data = await Banner.findById(req.params.id);
    if (data) {
      res.json({ success: true, message: "Data Found !!", data: data });
    } else {
      res.json({ success: false, message: "Data Not Found" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  Edit Banner
module.exports.EditBanner = asynchandler(async (req, res) => {
  const { title, sub_title, button, button_link } = req.body;
  try {
    const data = await Banner.findById(req.params.id);

    data.title = title;
    data.sub_title = sub_title;
    data.button = button;
    data.slug = slugify(title, { replacement: "", lower: true, trim: true });
    data.button_link = button_link;

    if (req.file) {
      if (fs.existsSync(`./images/product_banner/${data.images[0].filename}`)) {
        fs.unlinkSync(`./images/product_banner/${data.images[0].filename}`);
      }
      data.images = req.file;
      data.images_path = "http://localhost:5000/" + req.file.path;
    }
    data.save((err) => {
      if (err) {
        if (err.errors.title) {
          res.json({ success: false, message: err.errors.title.message });
        } else {
          res.json({ success: false, message: err.message });
        }
      } else {
        res.json({ success: true, message: "Banner Updated !!" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
