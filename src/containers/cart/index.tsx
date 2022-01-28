import React, { useState, useEffect } from 'react';
import 'styles/cart.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { openOptionPopup, setCartList } from 'modules/cart';
import { shopItemVO } from './types';

import Header from 'components/header';
import OptionPopup from 'components/optionPopup';
import ShopItem from './shopItem';
import CartItem from './cartItem';

function Cart(): React.ReactElement {
  const [selectedList, setSelectedList] = useState<shopItemVO[]>([]);
  const [shopList, setShopList] = useState<shopItemVO[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(2500);

  const { isOpenOptionPopup } = useSelector((state: RootState) => {
    return {
      isOpenOptionPopup: state.cart.isOpenOptionPopup,
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

  const openPopup = () => {
    dispatch(openOptionPopup());
  };

  const addToCart = (shopItem: shopItemVO) => {
    setSelectedList([...selectedList, shopItem]);
    setShopList(shopList.filter(item => item.name !== shopItem.name));
  };

  const deleteFromCart = (shopItem: shopItemVO) => {
    setSelectedList(selectedList.filter(item => item.name !== shopItem.name));
    setShopList([shopItem, ...shopList]);
  };

  const onIncrease = (id: number) => {
    const newList = selectedList.map(item => {
      if (id === item.id) return { ...item, amount: item.amount + 1 };
      else return item;
    });
    setSelectedList(newList);
  };

  const onDecrease = (id: number) => {
    const newList = selectedList.map(item => {
      if (id === item.id && item.amount > 1)
        return { ...item, amount: item.amount - 1 };
      else return item;
    });
    setSelectedList(newList);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCartList(selectedList));
    };
  }, []);

  useEffect(() => {
    if (selectedList.find(item => item.freeShipping) || totalPrice > 15000)
      setShipping(0);
    else setShipping(2500);
  }, [selectedList, totalPrice]);

  useEffect(() => {
    setTotalPrice(
      selectedList.reduce((acc, cur) => {
        return acc + cur.price * cur.amount;
      }, 0),
    );
  }, [selectedList]);

  return (
    <>
      <Header />
      {selectedList.length > 0 ? (
        <div>
          {selectedList.map((item, i) => {
            return (
              <li key={i}>
                <CartItem
                  item={item}
                  handleClickDelete={deleteFromCart}
                  handleOnIncrease={onIncrease}
                  handleOnDecrease={onDecrease}
                />
              </li>
            );
          })}
          <div>
            {shipping > 0 ? (
              <p>배송비: {shipping.toLocaleString()}원</p>
            ) : (
              <p>배송비: 무료배송</p>
            )}
            <p>
              최종결제금액<span>{totalPrice.toLocaleString()}원</span>
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
        {shopList.map(item => {
          return (
            <li key={item.id} className="shop_item">
              <ShopItem
                shopItem={item}
                handlePopup={openPopup}
                handleClickAdd={addToCart}
              />
            </li>
          );
        })}
      </ul>
      {isOpenOptionPopup && <OptionPopup handleClickAdd={addToCart} />}
    </>
  );
}

export default Cart;
