const fs = require("fs");

const diseases = require("../models/diseases/dataPatient.json");

const {priorityQueueRegister,priorityQueueMove} = require("../fileHander/priorityQueue.js")
    

const registerPatient = (req, res) => {
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

const movePatient = (req,res)=>{

  const lobby = JSON.parse(fs.readFileSync("./models/lobby.json"))

    const reception = JSON.parse(fs.readFileSync("./models/reception.json"));

    const firstTen = lobby.splice(0,10-reception.length)    

    reception.push(...firstTen)

    fs.writeFileSync("./models/lobby.json",JSON.stringify(lobby))

    fs.writeFileSync("./models/reception.json",JSON.stringify(reception))

    fs.writeFileSync("./models/reception.json",JSON.stringify(priorityQueueMove(reception)))

    res.redirect("/lobby")
}

  module.exports = {
    registerPatient,
    movePatient
  }