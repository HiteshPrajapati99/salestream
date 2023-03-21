const Banner = require("../../models/Store_banner");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");

//  Create Blog
module.exports.Create_Banner = asynchandler((req, res) => {
  const { title, sub_title, button, button_link } = req.body;
  const { id } = req.decoded;
  try {
    const model = new Banner();

    model.title = title;
    model.sub_title = sub_title;
    model.button = button;
    model.slug = slugify(title, { replacement: "", lower: true, trim: true });
    model.button_link = button_link;
    model.posted_by = id;

    if (req.file) {
      model.images = req.file;
      model.images_path = "http://localhost:5000/" + req.file.path;
    }

    model.save((err) => {
      if (err) {
        if (err.errors.title) {
          res.json({ success: false, message: err.errors.title.message });
        } else {
          res.json({ success: false, message: err.message });
        }
      } else {
        res.json({ success: true, message: "New Banner Added" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  GEt ALl Banner
module.exports.GetAllBanners = asynchandler(async (req, res) => {
  try {
    const { id } = req.decoded;
    const data = await Banner.find({ posted_by: id });

    if (data.length !== 0) {
      res.json({ success: true, message: "Banner List Found", data: data });
    } else {
      res.json({ success: false, message: "No Banners available" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Delete banner by Id

module.exports.DeleteBanner = asynchandler(async (req, res) => {
  try {
    const data = await Banner.findByIdAndDelete(req.params.id);
    console.log(data);
    if (data) {
      if (
        data.images.length > 0 &&
        fs.existsSync(`./images/product_banner/${data.images[0].filename}`)
      ) {
        fs.unlinkSync(`./images/product_banner/${data.images[0].filename}`);
      }
      res.json({
        success: true,
        message: `${data.title} Deleted successfully`,
      });
    } else {
      res.json({
        success: false,
        message: "Please Try again !!",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
