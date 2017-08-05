require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const {json} = require('body-parser')
const contactRouter = require('./server/contact_routes')

const app = express()

app.use(cors())
app.use(json())

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/contact', contactRouter)
app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`)
})