const express = require('express')
const contactCtrl = require('./contact_controller')
const router = express.Router()

router.post('/', contactCtrl.sendMail, contactCtrl.sendSMS, contactCtrl.sendSlack)

module.exports = router