const fs = require("fs");

const diseases = require("../models/diseases/dataPatient.json");

const { priorityQueueRegister, priorityQueueMove } = require("../utils/handle");

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

  const lobbyData = JSON.parse(fs.readFileSync("./src/models/lobby.json"));

  fs.writeFileSync(
    "./src/models/lobby.json",
    JSON.stringify(priorityQueueRegister(lobbyData, newData))
  );

  res.redirect("/lobby");
};

const movePatient = (req, res) => {
  const lobby = JSON.parse(fs.readFileSync("./src/models/lobby.json"));

  const reception = JSON.parse(fs.readFileSync("./src/models/reception.json"));

  const firstTen = lobby.splice(0, 1);

  reception.push(...firstTen);

  if (reception.length <= 10) {
    fs.writeFileSync("./src/models/lobby.json", JSON.stringify(lobby));

    fs.writeFileSync("./src/models/reception.json", JSON.stringify(reception));

    fs.writeFileSync(
      "./src/models/reception.json",
      JSON.stringify(priorityQueueMove(reception))
    );

    res.redirect("/lobby");
  } else {
    res.send(`
      <script>
        alert("Reception full, please wait");
        window.location.href = "/lobby";
      </script>
    `);
  }
};

module.exports = {
  registerPatient,
  movePatient,
};
