const multer = require("multer");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Blog
      if (file.fieldname === "blog_img") {
        const path = "./images/blog";

        if (!fs.existsSync("./images")) {
          fs.mkdirSync("./images");
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      }
      // Product
      if (file.fieldname === "product_img") {
        const path = "./images/product";
        if (!fs.existsSync("./images")) {
          fs.mkdirSync("./images");
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      }
      //   Brand

      if (file.fieldname === "brand_image") {
        const path = "./images/Brand";
        if (!fs.existsSync("./images")) {
          fs.mkdirSync("./images");
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      }
      // path = "product_banner";

      if (file.fieldname === "banner_image") {
        const path = "./images/product_banner";
        if (!fs.existsSync("./images")) {
          fs.mkdirSync("./images");
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }
        cb(null, path);
      }

      //  This is For single folder

      // const path = "./product_img";
      // if (!fs.existsSync(path)) {
      //   fs.mkdirSync(path);
      // }
      // cb(null, path);
    },
    filename: function (req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        var err = new Error();
        err.code = "only png,jpg & jpeg image uploaded";
        return cb(err.code);
      } else {
        cb(
          null,
          file.fieldname +
            "-" +
            Math.floor(Math.random() * 10000000) +
            1 +
            ".jpg"
        );
      }
    },
  }),
  // limits: { fileSize: 1048576 },
});

module.exports = upload;
