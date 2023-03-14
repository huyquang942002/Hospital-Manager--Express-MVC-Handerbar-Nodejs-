const express = require("express")

const router = express.Router();

const {newPatient} = require("../controller/lobbyController.js")

router.post('/newPatient',newPatient)

module.exports = router;