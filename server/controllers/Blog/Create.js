const Blog = require("../../models/Store_Blog");
const User = require("../../models/Users");
const asynchandler = require("express-async-handler");
const { encrypt } = require("../../middlewares/crypto");

// Create Blog Api

module.exports.CreateBlog = asynchandler(async (req, res) => {
  const { title, sub_title, desc } = req.body;
  const { id } = req.decoded;

  try {
    const model = new Blog();

    model.title = title;
    model.sub_title = sub_title;
    model.desc = desc;
    model.numviews = 0;
    model.posted_by = id;

    if (req.files) {
      let image = [];
      let path = [];

      for (const i of req.files) {
        image.push(i);
        path.push("http://localhost:5000/" + i.path);
      }
      model.images = image;
      model.image_path = path;
    }

    model.save((err) => {
      if (err) {
        if (err.errors.title) {
          res.json({ success: false, message: err.errors.title.message });
        } else {
          res.json({ success: false, message: err.message });
        }
      } else {
        res.json({ success: true, message: "New Blog Added" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error.message });
  }
});

//  Get All Blog List
module.exports.GetAllBlog = asynchandler(async (req, res) => {
  const { id } = req.decoded;
  try {
    const data = await Blog.find({ posted_by: id }).populate("posted_by");
    // const data = await Blog.find().populate("posted_by");

    if (data) {
      // res.json({ success: true, message: "Data Found", data: encrypt(data) });
      res.json({
        success: true,
        message: "Data Found",
        length: data.length,
        data: data,
      });
    } else {
      res.json({ success: false, message: "No Data Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error.message });
  }
});

//  Get Blog by Id
module.exports.GetBlog = asynchandler(async (req, res) => {
  try {
    const data = await Blog.findById(req.params.id);

    const newdata = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { numviews: 1 },
      },
      { new: true }
    );

    if (data) {
      res.json({ success: true, message: "Data Found", data: newdata });
    } else {
      res.json({ success: false, message: "No Data Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error.message });
  }
});
