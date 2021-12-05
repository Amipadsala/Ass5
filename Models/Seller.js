const mongoose=require("mongoose");

const Seller_Schema=mongoose.Schema({
    seller_id : String,
    name : String,
    product_ids : [String]
});

const Seller_Model = mongoose.model("seller",Seller_Schema,"seller");

module.exports = Seller_Model;