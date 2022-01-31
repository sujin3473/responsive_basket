import React, { useState, useEffect, useMemo } from 'react';
import 'styles/order.css';

import Header2 from 'components/header2';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';

function Order(): React.ReactElement {
  const { cartList, totalPrice } = useSelector((state: RootState) => {
    return {
      cartList: state.cart.cartList,
      totalPrice: state.cart.totalPrice,
    };
  });

  const [cycle, setCycle] = useState(4);
  const [itemList, setItemList] = useState(cartList);

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const now = useMemo(() => new Date(), []);
  const nextTime = useMemo(() => new Date(), []);
  nextTime.setDate(nextTime.getDate() + 7 * cycle);

  const handleToggle = (a: number) => {
    setCycle(a);
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

  return (
    <>
      <Header2 quantity={cartList.length} totalPrice={totalPrice} />
      <div>
        <p className="cycle_txt">구독 주기</p>
        <div className="btn_wrap">
          <ul>
            <li
              className={'cycle_btn' + (cycle === 4 && ' active')}
              onClick={() => handleToggle(4)}
            >
              4주마다
            </li>
            <li
              className={'cycle_btn' + (cycle === 8 && ' active')}
              onClick={() => handleToggle(8)}
            >
              8주마다
            </li>
            <li
              className={'cycle_btn' + (cycle === 12 && ' active')}
              onClick={() => handleToggle(12)}
            >
              12주마다
            </li>
            <li
              className={'cycle_btn' + (cycle === 16 && 'active')}
              onClick={() => handleToggle(16)}
            >
              16주마다
            </li>
          </ul>
        </div>
        <div>
          <div className="date_txt">
            <span className="left">결제 예정일</span>
            <span className="right">{formatDay(now)}</span>
          </div>
          <div className="date_txt">
            <span className="left">다음 결제 예정일</span>
            <span className="right">{formatDay(nextTime)}</span>
          </div>
        </div>
        <img src="img/rectangle_bar.png" />
        <div>
          <p className="cycle_txt">
            매번 <span style={{ fontWeight: '300' }}>배송</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Order;
