'use strict';
const express = require('express');
const path = require('path');
const http = require('http')
const os = require('os');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const routes = require('./routes');

// PORT
// ==============================================
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8090;
}

let app = express();
app.set('view engine', 'ejs');
let server = http.createServer(app);
//const io = require('socket.io')(server);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/modules',express.static(path.join('node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.set('view engine', 'ejs');

server.listen(port,function(){
    console.log("DotComa");
    console.log(`Server is up and listening on port:${port}`);
});
