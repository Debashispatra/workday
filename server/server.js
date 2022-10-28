const express = require("express")
const app =express()
const router = require("../router/router")
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(router);






module.exports = app;
