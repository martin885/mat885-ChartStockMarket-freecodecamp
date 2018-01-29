const http=require('http');
const express =require('express');
const path=require('path');
const stocks=require('./stocks');
const sockets=require('./sockets');
const port=8080;





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