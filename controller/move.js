const express = require("express")

const router = express.Router();

const {priorityQueueMove} = require("../fileHander/priorityQueue.js")

const fs = require("fs");

router.post("/move",(req,res)=>{

    const lobby = JSON.parse(fs.readFileSync("./models/lobby.json"))

    const reception = JSON.parse(fs.readFileSync("./models/reception.json"));

    reception.push(lobby.shift())

    fs.writeFileSync("./models/lobby.json",JSON.stringify(lobby))

    fs.writeFileSync("./models/reception.json",JSON.stringify(reception))

    fs.writeFileSync("./models/reception.json",JSON.stringify(priorityQueueMove(reception)))


    res.send("<script>alert('Move Success'); window.location.href='/lobby';</script>");

})


module.exports = router