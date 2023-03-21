const Customer = require("../../models/Store_Customers");
const store = require("../../models/Store")
const asyncHandler = require("express-async-handler");


module.exports.GetAllCustomers = asyncHandler(async (req, res) => {
    const {id} = req.decoded;
    try {
        
        const storeData = await store.findOne({user_id : id})
        // console.log(storeData);
        if(!storeData){
            res.json({success : false, message : "Please Create Store First..."})
        }

        const customerData = await Customer.find({store_id : storeData._id});
        

        if(customerData.length !== 0){
            res.json({success : true , message : "Data Found..!" , customers : customerData})
        }else{
            res.json({success : false , message : "No Data Available..."})
        }

    } catch (error) {
        res.json({success : false , message : error})
    }
})