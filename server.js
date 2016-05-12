'use strict'
var express = require('express');
var app = express();


app.use('/public',express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/html/index.html')
    });


var server = app.listen(8080,function(){
    var host= server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s',host,port);
});