var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const dbConfig = require('./components/config/config.js');
const mongoose = require('mongoose');
var server = require('http').Server(app);
// const io = require('socket.io')(server);
// let cam = require('./components/Ia/getWebcam')
require('./components/routes/route.js')(app);
// const cv = require('opencv4nodejs');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,})
.then(async () => 
{
    console.log("Successfully connected to MongoDB.");   
}).catch(err => 
    {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

// cam.getWebcam(io)


server.listen(8081)
console.log("App listening at localhost:8081")