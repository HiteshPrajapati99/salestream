const brand = require("../../models/Store_Brand");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");

//  Create Brand
module.exports.CreateBrand = asynchandler(async (req, res) => {
  const { title, status } = req.body;
  const { id } = req.decoded;
  // console.log(req.body);

  try {
    const oldBrand = await brand.findOne({ title });
    if (oldBrand) {
      return res.json({ success: false, message: "Brand already exist!" });
    }

    const model = new brand();

    model.title = title;
    model.status = status || false;
    model.slug = slugify(title, { replacement: "", lower: true, trim: true });
    model.user_id = id;

    if (req.file) {
      model.images = req.file;
      model.images_path = "http://localhost:5000/" + req.file.path;
    }

    model.save((err) => {
      if (err) {
        if (err.errors.title) {
          res.json({ success: false, message: err.errors.title.message });
        } else {
          res.json({ success: false, message: "Error" + err.message });
        }
      } else {
        res.json({
          success: true,
          message: "Brand Created Succesfully",
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//  Read All Brands

module.exports.ReadBrand = asynchandler(async (req, res) => {
  try {
    const { id } = req.decoded;
    const data = await brand.find({ user_id: id });

    if (data.length !== 0) {
      res.json({ success: true, message: "Brand List Found", data: data });
    } else {
      res.json({ success: false, message: "No Brands available" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
