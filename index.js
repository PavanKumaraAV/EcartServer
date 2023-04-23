//loads .env file contents into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')

//import connection.js
require("./db/connection")

//import router
const router = require('./routes/router')

//create server app using express
const app = express()

//use cors and express.json to server
// application specific middleware
app.use(cors());
app.use(express.json())
app.use(router)

//create port to listen your server app
const PORT = process.env.PORT || 3000

// run/listen server app in their specific port
app.listen(PORT , ()=>{
    console.log("E Cart is listening at port number " + PORT)
})

