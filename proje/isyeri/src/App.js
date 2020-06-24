import React from 'react';

import Mesajlasma from './components/Mesajlasma/Mesajlasma';
import Katil from './components/Katil/Katil';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Katil} />
      <Route path="/chat" component={Mesajlasma} />
    </Router>
  );
}

export default App;
