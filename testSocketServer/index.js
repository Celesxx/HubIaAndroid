var path = require('path')
var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000');
});

// Static files
//app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Socket setup & pass server
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

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  
