import express from "express"
import bodyParser from "body-parser"
import db from "./db/db"

import router from './routes/index.js'

//Set up the express app
const app = express()

//Parse incoming request data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});






app.use(router)


const PORT = 5000

app.listen(PORT, () =>{
	console.log('server running on port '+PORT)
})
