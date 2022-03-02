const express = require('express')
const router = express.Router()
const AutocarController = require('../controllers/AutocarController')

router.get('/', AutocarController.showAutocar)

module.exports = router