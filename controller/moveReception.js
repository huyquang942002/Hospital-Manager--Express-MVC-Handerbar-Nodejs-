const fs = require("fs")

const express = require("express")

const reception = require("../models/reception.json")

const doctor = require("../models/doctor/doctor.json")




const router = express.Router();

router.post("/reception/move",(req,res)=>{

    res.json("hello world")
})

module.exports = router