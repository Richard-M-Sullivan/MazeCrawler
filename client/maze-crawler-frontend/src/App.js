import React from 'react';

import './css/App.css';

import Description from './components/Description';
import Chat from './components/Chat';
import MoveController from './components/MoveController';
import RoomDisplay from './components/RoomDisplay';
import ItemDisplay from './components/ItemDisplay';

function App() {


  return (
    <div className="screen flexv flexWrap">

      <div className="hud flexv flexSpaceBetween flexScroll">
        <MoveController className="hasBorder hasBackground makeSquare autoHeight" />
        <br/>
        <RoomDisplay className="hasBorder hasBackground makeSquare autoHeight"/>
        <br/>
        <ItemDisplay />
      </div>

      <Description />
      <Chat />

    </div>
  );
}

export default App;
