import React from 'react';


import socket from './services/socketService';

import Description from './components/Description';
import Chat from './components/Chat';
import MoveController from './components/MoveController';
import RoomDisplay from './components/RoomDisplay';
import ItemDisplay from './components/ItemDisplay';

// the app component provides a description window to see events caused by user commands, a chat window to chat
// with other users, submit bars for submitting input to the two mentioned windows. It provides an item list to
// show current items that the user has, as well as room and compass icons that help the user navigate the world.

// it does this by creating the respective components and passing the user and validated states to the chat and description
// components so that the user can login and track their information

function App() {

  // create a state for user (this holds the user name, which is a unique id that specifies a user)
  // create a state for validated (this lets the server know that the user of this username has logged in and is valid)
  const [user,setUser] = React.useState(null);
  const [validated,setValidated] = React.useState(false);

  // setting socket event handlers only runs once on the first render
  React.useEffect(()=>{

    // if you get told to set the username, then set the username to the state specified in the message
    socket.on("set username",(message)=>{
      setUser(message.state);
    });

    // if you ger told to set validated flag, then set validated to the state specified in the message
    socket.on("set validated",(message)=>{
      setValidated(message.state);
    });

  },[]);

  //returns the ui with all the given components
  return (
    <div className="screen flexv flexWrap">

      <div className="hud flexv flexSpaceBetween flexScroll">
        <MoveController className="hasBorder hasBackground makeSquare autoHeight" />
        <br/>
        <RoomDisplay className="hasBorder hasBackground makeSquare autoHeight"/>
        <br/>
        <ItemDisplay />
      </div>

      {/* the description and chat messages make requests to the server, so they are passed hooks
          to user and validated so that they can let the server know how to handle the incoming messages*/}

      <Description user={user} validated={validated}/>
      <Chat user={user} validated={validated}/>

    </div>
  );
}

export default App;
