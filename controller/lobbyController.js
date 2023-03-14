const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

const dataPatient = require("../models/dataPatient.json");

let patient = [];

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const newPatient = (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const sick = req.body.sick;
  let date = new Date().toLocaleString();

  dataPatient.patient.forEach((item) => {
    patient.push(item);
  });

  const matchedpatient = patient.find((x) => x.name === sick);

  let data = {};

  if (matchedpatient) {
    let { priority, expert } = matchedpatient;
    data = { name, age, sick, priority, expert, date };
  }

  const FastPriorityQueue = require("fastpriorityqueue");
  const queue = new FastPriorityQueue((a, b) => a.priority > b.priority);

  const lobbyData = JSON.parse(fs.readFileSync("./models/lobby.json"));

  //add new data
  queue.add(data);

  // add existing data 
  for (let i = 0; i < lobbyData.length; i++) {
    queue.add(lobbyData[i]);
  }

  const priorityData = [];

  while (!queue.isEmpty()) {
    priorityData.push(queue.poll());
  }

  fs.writeFileSync("./models/lobby.json", JSON.stringify(priorityData))

  res.send("<script>alert('Đăng ký thành công'); window.location.href='/lobby';</script>");

};

router.post("/newPatient", newPatient);

module.exports = router;
