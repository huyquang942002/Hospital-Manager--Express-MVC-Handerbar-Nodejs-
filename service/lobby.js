const fs = require("fs");

const diseases = require("../models/diseases/dataPatient.json");

const {priorityQueueRegister} = require("../fileHander/priorityQueue.js")
    

const newPatient = (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const sick = req.body.sick;
    let date = new Date().toLocaleString();
  
  
    const matchedpatient = diseases.find((x) => x.name === sick);
  
    let newData = {};
  
    if (matchedpatient) {
      let { priority, specialist } = matchedpatient;
      newData = { name, age, sick, priority, specialist, date };
    }
  
    const lobbyData = JSON.parse(fs.readFileSync("./models/lobby.json"));
  
    fs.writeFileSync("./models/lobby.json", JSON.stringify(priorityQueueRegister(lobbyData,newData)))
  
    res.redirect('/lobby')
  
};

  module.exports = newPatient