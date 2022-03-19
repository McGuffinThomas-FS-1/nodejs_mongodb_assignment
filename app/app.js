const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const artistRoutes = require("../api/routes/artist");
const songRoutes = require("../api/routes/song")

//middleware for logging 
app.use(morgan("dev"));

// parsing middlware
app.use(express.urlencoded({
    extended: true
}));

// middleware that all requests are json
app.use(express.json());

// middleware to handle the CORS Policy header
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Methods", "POST, PUT, GET, PATCH, DELETE");
    }
    next();
})

app.get("/", (req, res, next) => {
    res.status(201).json({
        message: "Service is Up!", 
        method: req.method
    })
});

app.use("/artist", artistRoutes);
app.use("/song", songRoutes);


// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

// connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err) {
        console.error("Error: ", err.message);
    } else {
        console.log("MongoDB connection was successful");
    }
});

module.exports = app;