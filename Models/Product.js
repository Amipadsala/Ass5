const mongoose=require("mongoose");

const Product_Schema=mongoose.Schema({
    product_id : String,
    title : String,
    price : String,
    category : [String],
    company_id : String,
    seller_id : [String]
});

const Product_Model = mongoose.model("product",Product_Schema,"product");

module.exports = Product_Model;