const store = require("../../models/Store");
const asynchandler = require("express-async-handler");

module.exports.CreateStore = asynchandler(async (req, res) => {
  const { title, email, template } = req.body;
  const { id } = req.decoded;
  try {
    const oldUser = await store.findOne({ user_id: id });

    if (oldUser) {
      return res.json({
        success: false,
        message: "You Can Not Create Multiple Store !!..",
      });
    }

    const allredyStore = await store.findOne({ title: title });
    if (allredyStore) {
      return res.json({
        success: false,
        message: "This Store Name is Not Available !!..",
      });
    }

    const model = new store();

    model.title = title;
    model.email = email;
    model.template = template || "Temp1";
    model.user_id = id;

    model.save((err) => {
      if (err) {
        if (err.errors.title) {
          res.json({
            success: false,
            message: err.errors.title.message,
          });
        } else {
          res.json({ success: false, message: "Server Error" + err.message });
        }
      } else {
        res.json({ success: true, message: "Store Created !!" });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports.FindbyTitle = asynchandler(async (req, res) => {
  try {
    const { id } = req.decoded;
    const data = await store.findOne({ user_id: id });
    
    if (data) {
      res.json({
        success: true,
        message: "Data Found !!",
        storeData: data,
      });
    } else {
      res.json({ success: false, message: "No Data Found !!" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports.FindUserData = asynchandler(async (req, res) => {
  try {
    const data = await store.findOne({ title: req.params.title });
    if (data) {
      res.json({ success: true, message: "Data Found !!", data: data });
    } else {
      res.json({ success: false, message: "No Data Found !!" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
