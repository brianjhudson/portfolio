const express = require('express')
const contactCtrl = require('./contact_controller')
const router = express.Router()

router.post('/', contactCtrl.sendSlack, contactCtrl.sendSMS, contactCtrl.sendMail)

module.exports = router