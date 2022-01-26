import React, { useState, useEffect } from 'react';
import '../styles/cart.css';

import ShopItem from './shopItem';

function Cart(): React.ReactElement {
  const [itemList, setItemList] = useState([]);
  const [shopList, setShopList] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {itemList.length > 0 ? (
        <div>
          {shopList.map((item, i) => {
            return (
              <li key={i}>
                <ShopItem shopItem={item} />
              </li>
            );
          })}
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
              <ShopItem shopItem={item} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Cart;
