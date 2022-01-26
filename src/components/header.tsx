import React from 'react';
import '../styles/header.css';

interface Props {
  pageName: string;
}

function Header(props: Props): React.ReactElement {
  return (
    <header className="header">
      <img src="img/Arrow_back.png" className="arrow_back" />
      <span>{props.pageName}</span>
    </header>
  );
}

export default Header;
