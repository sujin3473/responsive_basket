import React, { useState } from 'react';

import { shopItemVO } from './types';

interface Props {
  item: shopItemVO;
  handleClickDelete: (shopItem: shopItemVO) => void;
}

function CartItem(props: Props): React.ReactElement {
  const [amount, setAmount] = useState(1);
  const { name, price, des, img } = props.item;

  const onIncrease = () => {
    setAmount(amount + 1);
  };

  const onDecrease = () => {
    if (amount > 1) setAmount(amount - 1);
  };

  return (
    <>
      <div className="cart_item">
        <img src={img} className="cart_img" />
        <p>{name} </p>
        <p>{des}</p>
        <span>{price}원</span>
        <div className="pm_btn">
          <img src="img/Minus.png" onClick={onDecrease} />
          {amount}
          <img src="img/Plus.png" onClick={onIncrease} />
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
