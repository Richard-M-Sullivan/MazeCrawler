
const Server = require("http");
const express = require("express");
const Socket = require("socket.io");

const port = 5000;

const app = express();
const server = Server.createServer(app);

const io = Socket(server,{
    cors: {
    origin: "http://192.168.1.245:3000",
    methods: ["GET", "POST"]
  }
});

server.listen(`${port}`);

io.on("connection",(socket)=>{
    console.log("socket connection established!");
});

app.get("/",(req,res)=>{
    res.send("hello world");
    console.log("hello");
});
