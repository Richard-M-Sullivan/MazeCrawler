
const express = require("express");
const Socketio = require("socket.io");

const app = express();
const port = 5000;

io = Socketio(app.listen(port,()=>{console.log(`express is listening on port ${port}`)}),{});

io.on("connection",(socket)=>{
    console.log("socket connection established!");

});



