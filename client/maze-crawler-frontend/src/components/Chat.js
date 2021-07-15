import React from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';
import SubmitBar from './SubmitBar';


export default function Chat(props){

    const [chatData,setChatData] = React.useState([
        {user:"richard",content:"hello connor!"},
        {user:"connor",content:"how goes it buddy? :^)"},
        {user:"richard",content:"it's going good"},
        {user:"david", content:"can I join in?"},
        {user:"connor", content:"I don't see why not?"},
        {user:"david",content:"jasldfjl askjdfa; slkfj ;aslkfj;las kjfd ;laskjf d;ldksajl fksjld dflkg jshl dfkjs ldjg"}
    ]);
    
    const [chats,setChats] = React.useState([]);

    const addChat = function ({user,content}) {
        if(content != null){
            setChatData([...chatData,{user:user,content:content}])
        }
    };

    React.useEffect(()=>{
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
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" submitAction={addChat} name="chatSubmit"/>
        </div>
    );
}