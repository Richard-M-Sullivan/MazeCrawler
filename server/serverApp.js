
  ////////////////////////
 // setting up mongodb //
////////////////////////

const MongoClient = require("mongodb").MongoClient;//this imports all the needed things to run the database

const uri = "mongodb://localhost:27017";//the uri string defines the connection that I want to make with the server
const mongo = new MongoClient(uri);// create the client object with the connection string.

mongo.connect(); // connect to server

// mongo is my hook to the database. To access things you have to set the database and collection, and then perform
// an action. mongo.db("exampleDatabase").collection("exampleCollection").doStuff();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////
 // setting up the server and sockets //
///////////////////////////////////////

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
    origin:"http://localhost:3000",
    //origin:"http://192.168.1.234:3000",
    //origin: "http://192.168.1.245:3000",
    methods: ["GET", "POST"]
  }
});

// have the server that socket and app are linked to start listening to incoming traffic
server.listen(`${port}`);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////
 // logic for the application //
///////////////////////////////

//when a computer connects, create the needed listeners to respond to the incoming requests
io.on("connection",(socket)=>{

    //log when a connection happens
    console.log("socket connection established!");

    // when someone disconnects log the disconnection
    socket.on('disconnect',()=>{
        console.log('disconnected');
    });

    //this takes in a chat message and will relay that chat to everyone connected to the server
    socket.on("chat message",(message) =>{
        //console.log(`${message.user},${message.content},${message.validated}`);

        //if the user is logged in then the valid field will always be true. No other value can be guaranteed
        //if the user is not logged in, so if the value of validated is not true then do not allow them the ability to chat.
        if(message.validated !== true){
            socket.emit("chat message", {user:"server",content:"you need to login to chat"});
        }
        // if the user is logged in, then allow them to emit a chat to the remainder of the people connected to the server
        else{

            io.emit("chat message",message);
        }
    });

    //this takes in a description message and will relay that message back to the user
    socket.on("description message",(message)=>{
        
        console.log(message);
        
        
        // if the user is logged in they can submit commands
        if(message.validated === true){
            // send the message back to the user so they can print it to their screen

            socket.emit("description message",message);

            socket.emit("description message",{content:`the server has received your message ${message.user}.`});

        }
        // if the user is not logged in then check allow login and create new user or tell them to login
        else{
            // if the user is not in the process of logging in and is not logged in, then accept the commands
            // login and new user
            if (message.user === null && message.validated === false){

                //if they want to login, then prompt them to enter their user name
                if(message.content === "login"){
                    socket.emit("description message", {content:"enter your username"});
                    socket.emit("set username",{state:""});
                }
                //if they want to create a new account, then prompt them to enter their user name
                else if(message.content === "new user"){
                    socket.emit("description message", {content:"enter your desired username"});
                    socket.emit("set username",{state:""});
                    socket.emit("set validated",{state:""});
                }
                // any other command will prompt them to login or create a new user
                else{
                    socket.emit("description message",{content:"you need to login or create a new account. type in the command: login, or the command: new user, to proceed."});

                }
                
            }
            // If they are in the process of logging in.
            else if(message.validated === false){
                //if they are setting their username
                if(message.user === ""){
                    socket.emit("set username",{state:message.content});
                    socket.emit("description message",{content:"enter your password"});
                }
                //if they need to ser their password
                else{
                    //if the username and password are correct, then validate the user and let them know they are logged in
                    //if the username and password are incorrect, then reset user info and lett them know to try again
                    (async () => {
                        //set user and password variables
                        let user = message.user;
                        let pass = message.content;

                        //look to see if this person exists in the database
                        let find = await mongo.db("MazeCrawler").collection("userInfo").find({userName:user,userPassword:pass});

                        let userArray = await find.toArray();
                        console.log(userArray);

                        //if you find a record then success
                        if(await find.count() == 1){
                            //validate the user
                            socket.emit("set validated",{state:true});
                            //tell the ser they are logged in
                            socket.emit("description message",{content:"you are now logged in."});

                        }
                        //if not, then unsuccessful
                        else{
                            //reset user name to null and validated to false
                            socket.emit("set validated",{state:false});
                            socket.emit("set username",{state:null});
                            //tell the user to try logging in again
                            socket.emit("description message",{content:"username and/or password incorrect. type login to try again."});
                        }
                    })();
                }
            }

            //if they are in the process of creating a new user
            else if(message.validated === ""){
               //if they are setting their username
                if(message.user === ""){
                    //if the username exists, then do nothing and let user know to re-try a username
                    //if the username does not exist, then set the username and add it to the database and let the user know to enter a password
                    (async ()=>{

                        //look to see if a user with the specified name is in the database
                        let user = message.content;
                        let find = await mongo.db("MazeCrawler").collection("userInfo").find({userName:user});

                        //a user of the specified name has been found in the database
                        if(await find.count() == 1){
                            socket.emit("description message",{content:"this username already exists. try again..."});
                        }
                        else{
                            socket.emit("set username",{state:message.content});
                            socket.emit("description message",{content:"enter your password"});
                        }


                    })();
                }
                //if they need to set their password
                else{
                    socket.emit("set validated",{state:true});
                    socket.emit("description message",{content:"you are now logged in"});

                    mongo.db("MazeCrawler").collection("userInfo").insertOne({userName:message.user,userPassword:message.content});

                } 
            }
            else{
                socket.emit("description message",{content:"an error occurred please restart the browser and try again"});
            }
        }
    });



});



// if someone access the server directly instead of through the socket api, then they will see a webpage that says hello
app.get("/",(req,res)=>{
    res.send("hello world");
    console.log("hello");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

