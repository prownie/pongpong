import React from 'react';
import Pong from './components/Pong';
import GameMenu from './components/GameMenu';
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const socket= io('http://localhost:3001', {
			transports: ['websocket']
		});


const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={GameMenu} />
      <Route path="/game" exact component={Pong} />
    </Switch>
  </BrowserRouter>
  );
};

export default App;




