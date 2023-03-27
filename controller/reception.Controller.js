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
  
  const removeReception =(arrMove,reception)=>{
    arrMove.map((item)=>{
      const index = reception.indexOf(item)
      reception.splice(index,1)
    })
    return reception;
  }
  
  
  const doctor = JSON.parse(fs.readFileSync("./models/doctor/doctor.json"))
  
  let data = []
  
  for (let i = 0; i < reception.length; i++) {
  
    const patient = reception[i];
  
    for (let j = 0; j < doctor.length; j++) {
  
      const doc = doctor[j];
  
      const fileName = `./models/doctor/${doc.name}.json`;
  
      data = JSON.parse(fs.readFileSync(fileName))
  
      if (patient.specialist === doc.specialist && data.length < doc.slot) {
  
        data.push(patient);
  
        fs.writeFileSync(fileName, JSON.stringify(data));
  
        break;
  
      }
    }
    fs.writeFileSync("./models/reception.json",JSON.stringify(removeReception(data,reception)))
  }
  

  res.redirect("/reception");

}

module.exports = {
    redirectUpdate,
    deletePatient,
    insurance,
    moveReception
}