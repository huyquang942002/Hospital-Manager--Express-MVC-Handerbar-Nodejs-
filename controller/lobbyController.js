const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const newPatient = require("../service/lobby.js")

router.post("/newPatient", newPatient);

module.exports = router;
