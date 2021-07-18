import Socket from "socket.io-client";

const socket = Socket("http://192.168.1.245:5000");

export default socket;