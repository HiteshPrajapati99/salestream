const categories = require("../../models/Product_Categories");
const asynchandler = require("express-async-handler");
const slugify = require("slugify");

module.exports.EditCategory = asynchandler(async (req, res) => {
  const { title, status } = req.body;
  try {
    const update = await categories.findByIdAndUpdate(req.params.id);

    update.title = title;
    update.status = status || update.status;
    update.slug = slugify(title, { replacement: "", lower: true, trim: true });

    update.save((err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: "Category Updated" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports.DeleteCategory = asynchandler(async (req, res) => {
  try {
    categories.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({
          success: true,
          message: `${data.name}  Deletd Succesfully`,
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
