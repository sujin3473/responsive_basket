import React, { useState, useEffect } from 'react';
import '../styles/cart.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import {
  openOptionPopup,
  closeOptionPopup,
  setCartList,
} from '../modules/cart';
import { shopItemVO } from './types';

import OptionPopup from '../components/optionPopup';
import ShopItem from './shopItem';
import CartItem from './cartItem';

function Cart(): React.ReactElement {
  const [selectedList, setSelectedList] = useState<shopItemVO[]>([]);
  const [shopList, setShopList] = useState<shopItemVO[]>([]);
  const [type, setType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const { isOpenOptionPopup, cartList } = useSelector((state: RootState) => {
    return {
      isOpenOptionPopup: state.cart.isOpenOptionPopup,
      cartList: state.cart.cartList,
    };
  });

  const dispatch = useDispatch();

  const getData = () => {
    fetch('mock/items.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setShopList(data.itemList);
      });
  };

  const openPopup = (type: string) => {
    dispatch(openOptionPopup());
    setType(type);
  };

  const closePopup = () => {
    dispatch(closeOptionPopup());
  };

  const addToCart = (shopItem: shopItemVO) => {
    setSelectedList([...selectedList, shopItem]);
    setShopList(shopList.filter(item => item.name !== shopItem.name));
  };

  const deleteFromCart = (shopItem: shopItemVO) => {
    setSelectedList(selectedList.filter(item => item.name !== shopItem.name));
    setShopList([...shopList, shopItem]);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCartList(selectedList));
    };
  }, []);

  // useEffect(() => {
  //   setTotalPrice(
  //     selectedList.reduce((acc, cur) => {
  //       return acc + cur.price;
  //     }, 0),
  //   );
  // }, []);

  return (
    <>
      {selectedList.length > 0 ? (
        <div>
          {selectedList.map((item, i) => {
            return (
              <li key={i}>
                <CartItem item={item} handleClickDelete={deleteFromCart} />
              </li>
            );
          })}
          <div>
            <p>배송비: {}</p>
            <p>
              최종결제금액<span>{}원</span>
            </p>
          </div>
          <div className="order_btn">주문하기</div>
          <div className="delivery_phrase">
            <p>1.5만원 이상 무료 배송</p>
            <p>평일 16시 이전 주문 시 당일 출고</p>
          </div>
          <div className="phrase">
            <p>함께하면 더 현명한 습관</p>
          </div>
        </div>
      ) : (
        <div className="no_list">
          <p>
            장바구니가 비어있습니다 <br />
            상품을 추가해주세요
          </p>
        </div>
      )}
      <ul>
        {shopList.map((item, i) => {
          return (
            <li key={i} className="shop_item">
              <ShopItem
                shopItem={item}
                handlePopup={openPopup}
                handleClickAdd={addToCart}
              />
            </li>
          );
        })}
      </ul>
      {isOpenOptionPopup && <OptionPopup onClose={closePopup} />}
    </>
  );
}

export default Cart;
