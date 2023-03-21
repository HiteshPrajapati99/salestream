const user = require("../../models/Users");

module.exports.BlockUser = async (req, res) => {
  try {
    const block = await user.findByIdAndUpdate(
      { _id: req.params.id },
      { isblocked: true }
    );

    if (block) {
      res.json({ success: true, message: "User Blocked" });
    } else {
      res.json({ success: false, message: "Some server Error" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};

module.exports.UnblockUser = async (req, res) => {
  try {
    const unblock = await user.findByIdAndUpdate(
      { _id: req.params.id },
      { isblocked: false }
    );

    if (unblock) {
      res.json({ success: true, message: "User Unblocked" });
    } else {
      res.json({ success: false, message: "Some server Error" });
    }
  } catch (error) {
    res.json({ success: false, message: "Server Error" + error });
  }
};
