const http=require('http');
const express =require('express');
const path=require('path');
const stocks=require('./stocks');
const sockets=require('./sockets');
const port=process.env.PORT || 8080;
const mongoose = require('mongoose');
var dburl = process.env.MONGOURI || 'mongodb://localhost/freecodecampchartstockmarket';



mongoose.connect(dburl , function (err) {
    if (err) {
        console.log(err);
    }
});

mongoose.connection.on('connected', function () {
    console.log('Connected');
});

mongoose.connection.on('disconnected', function () {
    console.log('Disconnected');
})
mongoose.connection.on('error', function () {
    console.log('An has occurred');
});

const app=express();
const server= http.Server(app);

sockets(server);





app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use('/static',express.static(path.join(__dirname,'public')));
app.get('/',stocks.index);

server.listen(port,function(){
    console.log('Server listening on port: '+port);
});