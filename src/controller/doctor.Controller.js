const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const { updateSlot } = require("../controller/reception.Controller");

let nameDoctor;

const arrNameDoctor = (name) => {
  const arr = require(`../models/doctor/${name}.json`);
  return arr;
};

const redirectRoomDoctor = (req, res) => {
  nameDoctor = req.params.name;
  const dataJson = arrNameDoctor(nameDoctor);
  res.render("doctor", {
    dataJson,
  });
};

const deletePatient = (req, res) => {
  const index = req.params.index;
  const dataJson = arrNameDoctor(nameDoctor);
  dataJson.splice(index, 1);
  updateSlot(nameDoctor, dataJson.length);
  fs.writeFileSync(
    `./src/models/doctor/${nameDoctor}.json`,
    JSON.stringify(dataJson)
  );
  res.redirect(`/doctorRoom/${nameDoctor}`);
};

module.exports = {
  redirectRoomDoctor,
  deletePatient,
};
