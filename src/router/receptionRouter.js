const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {redirectUpdate,deletePatient,insurance,moveReception} = require("../controller/reception.Controller.js")

router.get("/reception/update/:index", redirectUpdate)

router.get("/reception/delete/:index",deletePatient)

router.post("/reception/insurance/:index", insurance)

router.post("/reception/move",moveReception)

module.exports = router;
