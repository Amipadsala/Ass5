const express=require("express");
const router=express.Router();

const sellerModel=require("../Models/Seller");
const productModel=require("../Models/Product")
router.get("/",(req,res)=>res.json({data:"Seller Home!"}));

router.get("/List",(req,res)=>{
    return res.json({data:sellerModel});
})

//add new Seller
router.post("/Add_Seller", (req,res)=>{
    const {newSeller}=req.body;
    sellerModel.create(newSeller);
    return res.json({data:"Seller Add SuccessFully...!"});
});

//fetch seller details based on product name
router.get("/Retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const product =await productModel.find({title:pname});
    if(product.length===0){
        return res.json({data:"Product not found "});
    }
    const sid=product.map((p)=>p.seller_id);
    const seller=await sellerModel.find(
        {seller_id:sid[0]}
    );
    if(seller.length===0){
        return res.json({data:"Seller not found "});
    }
    return res.json({data:seller});
});

//update seller (add/remove products)
router.put("/Update_Seller/Add/:id",async(req,res)=>{
    const id=req.params.id;
    const pid=req.body.pid;
    const sellerdata= await sellerModel.findOneAndUpdate(
        {seller_id:id},
        {$push: {product_ids:pid}},
        {new:true}
    );
    return res.json({data:sellerdata});
});
router.put("/Update_Seller/Remove/:id",async(req,res)=>{
    const id=req.params.id;
    const pid=req.body.pid;
    const sellerdata= await sellerModel.findOneAndUpdate(
        {seller_id:id},
        {$pull: {product_ids:pid }},
        {new:true}
    );
    return res.json({data:sellerdata});
});

//delete seller
router.delete("/Delete_Seller/:id",async(req,res)=>{
    const sid=req.params.id;
    const del_Seller= await sellerModel.findOneAndDelete({seller_id:sid});
    if(del_Seller){
        return res.json({data:"Seller Deleted Successfully...!"});
    }
    return res.json({data:"Seller Can't Delete."});
});

module.exports=router;