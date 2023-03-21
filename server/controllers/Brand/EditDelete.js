const Brand = require("../../models/Store_Brand");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");

module.exports.EditBrand = asynchandler(async (req, res) => {});

module.exports.DeleteBrand = asynchandler(async (req, res) => {
  try {
    Brand.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        if (!data) {
          return res.json({ success: false, message: "information not found" });
        }
        if (fs.existsSync(`./images/Brand/${data?.images[0]?.filename}`)) {
          fs.unlinkSync(`./images/Brand/${data.images[0].filename}`);
        }
        res.json({
          success: true,
          message: `${data.title} Deletd Succesfully`,
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
