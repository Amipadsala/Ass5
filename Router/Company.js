const express=require("express");
const router=express.Router();

const companyModel=require("../Models/Company");
const productModel=require("../Models/Product");

router.get("/",(req,res)=>res.json({data:"Company Home!"}));

router.get("/List",(req,res)=>{
    const companyData=companyModel.find();
    return res.json({companyData});
});

//Add new Company
router.post("/Add_Company",(req,res)=>{
    const {newCompany} = req.body;
    companyModel.create(newCompany);
    return res.json({data:"Company Add Successfully...!"});
});

//fetch company details based on product name
router.get("/Retrieve/:pname",async(req,res)=>{
    const pname=req.params.pname;
    const product =await productModel.find({title:pname});
    if(product.length===0){
        return res.json({data:"Product not found "});
    }
    const cid=product.map((p)=>p.company_id);
    const company=await companyModel.find(
        {company_id:cid}
    );
    if(company.length===0){
        return res.json({data:"Company not found "});
    }
    return res.json({data:company});
});

//update company (add/remove products)
router.put("/Update_Company/add/:cname",async(req,res)=>{
    const cname=req.params.cname;
    const pid=req.body.pid;
    const companydata= await companyModel.findOneAndUpdate(
        {name:cname},
        {$push: {product_ids:pid}},
        {new:true}
    );
    return res.json({data:companydata});
});
router.put("/Update_Company/remove/:cname",async(req,res)=>{
    const cname=req.params.cname;
    const pid=req.body.pid;
    const companydata= await companyModel.findOneAndUpdate(
        {name:cname},
        {$pull: {product_ids:pid }},
        {new:true}
    );
    return res.json({data:companydata});
});

//delete company
router.delete("/Delete_Company/:id",async(req,res)=>{
    const cid=req.params.id;
    const Del_Company= await companyModel.findOneAndDelete({company_id:cid});
    if(Del_Company){
        return res.json({data:"Company Deleted Successfully...!"});
    }
    return res.json({data:"Company Can Not Delete."});
});

module.exports=router;