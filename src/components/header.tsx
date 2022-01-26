import React from 'react';

interface Props {
  pageName: string;
}

function Header(props: Props): React.ReactElement {
  return <header className="header">{props.pageName}</header>;
}

export default Header;
