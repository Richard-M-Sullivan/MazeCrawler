import React from 'react';
import socket from '../services/socketService';
import ReactScrollableFeed from 'react-scrollable-feed';
import SubmitBar from './SubmitBar';


export default function Chat(props){

    const [chatData,setChatData] = React.useState([
        {user:"richard",content:"hello conner!"},
        {user:"conner",content:"how goes it buddy? :^)"},
        {user:"richard",content:"it's going good"},
        {user:"david", content:"can I join in?"},
        {user:"conner", content:"I don't see why not?"},
        {user:"david",content:"askja sluff salk las kef laski d lugsail s skuld flog jbht pdfjs lbj"}
    ]);
    
    const [chats,setChats] = React.useState([]);

    const addChat = function ({user,content}) {
        if(content != null){
            //console.log("adding chat");
            //console.log({user:user,content:content});
            setChatData(chatData => [...chatData,{user:user,content:content}]);
        }
    };

    const submitMessage = function(chatobj){
        //console.log(`emitting ${chatobj}`);
        socket.emit("chat message",chatobj);
    }

    React.useEffect(()=>{
        //console.log("does this get run more than once");
        
        socket.on("chat message",(message)=>{
            //console.log("chat received");
            addChat(message);
        });

    },[]);

    React.useEffect(()=>{

        //console.log(chatData);

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


    return (
        <div className="chat flexv">
            <div className="hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Chat</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <ReactScrollableFeed>{chats}</ReactScrollableFeed>
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" submitAction={submitMessage} name="chatSubmit"/>
        </div>
    );
}