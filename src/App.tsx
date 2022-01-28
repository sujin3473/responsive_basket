import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Cart from './containers/cart';
import Subscription from './containers/subscription';

function App(): React.ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route path="/subscription" element={Subscription} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
