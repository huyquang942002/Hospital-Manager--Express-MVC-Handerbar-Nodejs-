const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
  registerPatient,
  movePatient,
} = require("../controller/lobby.Controller");

router.post("/lobby/register", registerPatient);

router.post("/lobby/movePatient", movePatient);

module.exports = router;
