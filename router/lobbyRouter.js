const express = require('express')
const router = express.Router()

const lobbyController = require('../controller/lobbyController.js')

router.post('/newPatient', lobbyController)

module.exports = router