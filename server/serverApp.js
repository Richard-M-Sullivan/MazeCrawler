const Server = require("http"); //this will allow us to make a server object that can be used to make the socket connection and express stuff
const express = require("express");// this will allow us to utilize express server api for handling requests
const Socket = require("socket.io");// this allows us to utilize sockets

const port = 5000;//this is the port that we will be listening to

//create an express object, which is the information needed to make a server.
//after that make a server object as specified by our app obj
const app = express();
const server = Server.createServer(app);

//pass the server to the socket function to start listening for socket connections
// needed to specify a cors header to allow taking in requests from another source
const io = Socket(server,{
    cors: {
    origin: "http://192.168.1.245:3000",
    methods: ["GET", "POST"]
  }
});

// have the server that socket and app are linked to start listening to incoming traffic
server.listen(`${port}`);

//when a computer connects create the needed listeners to respond to the incoming requests
io.on("connection",(socket)=>{
    /*console.log("socket connection established!");
    socket.on('disconnect',()=>{
        console.log('disconnected');
    });*/

    //this takes in a chat message and will relay that chat to everyone connected to the server
    socket.on("chat message",(message) =>{
        //console.log(`${message.user,message.content}`);
        io.emit("chat message",message);
    });

    //this takes in a description message and will relay that message back to the user
    socket.on("description message",(message)=>{
        //console.log(message);
        socket.emit("description message",message);
    });
});

// if someone access the server directly instead of through the socket api, then they will see a webpage that says hello
app.get("/",(req,res)=>{
    res.send("hello world");
    console.log("hello");
});



