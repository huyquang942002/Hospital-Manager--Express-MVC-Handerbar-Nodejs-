const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const arrNameDoctor = (name) => {
  const arr = require(`../models/doctor/${name}.json`);
  return arr;
};

const redirectRoomDoctor = (req, res) => {
  const nameDoctor = req.params.name;
  const dataJson = arrNameDoctor(nameDoctor);
  res.render("doctor", {
    nameDoctor,
    dataJson,
  });
};

module.exports = {
  redirectRoomDoctor,
};
