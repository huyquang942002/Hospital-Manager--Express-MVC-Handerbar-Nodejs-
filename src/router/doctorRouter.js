const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
  redirectRoomDoctor,
  deletePatient,
} = require("../controller/doctor.Controller");

router.get("/doctorRoom/:name", redirectRoomDoctor);

router.get("/doctorRoom/delete/:index", deletePatient);

module.exports = router;
