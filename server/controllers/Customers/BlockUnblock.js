const Customer = require("../../models/Store_Customers");
const asyncHandler = require("express-async-handler")

module.exports.BlockCustomer = asyncHandler(async (req , res) => {
    try {
        const block = await Customer.findByIdAndUpdate(
          { _id : req.params.id , },
          { isblocked: true }
        );
    
        if (block) {
          res.json({ success: true, message: "Customer is Blocked" });
        } else {
          res.json({ success: false, message: "Some server Error..." });
        }
      } catch (error) {
        res.json({ success: false, message:  error });
      }
});

module.exports.UnblockCustomer = asyncHandler(async (req , res) => {
    try {
        const Unblock = await Customer.findByIdAndUpdate(
          { _id: req.params.id },
          { isblocked: false }
        );
    
        if (Unblock) {
          res.json({ success: true, message: "Customer Unblocked...." });
        } else {
          res.json({ success: false, message: "Some server Error" });
        }
      } catch (error) {
        res.json({ success: false, message:  error });
      }
});