import React from 'react';

import { shopItemVO } from './types';

interface Props {
  item: shopItemVO;
  handleClickDelete: (shopItem: shopItemVO) => void;
  handleOnIncrease: (id: number) => void;
  handleOnDecrease: (id: number) => void;
}

function CartItem(props: Props): React.ReactElement {
  const { id, name, price, des, img, amount, type, color } = props.item;

  return (
    <>
      <div className="cart_item">
        <img src={img} className="cart_img" />
        <div style={{ position: 'absolute', left: '95px' }}>
          <p style={{ margin: '0px' }}>{name} </p>
          {type === 'razor' ? (
            <p className="des_text">
              <span className="w_blue">{color}</span> 핸들 + 면도날 2개입
            </p>
          ) : (
            <p className="des_text">{des}</p>
          )}
          <span style={{ fontSize: '14px' }}>{price.toLocaleString()}원</span>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="img/Close.png"
            onClick={() => props.handleClickDelete(props.item)}
            className="delete_btn"
          />
          <div className="pm_btn">
            <div className="m_btn">
              <img
                src="img/Minus.png"
                onClick={() => props.handleOnDecrease(id)}
              />
            </div>
            <div className="amount">{amount}</div>
            <div className="p_btn">
              <img
                src="img/Plus.png"
                onClick={() => props.handleOnIncrease(id)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CartItem;
