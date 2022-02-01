import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/cart.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { openOptionPopup, setCartList, setFinalPrice } from 'modules/cart';
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
  const navigate = useNavigate();

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

  const onClickOrder = () => {
    dispatch(setCartList(selectedList));
    dispatch(setFinalPrice({ itemPrice: totalPrice - shipping, shipping }));
    navigate('/order');
  };

  useEffect(() => {
    getData();
  }, []);

  // 무료배송 설정
  useEffect(() => {
    if (selectedList.find(item => item.freeShipping) || totalPrice > 15000)
      setShipping(0);
    else setShipping(2500);
  }, [selectedList]);

  // 최종 결제금액 설정
  useEffect(() => {
    setTotalPrice(
      selectedList.reduce((acc, cur) => {
        return acc + cur.price * cur.amount;
      }, 0) + shipping,
    );
  }, [selectedList, shipping]);

  return (
    <>
      <Header />
      {selectedList.length > 0 ? (
        <div style={{ marginTop: '52px' }}>
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
          <div className="delivery_txt_wrap">
            <div className="cart_txt1">
              <span className="f_left">배송비</span>
              {shipping > 0 ? (
                <>
                  <span className="f_right">{shipping.toLocaleString()}원</span>
                </>
              ) : (
                <span className="f_right">무료배송</span>
              )}
            </div>
            <div className="cart_txt2">
              <span className="f_left">최종결제금액</span>
              <span className="f_right">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
          <div
            className="order_btn"
            onClick={onClickOrder}
            style={{ marginTop: '20px' }}
          >
            주문하기
          </div>
          <div className="delivery_phrase">
            1.5만원 이상 무료 배송
            <br />
            <span>평일 16시 이전 주문 시 당일 출고</span>
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
            <li key={item.id} className="shop_item shadow">
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
