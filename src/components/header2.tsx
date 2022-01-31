import React from 'react';

interface Props {
  quantity: number;
  totalPrice: number;
}

function Header2(props: Props): React.ReactElement {
  const { quantity, totalPrice } = props;
  return (
    <header className="header">
      <img src="img/WISLEY_LOGO.png" className="logo" />
      <img src="img/Cart.png" className="ico_cart" />
      {quantity}
      <img src="img/Arrow_up.png" />
      {totalPrice.toLocaleString()}원
    </header>
  );
}

export default Header2;
