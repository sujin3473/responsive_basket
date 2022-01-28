import React from 'react';

import { shopItemVO } from './types';

interface Props {
  item: shopItemVO;
  handleClickDelete: (shopItem: shopItemVO) => void;
  handleOnIncrease: (id: number) => void;
  handleOnDecrease: (id: number) => void;
}

function CartItem(props: Props): React.ReactElement {
  const { id, name, price, des, img, amount } = props.item;

  return (
    <>
      <div className="cart_item">
        <img src={img} className="cart_img" />
        <p>{name} </p>
        <p className="des_text">{des}</p>
        <span>{price.toLocaleString()}원</span>
        <div className="pm_btn">
          <img src="img/Minus.png" onClick={() => props.handleOnDecrease(id)} />
          {amount}
          <img src="img/Plus.png" onClick={() => props.handleOnIncrease(id)} />
        </div>
        <img
          src="img/Close.png"
          onClick={() => props.handleClickDelete(props.item)}
          className="delete_btn"
        />
      </div>
      <hr />
    </>
  );
}

export default CartItem;
