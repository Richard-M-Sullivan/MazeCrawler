import React from 'react';
import socket from '../services/socketService'; // this allows us to listen to socket events with the global socket obj
import ReactScrollableFeed from 'react-scrollable-feed'; // this allows us to make a scrollable chat box
import SubmitBar from './SubmitBar';

// This is a component provides a window to view and read chats as well as a submit bar to send chats to all 
// other users in the server

// This works by having the submit bar send a chat message event to the server through sockets. Then the server handles
// the event and will send a chat message event to all clients connected to the server (including the chat sender).
// This is handled by displaying the chat message in the chat window.
export default function Chat(props){

    // dummy data to add to the chatData
    const [chatData,setChatData] = React.useState([
        /*{user:"richard",content:"hello conner!"},
        {user:"conner",content:"how goes it buddy? :^)"},
        {user:"richard",content:"it's going good"},
        {user:"david", content:"can I join in?"},
        {user:"conner", content:"I don't see why not?"},
        {user:"david",content:"askja sluff salk las kef laski d lugsail s skuld flog jbht pdfjs lbj"}*/
    ]);
    
    // chats are the ui elements that get rendered. It starts off empty.
    const [chats,setChats] = React.useState([]);

    // this adds a chat message and user to the chatData state
    const addChat = function ({user,content}) {
        if(content != null){
            //console.log("adding chat");
            //console.log({user:user,content:content});
            setChatData(chatData => [...chatData,{user:user,content:content}]);
        }
    };

    // this emits a chat message event to the server with the relevant information.
    const submitMessage = function(chatobj){
        //console.log(`emitting ${chatobj}`);
        socket.emit("chat message",chatobj);
    }

    // this runs on the first render and it specifies how to handle incoming chat events from the server
    React.useEffect(()=>{
        //console.log("does this get run more than once");
        
        // create a chat event listener that will call add chat and pass on the chat message from the server
        socket.on("chat message",(message)=>{
            //console.log("chat received");
            addChat(message);
        });

    },[]);

    // this builds the ui and is executed every time that the chatData state is changed. It will then
    // set all the information of chats based on chatData and then chats is what is rendered to the ui
    React.useEffect(()=>{

        //console.log(chatData);

        // for every element in chatData state create a ui element and add that element to chats state
        setChats(
            chatData.map(({user,content},index)=>{
                return(
                    < React.Fragment key={index} >
                        <div className="padded">
                            <b>{`${user}`}</b> <br/> {`~ ${content}`}
                        </div>

                        <div className="width100 hasThinBorder"></div>
                    </ React.Fragment >
                );
            })
        );

    },[chatData]);


    // this returns the ui and is returned every re-render
    return (
        <div className="chat flexv">
            <div className="hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Chat</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <ReactScrollableFeed>{chats}</ReactScrollableFeed>
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" submitAction={submitMessage} name="chatSubmit" user={props.user} validated={props.validated}/>
        </div>
    );
}