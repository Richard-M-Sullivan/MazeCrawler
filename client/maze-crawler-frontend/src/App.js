import React from 'react';


import './services/socketService'

import Description from './components/Description';
import Chat from './components/Chat';
import MoveController from './components/MoveController';
import RoomDisplay from './components/RoomDisplay';
import ItemDisplay from './components/ItemDisplay';

function App() {

  const [userName,setUserName] = React.useState(null);

  return (
    <div className="screen flexv flexWrap">

      <div className="hud flexv flexSpaceBetween flexScroll">
        <MoveController className="hasBorder hasBackground makeSquare autoHeight" />
        <br/>
        <RoomDisplay className="hasBorder hasBackground makeSquare autoHeight"/>
        <br/>
        <ItemDisplay />
      </div>

      <Description userName={userName}/>
      <Chat userName={userName}/>

    </div>
  );
}

export default App;
