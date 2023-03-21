const asynchandler = require("express-async-handler");
const Blog = require("../../models/Store_Blog");
const fs = require("fs");

module.exports.DeleteBlog = asynchandler(async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);

    if (data) {
      data.images.forEach((item) => {
        if (fs.existsSync(`./images/blog/${item.filename}`)) {
          fs.unlinkSync(`./images/blog/${item.filename}`);
        }
      });

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

module.exports.EditBlog = asynchandler(async (req, res) => {
  const { title, sub_title, desc } = req.body;

  try {
    const data = await Blog.findByIdAndUpdate(req.params.id);

    data.title = title || data.title;
    data.sub_title = sub_title || data.sub_title;
    data.desc = desc || data.desc;

    if (req.files) {
      let path = [];

      for (const i of req.files) {
        path.push("http://localhost:5000/" + i.path);

        data.images.push(i);
        data.image_path.push(path);
      }
    }

    data.save((err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "Blog Updated successfully !!" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
