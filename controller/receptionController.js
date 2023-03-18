const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const fs = require("fs")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const reception = require("../models/reception.json")


router.get("/reception/update/:index",(req,res)=>{ 
  const index = req.params.index
  res.render('update',{
    index
  })
 }) 

 router.get("/reception/delete/:index",(req,res)=>{ 
  const index = req.params.index
  reception.splice(index,1)
  fs.writeFileSync("./models/reception.json",JSON.stringify(reception))
  res.redirect("/reception")
 }) 



module.exports = router;  
