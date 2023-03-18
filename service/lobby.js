const fs = require("fs");

const dataPatient = require("../models/dataPatient.json");

const {priorityQueueRegister} = require("../fileHander/priorityQueue.js")
    
let patient = [];

const newPatient = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const sick = req.body.sick;
    let date = new Date().toLocaleString();
  
    dataPatient.patient.forEach((item) => {
      patient.push(item);
    });
  
    const matchedpatient = patient.find((x) => x.name === sick);
  
    let newData = {};
  
    if (matchedpatient) {
      let { priority, expert } = matchedpatient;
      newData = { name, age, sick, priority, expert, date };
    }
  
    const lobbyData = JSON.parse(fs.readFileSync("./models/lobby.json"));
  
    fs.writeFileSync("./models/lobby.json", JSON.stringify(priorityQueueRegister(lobbyData,newData)))
  
    res.redirect('/lobby')
  
  };

  module.exports = newPatient