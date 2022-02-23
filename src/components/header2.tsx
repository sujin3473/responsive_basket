import React, { useState, useEffect } from 'react';
import 'styles/header.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openDropDown, closeDropDown } from 'modules/cart';

interface Props {
  quantity: number;
}

function Header2(props: Props): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const { quantity } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleArrow = () => {
    setIsOpen(!isOpen);
  };

  const handleClickArrow = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isOpen) dispatch(openDropDown());
    else dispatch(closeDropDown());
  }, [isOpen]);

  return (
    <div className="header">
      <img
        src="img/Arrow_back.png"
        className="arrow_back"
        onClick={handleClickArrow}
      />
      <span>구독주기</span>
      <div onClick={handleArrow}>
        <img src="img/Cart.png" className="ico_cart" />
        <div className="cart_label">{quantity}</div>
        <img
          src="img/Arrow_up.png"
          className={'arrow_up' + (isOpen ? ' arrow_down' : '')}
        />
      </div>
    </div>
  );
}

export default Header2;
