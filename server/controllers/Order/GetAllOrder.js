const Order = require("../../models/order");
const Store = require("../../models/Store");
const asyncHandler = require("express-async-handler");
const order = require("../../models/order");

module.exports.OrderAdmin = asyncHandler(async (req, res) => {
    const {id} = req.decoded;
    try {
        
    const storeData = await Store.findOne({user_id : id});
 console.log(storeData);
    if(!storeData){
        res.json({success : false, message : "Please Create Store to Get Order List..."})
    }

    const Orders = await order.find({store_id : storeData.id});
console.log(Orders);
    if(Orders.length !== 0){
        res.json({success : true , message : "Data Found..!" , Orders})
    }else{
        res.json({success : false , message : "No Data Available..."})
    }

    } catch (error) {
        res.json({success:  false , message: error.message})
        
    }
}) 



