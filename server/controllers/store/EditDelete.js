const store = require("../../models/Store");
const asynchandler = require("express-async-handler");

module.exports.EditStore = asynchandler(async (req, res) => {
  const { title, email, template } = req.body;
  try {
    const data = await store.findByIdAndUpdate(req.params.id);

    const oldTitle = await store.findOne({ title: title });
    if (oldTitle) {
      return res.json({
        success: false,
        message:
          "This store name has already been taken ! please try something different.",
      });
    }

    data.title = title || data.title;
    data.email = email || data.email;
    data.template = template || data.template;

    data.save((err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({
          success: true,
          message: "Store updated Successfully !!...",
        });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});
