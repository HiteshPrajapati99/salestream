const product = require("../../models/Product");

// find All products
module.exports.findproduct = async function (req, res) {
  const { id } = req.decoded;
  if (id === "undefined") {
    return res.json({
      success: false,
      message: "This request has failed authentication !!...",
    });
  }
  try {
    product
      .find({ user_id: id }, function (err, data) {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          if (data.length === 0) {
            res.json({ success: false, message: "Data Not Found" });
          } else {
            res.json({ success: true, length: data.length, products: data });
          }
        }
      })
      .populate("ratings.postedby category brand");
  } catch (error) {
    res.json({ success: false, message: "No Data Found" });
  }
};

// Find Product by id
module.exports.findone = async function (req, res) {
  try {
    const data = await product
      .findById(req.params.id)
      .populate({
        path: "category",
        populate: {
          path: "parent_id",
          model: "pro_categories",
          populate: {
            path: "parent_id",
            model: "pro_categories",
          },
        },
      })
      .populate("brand");

    if (data) {
      res.json({ success: true, product: data });
    } else {
      res.json({ success: false, message: "NO Data Found" });
    }
  } catch (error) {
    res.json({ success: false, message: "SERVER ERROR :" + error });
  }
};
