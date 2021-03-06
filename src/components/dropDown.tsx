import React from 'react';
import 'styles/dropDown.css';

import { shopItemVO } from 'containers/cart/types';
import { RootState } from 'modules';
import { useSelector } from 'react-redux';

import DropDownItem from './dropDownItem';

interface Props {
  itemList: shopItemVO[];
  skipList: shopItemVO[];
  cycle: number;
}

function DropDown(props: Props): React.ReactElement {
  const { isOpenDropDown, totalPrice } = useSelector((state: RootState) => {
    return {
      isOpenDropDown: state.cart.isOpenDropDown,
      totalPrice: state.cart.totalPrice,
    };
  });

  const { itemList, skipList, cycle } = props;
  const { itemPrice, shipping } = totalPrice;

  return (
    <>
      <div
        className="drop_down_wrap"
        style={{ display: isOpenDropDown ? 'block' : 'none' }}
      >
        <div className="cart_item_list">
          {itemList.map(item => {
            return <DropDownItem item={item} cycle={cycle} />;
          })}
          {skipList.map(item => {
            return <DropDownItem item={item} cycle={cycle * 2} />;
          })}
        </div>
        <div className="price_box">
          <div className="drop_txt1">
            <span className="drop_left">상품 가격</span>
            <span className="drop_right">{itemPrice.toLocaleString()}원</span>
          </div>
          <div className="drop_txt1">
            <span className="drop_left">배송비</span>
            <span className="drop_right">{shipping.toLocaleString()}원</span>
          </div>
          <div className="drop_txt2">
            <span className="drop_left">오늘 결제 금액</span>
            <span className="drop_right">
              {(itemPrice + shipping).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
      <div
        className="dim2"
        style={{ display: isOpenDropDown ? 'block' : 'none' }}
      ></div>
    </>
  );
}

export default DropDown;
