var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const dbConfig = require('./components/config/config.js');
const mongoose = require('mongoose');

    mongoose.Promise = global.Promise;
 
    // Connecting to the database
    mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,})
        .then(async () => {
            console.log("Successfully connected to MongoDB.");   
        }).catch(err => {
            console.log('Could not connect to MongoDB.');
            process.exit();
        });

    require('./components/routes/route.js')(app);
    // Create a Server
    var server = app.listen(8081, function () { 
    var host = server.address().address
    var port = server.address().port    
    
    console.log("App listening at localhost:8081", host, port) 
    })