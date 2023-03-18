const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const fs = require("fs")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const reception = require("../models/reception.json")


router.post("/insurance/:index", (req,res)=>{

    const index = req.params.index;
    
    let inforPatient = reception[index]

    inforPatient.insurance = req.body.insurance

    fs.writeFileSync("./models/reception.json",JSON.stringify(reception))

    res.redirect('/reception')
    
});



module.exports = router;
