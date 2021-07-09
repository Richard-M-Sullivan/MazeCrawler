import React from 'react';

import './css/App.css';

import Description from './components/Description';
import Chat from './components/Chat';
import MoveController from './components/MoveController';
import RoomDisplay from './components/RoomDisplay';
import ItemDisplay from './components/ItemDisplay';

function App() {
  return (
    <div className="screen">

      <div>
        <MoveController />
        <RoomDisplay />
        <ItemDisplay />
      </div>

      <Description />
      <Chat />

    </div>
  );
}

export default App;
