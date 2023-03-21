const Order = require("../../models/order");
const asyncHandler = require("express-async-handler");
const Customer = require("../../models/Store_Customers");

module.exports.CreateOrder = asyncHandler(async (req, res) => {
    const {id} = req.customer;
    // console.log(req.customer);
    const {cart , order_price} = req.body
    try {
        
        const customer = await Customer.findById({_id :id })
        const model = new Order();
        model.user_id = id;
        model.cartItems = cart;
        model.fullName = customer.name;
        model.order_Price = order_price
        
        
        model.save((err) => {
            if(err){
                res.json({success : false ,message : err.message})
             
            }else{
                res.json({success : true ,message : "Orderd Successfully..." })
            }
        })
    

    } catch (error) {
        res.json({success:  false , message: error})
    }
})