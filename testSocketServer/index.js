var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
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
        console.log(data)
    })
});
