import React from 'react';
import 'styles/header.css';

function Header(): React.ReactElement {
  return (
    <header className="header">
      <img src="img/Arrow_back.png" className="arrow_back" />
      <span>장바구니</span>
    </header>
  );
}

export default Header;
