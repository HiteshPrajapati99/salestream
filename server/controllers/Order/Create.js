const Order = require("../../models/order");
const asyncHandler = require("express-async-handler");
const Customer = require("../../models/Store_Customers");
const Store = require("../../models/Store")

module.exports.CreateOrder = asyncHandler(async (req, res) => {
    const {id} = req.customer;
    const user = req.decoded;
    // console.log(req.customer);
    const {cart , order_price} = req.body
    try {
        
        const storeData = await Store.findOne({user_id : user.id})

        const customer = await Customer.findById(id)
        const model = new Order();
        model.user_id = id;
        model.store_id = storeData.id;
        model.cartItems = cart;
        model.fullName = customer.name;
        model.order_Price = order_price;
        console.log(model);
        
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