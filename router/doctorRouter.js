const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {redirectRoomDoctor} = require("../controller/doctor.Controller.js")


router.get("/doctorRoom/:name",redirectRoomDoctor)

module.exports = router;