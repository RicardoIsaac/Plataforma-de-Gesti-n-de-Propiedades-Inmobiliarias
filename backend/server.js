const dotenv = require('dotenv').config();
const connectDB = require("./config/db.config.js")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res)=>{
    res.send("Home page")
})

const port  = process.env.PORT || 8080;

connectDB().then(() =>{
    app.listen(port, () =>{
        console.log(`server listening on ${port}`);   
    })
})


module.exports = app;