const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  cityTown: {
    type: String,
    required: true,
    trim: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
  Country : {
    type: String,
    min: 10,
    max: 100,
  },
  state: {
    type: String,
    required: true,
    required: true,
  },
  
  addressType : {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});


module.exports = mongoose.model("customer_address" ,addressSchema )