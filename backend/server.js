var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const dbConfig = require('./components/config/config.js');
const mongoose = require('mongoose');
var server = require('http').Server(app);
var socket = require('socket.io');

require('./components/routes/route.js')(app);

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

var io = socket(server, {
    maxHttpBufferSize: 5e8,
    //pingTimeout: 100000,
    transports: ["websocket"],
    httpCompression: true
});

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    io.sockets.emit("onTestReceived", "Test")

    setTimeout(() => { io.sockets.emit("onTestReceived", "Test 2") }, 2000)

    socket.on("disconnect", (reason) => {
        console.log("user disconnected", socket.id)
    })

    socket.on("Hello", () => {
        console.log("FIRE HELLO")
    })

    socket.on("newImage", (data) => {
        let currentTime = new Date().toLocaleTimeString()
        console.log("New Image : " + currentTime)
        socket.broadcast.emit("image", data)
    })
});

server.listen(4000)
console.log("App listening at localhost:8081")