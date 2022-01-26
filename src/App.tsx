import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Cart from './containers/cart';
import Header from './components/header';

function App(): React.ReactElement {
  const [pageName, setPageName] = useState('장바구니');
  return (
    <div className="App">
      <BrowserRouter>
        <Header pageName={pageName} />
        <Routes>
          <Route path="/" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
