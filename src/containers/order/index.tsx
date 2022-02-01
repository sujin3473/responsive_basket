import React, { useState, useEffect, useMemo } from 'react';
import 'styles/order.css';

import { shopItemVO } from 'containers/cart/types';

import Header2 from 'components/header2';
import DropDown from 'components/dropDown';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';

import OrderItem from './orderItem';

function Order(): React.ReactElement {
  const { cartList, totalPrice } = useSelector((state: RootState) => {
    return {
      cartList: state.cart.cartList,
      totalPrice: state.cart.totalPrice,
      isOpenDropDown: state.cart.isOpenDropDown,
    };
  });

  const [cycle, setCycle] = useState(4);
  const [is16w, setIs16w] = useState(false);
  const [itemList, setItemList] = useState<shopItemVO[]>([]);
  const [skipList, setSkipList] = useState<shopItemVO[]>([]);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const now = useMemo(() => new Date(), []);
  const nextTime = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7 * cycle);
    return today;
  }, [cycle]);

  const handleToggle = (a: number) => {
    setItemList(cartList);
    setSkipList([]);
    setCycle(a);
    if (a === 16) setIs16w(true);
    else setIs16w(false);
  };

  const formatDay = (d: Date) => {
    const date =
      d.getMonth() +
      1 +
      '월 ' +
      d.getDate() +
      '일 ' +
      week[d.getDay()] +
      '요일';
    return date;
  };

  const addToSkipList = (item: shopItemVO) => {
    setSkipList([...skipList, item]);
    setItemList(itemList.filter(i => i.name !== item.name));
  };

  const deleteFromSkipList = (item: shopItemVO) => {
    setSkipList(skipList.filter(i => i.name !== item.name));
    setItemList([item, ...itemList]);
  };

  useEffect(() => {
    setItemList(cartList);
  }, []);

  return (
    <>
      <Header2 quantity={cartList.length} totalPrice={totalPrice} />
      <DropDown itemList={itemList} skipList={skipList} cycle={cycle} />
      <div className="order_wrap">
        <div className="cycle_txt">구독 주기</div>
        <div className="btn_wrap">
          <ul>
            <li
              className={'' + (cycle === 4 && ' active')}
              onClick={() => handleToggle(4)}
            >
              4주마다
            </li>
            <li
              className={'' + (cycle === 8 && ' active')}
              onClick={() => handleToggle(8)}
            >
              8주마다
            </li>
            <li
              className={'' + (cycle === 12 && ' active')}
              onClick={() => handleToggle(12)}
            >
              12주마다
            </li>
            <li
              className={'' + (cycle === 16 && ' active')}
              onClick={() => handleToggle(16)}
            >
              16주마다
            </li>
          </ul>
        </div>
        <div style={{ marginTop: '9px' }}>
          <div className="date_txt">
            <span className="left">결제 예정일</span>
            <span className="right">{formatDay(now)}</span>
          </div>
          <div className="date_txt" style={{ marginTop: '3px' }}>
            <span className="left">다음 결제 예정일</span>
            <span className="right w_blue">{formatDay(nextTime)}</span>
          </div>
        </div>
      </div>
      <img
        src="img/rectangle_bar.png"
        className="bar_img"
        style={{ width: '100%', height: '20px' }}
      />
      <div className="order_wrap2">
        <div>
          <p className="order_txt">
            매번 <span style={{ fontWeight: '300' }}>배송</span>
          </p>
        </div>
        <ul>
          {itemList.map(item => {
            return (
              <li key={item.id} className="order_item">
                <OrderItem
                  item={item}
                  cycle={cycle}
                  is16w={is16w}
                  handleOnX1={deleteFromSkipList}
                  handleOnX2={addToSkipList}
                />
              </li>
            );
          })}
        </ul>
        {skipList.length > 0 && (
          <>
            <div>
              <p className="order_txt">
                한번씩 걸러서 <span style={{ fontWeight: '300' }}>배송</span>
              </p>
            </div>
            <ul>
              {skipList.map(item => {
                return (
                  <li key={item.id} className="order_item">
                    <OrderItem
                      item={item}
                      cycle={cycle}
                      isX2={true}
                      is16w={is16w}
                      handleOnX1={deleteFromSkipList}
                      handleOnX2={addToSkipList}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <div
          className="order_btn"
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '0px',
            right: '0px',
          }}
        >
          다음
        </div>
      </div>
    </>
  );
}

export default Order;
