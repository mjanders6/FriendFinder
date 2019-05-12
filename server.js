const express = require('express')
const { join } = require('path')
const app = express()

// middleware
// needed to route the HTML
app.use(express.static(join(__dirname, './app/public')))

app.use(express.urlencoded({extend: true}))
app.use(express.json())

// require('./routes/apiRoute') (app)

// routes(app)

app.listen(process.env.PORT || 3000)
// app.listen(3000)
