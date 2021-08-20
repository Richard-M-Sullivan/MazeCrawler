import Socket from "socket.io-client";

// this creates a socket object that is set to be looking at the host computer on the network.
// the different options are for when you want to target a different ip address. To work you may have
// to add your ip address here, but the port number should remain the same.

//const socket = Socket("http://192.168.1.245:5000");
const socket = Socket("http://localhost:5000");  //local host is the easiest because that opens by default, but if you want other people to connect you have to user the numbers not localhost
//const socket = Socket("http://192.168.1.234:5000");

export default socket;