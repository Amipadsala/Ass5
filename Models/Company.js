const mongoose=require("mongoose");

const Company_Schema=mongoose.Schema({
    company_id : String,
    name : String,
    product_id : [String]
});

const Company_Model = mongoose.model("company",Company_Schema,"company");

module.exports = Company_Model;