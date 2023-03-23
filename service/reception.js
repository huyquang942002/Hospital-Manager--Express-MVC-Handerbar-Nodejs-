const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const reception = require("../models/reception.json");

//get index for update.hbs
const redirectUpdate = (req,res)=>{
    const index = req.params.index;
    res.render("update", {
      index,
    });
}

//delete patient
const deletePatient = (req,res)=>{
  const index = req.params.index;
  reception.splice(index, 1);
  fs.writeFileSync("./models/reception.json", JSON.stringify(reception));
  res.redirect("/reception");
}


//add insurance number
const insurance = (req,res)=>{

  const index = req.params.index;

  let inforPatient = reception[index];

  inforPatient.insurance = req.body.insurance;

  fs.writeFileSync("./models/reception.json", JSON.stringify(reception));

  res.redirect("/reception");
}

const moveReception = (req,res)=>{
  res.json("hello world")
}

module.exports = {
    redirectUpdate,
    deletePatient,
    insurance,
    moveReception
}