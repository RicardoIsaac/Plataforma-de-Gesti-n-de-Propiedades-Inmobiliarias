const dotenv = require('dotenv').config();
const connectDB = require("./config/db.config.js")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/auth.routes.js");
const propertiesRoutes = require("./routes/property.routes.js");
const propertiesListRoutes = require("./routes/propertyList.routes.js");
const errorHandler = require('./middleware/error.middleware.js');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth/v1", authRoutes)
app.use("/api/properties", propertiesRoutes)
app.use("/api/propertiesList", propertiesListRoutes)

app.use(errorHandler)

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