const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const reception = require("../models/reception.json");

const doctor = require("../models/doctor/doctor.json")

const removeReception =(arrMove,arr)=>{
  arrMove.map((item)=>{
    const index = arr.indexOf(item)
    arr.splice(index,1)
  })
  return arr;
}

const updateSlot = (nameDoctor,lengthDoctor)=>{
  for(let i = 0 ; i < doctor.length;i++){
    if(doctor[i].name == nameDoctor){
      doctor[i].currentSlot = lengthDoctor
    }
  }
  fs.writeFileSync("./models/doctor/doctor.json",JSON.stringify(doctor))
  return doctor
}

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
  
  let data = []

  let arr = []
  
  for (let i = 0; i < reception.length; i++) {
  
    const patientReception = reception[i];
  
    for (let j = 0; j < doctor.length; j++) {
  
      const doc = doctor[j];
  
      const fileName = `./models/doctor/${doc.name}.json`;
  
      data = JSON.parse(fs.readFileSync(fileName))
  
      if (patientReception.specialist === doc.specialist && data.length < doc.slot) {
  
        // add data patientReception
        data.push(patientReception);
        
        arr.push(patientReception)

        updateSlot(doc.name,data.length)
        
        //add data doctor from patientReception
        fs.writeFileSync(fileName, JSON.stringify(data));

        break;
        
      }
    }
  }


 
  
  fs.writeFileSync("./models/reception.json",JSON.stringify(removeReception(arr,reception)))
  

  res.redirect("/reception");

}


module.exports = {
    redirectUpdate,
    deletePatient,
    insurance,
    moveReception,
    updateSlot
}