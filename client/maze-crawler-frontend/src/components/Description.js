import React from 'react';
import socket from '../services/socketService';//grants access to the global socket obj to send and handle messages
import ReactScrollableFeed from 'react-scrollable-feed';//is what allows me to make a scrollable message box.
import SubmitBar from './SubmitBar';

// The description component provides a window to display information pertaining to the game and contains a submit bar
// that allows you to submit commands to the server for the purpose of getting back messages to be displayed in the display
// pertaining to the game.

// This works by having the submit bar send a description message event to the server through sockets. Then the server handles
// the event and will send back a description message event to the client. This is handled by displaying the message in the
// description window. 
export default function Description(props){

    // create dummy data to be displayed 
    const [descriptionData,setDescriptionData] = React.useState([
        {content:`You wake up in a forest. All around you hear the rustling of trees, and up ahead you hear falling water.
        You have a gash in your side and an empty canteen. What do you do, weary traveller?`},
        {content:"go forward"},
        {content:`You make your way out of the forest up to the base of a craggy cliffs face. It towers over you, and from it 
        is the waterfall, which flows into a small pool of water. You look left. You look right. The cliffs face extends in 
        both directions as far as you can see, but to the right the forest pulls away from the face to expose a small headstone.`},
        {content:"go to the headstone and look around"},
        {content:"You reach the headstone"},
        {content:`Upon further inspection you find no name inscribed on its face. But there on top is a ceramic bowl of incense 
        that is still burning. Suddenly you get the feeling as though you are being watched.`}
    ]);
    
    // ui elements initially set to empty
    const [descriptions,setDescriptions] = React.useState([]);

    // this adds an element to descriptionData state
    const addDescription = function ({content}) {
        //console.log("adding description");
        if(content != null){
            setDescriptionData(descriptionData=>[...descriptionData,{content:content}]);
        }
    };

    // this sends a socket message to the server containing a message. this is passed to
    // the submit bar to be called after you type in and submit a command.
    const submitMessage = function(descriptionobj){
        //console.log(`emitting ${descriptionobj}`);
        socket.emit("description message",descriptionobj);
    };

    // this runs only once on the initial render
    // it sets up the socket message listener
    React.useEffect(()=>{
        //console.log("does this get run more than once");
        
        // this listens for a message event of type description message from the server, and when
        // it is activated it calls add description and hands to it the data that it needs to append a message to displayData
        socket.on("description message",(message)=>{
            console.log("description received");
            addDescription(message);
        });

    },[])

    // this runs every time descriptionData is updated
    // it builds the user interface and stores it in the state variable to be displayed in the ui
    React.useEffect(()=>{
        //console.log(descriptionData);

        // go through descriptionData and make a ui element for each data point
        setDescriptions(
            descriptionData.map(({content},index)=>{
                return(
                    < React.Fragment key={index}>
                        <div className="padded">
                            {`${content}`}
                        </div>

                        <div className="width100 hasThinBorder"></div>
                    </ React.Fragment >
                );
            })
        );

    },[descriptionData]);

    //return the html needed to build the site. This is run every re-render
    return (
        <div className="description flexv">
            <div className="content hasBorder hasBackground flexv flexCenter overflowHidden">
                <h1>Description</h1>
                <div className="flexv flexLeft width100 childrenNoGrow flexScroll">
                    <ReactScrollableFeed>{descriptions}</ReactScrollableFeed> 
                </div>
            </div>
            <br />
            <SubmitBar className="hasBorder hasBackground smallHeight flexh" submitAction={submitMessage} name="descriptionSubmit"/>
        </div>
    );
}