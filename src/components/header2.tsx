import React, { useState, useEffect } from 'react';
import 'styles/header.css';

import { totalPrice } from 'containers/cart/types';

import { useDispatch } from 'react-redux';
import { openDropDown, closeDropDown } from 'modules/cart';

interface Props {
  quantity: number;
  totalPrice: totalPrice;
}

function Header2(props: Props): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const { quantity, totalPrice } = props;
  const { itemPrice, shipping } = totalPrice;

  const dispatch = useDispatch();

  const handleArrow = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) dispatch(openDropDown());
    else dispatch(closeDropDown());
  }, [isOpen]);

  return (
    <div className="header2">
      <img src="img/WISLEY_LOGO.png" className="logo" />
      <img src="img/Cart.png" className="ico_cart" />
      <div className="cart_label">{quantity}</div>
      <div className="price_txt">
        {(itemPrice + shipping).toLocaleString()}원
      </div>
      <img
        src="img/Arrow_up.png"
        className={'arrow_up' + (isOpen ? ' arrow_down' : '')}
        onClick={handleArrow}
        style={{}}
      />
    </div>
  );
}

export default Header2;
