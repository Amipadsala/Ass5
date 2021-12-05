require("dotenv").config();
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=5000;

app.use(express.json());

mongoose.connect(process.env.MONGOURL)
.then(console.log("MongoDB Connected...!"));

const Seller_Router=require("./Router/Seller");
const Company_Router=require("./Router/Company");
const Product_Router=require("./Router/Product");

app.use("/Seller",Seller_Router);

app.use("/Company",Company_Router);

app.use("/Product",Product_Router);

app.get("/",(req,res)=> console.log("Hello world!"));

app.listen(port, () => console.log(`Server running on port ${port}`));