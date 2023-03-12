const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

const dataSick = require("../models/dataSick.json");

let pateint = [];

// Sử dụng body-parser để xử lý dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", (req, res) => {

  const name = req.body.name;
  const age = req.body.age;
  const sick = req.body.sick;

  dataSick.patient.forEach((item) => {
    pateint.push(item);
  });

  const matchedPateint = pateint.find((x) => x.name === sick);

  let data = {};

  if (matchedPateint) {
    let { priority, expert } = matchedPateint;
    data = { name, age, sick, priority, expert };
  }

  const FastPriorityQueue = require('fastpriorityqueue');
  const queue = new FastPriorityQueue((a, b) => a.priority > b.priority);
  
  fs.readFile("./models/lobby.json", "utf8", (err, jsonString) => {
  
    let lobbyData = [];
  
    if (jsonString) {
      lobbyData = JSON.parse(jsonString);
    }
  
    queue.add(data);

    
    // add existing data to the priority queue
    for (let i = 0; i < lobbyData.length; i++) {
      queue.add(lobbyData[i]);
    }
  
    // get the data from the priority queue in priority order
    const priorityData = [];
    while (!queue.isEmpty()) {
      priorityData.push(queue.poll());
    }
  
    fs.writeFile("./models/lobby.json", JSON.stringify(priorityData), (err) => {
        res.send("<script>alert('Đăng ký thành công'); window.location.href='/lobby';</script>");
    });
  });
  


});

module.exports = router;
