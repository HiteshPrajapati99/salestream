const User = require("../../models/Users");

module.exports = Addwishlist = async (req, res) => {
  const { id } = req.decoded;
  const { productID } = req.body;
  try {
    const user = await User.findById(id);

    const allredylist = user.addwishlist.find(
      (id) => id.toString() === productID
    );
    if (allredylist) {
      const user = await User.findByIdAndUpdate(id, {
        $pull: { addwishlist: productID },
      });
      res.json({
        success: true,
        message: "Product Successfully Removed From Wish List",
      });
    } else {
      const user = await User.findByIdAndUpdate(id, {
        $push: { addwishlist: productID },
      });
      res.json({
        success: true,
        message: "Product Successfully Add in Wish List",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};
