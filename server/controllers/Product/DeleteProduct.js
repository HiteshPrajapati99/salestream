const product = require("../../models/Product");
const fs = require("fs");

//  Api For delete All selected Data
module.exports.DeleteMenny = async function (req, res) {
  try {
    const data = await product.find({ _id: req.body });
    if (!data) {
      return res.json({ success: false, messege: "NO Data Found" });
    }
    // Delete Selected Product Images
    Array.from(data).forEach((item) => {
      if (item.product_img.length !== 0) {
        item.product_img.forEach((images) => {
          if (fs.existsSync(`./images/product/${images.filename}`)) {
            fs.unlinkSync(`./images/product/${images.filename}`);
          }
        });
      }
    });

    // Delete  Selected Products
    product.deleteMany({ _id: req.body }, function (err, data) {
      if (err) {
        res.json({ success: false, message: "NO Delete" + err });
      } else {
        if (!data) {
          res.json({ success: false, message: "information not found" });
        } else {
          res.json({
            success: true,
            message: "Products Deleted Successfully",
          });
        }
      }
    });
  } catch (error) {
    res.json({ success: false, messege: "Server Error" + error });
  }
};

//   Api For Delete Any one Data
module.exports.DeleteOne = function (req, res) {
  try {
    product.findByIdAndRemove({ _id: req.params.id }, function (err, data) {
      if (err) {
        res.json({ success: false, messege: "Error" + err });
      } else {
        if (!data) {
          res.json({ success: false, messege: "information not found" });
        } else {
          Object.keys(data.product_img).forEach((item) => {
            if (
              fs.existsSync(
                `./images/product/${data.product_img[item].filename}`
              )
            ) {
              fs.unlinkSync(
                `./images/product/${data.product_img[item].filename}`
              );
            }
          });

          res.json({
            success: true,
            message: `${data.name} Deleted Successfully`,
          });
        }
      }
    });
  } catch (error) {
    res.json({ success: false, messege: "SERVER ERROR : " + error });
  }
};
