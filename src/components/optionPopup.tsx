import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { closeOptionPopup } from 'modules/cart';

import { shopItemVO } from 'containers/cart/types';

interface Props {
  handleClickAdd: (shopItem: shopItemVO) => void;
}

function OptionPopup(props: Props): React.ReactElement {
  const [item, setItem] = useState({
    id: 1,
    name: '면도기세트',
    des: '미드나이트 네이비 핸들 + 면도날 2개입',
    price: 8900,
    type: 'razor',
    color: '미드나이트 네이비',
    img: 'img/면도기세트_미드나이트 네이비.png',
    amount: 1,
    freeShipping: true,
  });

  const isOpenOptionPopup = useSelector(
    (state: RootState) => state.cart.isOpenOptionPopup,
  );

  const dispatch = useDispatch();

  const handleSetItem = (color: string) => {
    setItem({
      ...item,
      des: `${color} 핸들 + 면도날 2개입`,
      color: color,
      img: `img/면도기세트_${color}.png`,
    });
  };

  const handleClickDecide = () => {
    props.handleClickAdd(item);
    dispatch(closeOptionPopup());
  };

  return (
    <>
      <div
        className="dim1"
        style={{ display: isOpenOptionPopup ? 'block' : 'none' }}
      ></div>
      <section
        className="option_popup"
        style={{ display: isOpenOptionPopup ? 'block' : 'none' }}
      >
        <div className="popup_text">
          면도기 색상<span>을 선택해주세요</span>
          <img
            src="img/Close.png"
            onClick={() => dispatch(closeOptionPopup())}
            className="close_btn"
          />
        </div>
        <img src={`img/image_${item.color}.png`} className="razor_img"></img>
        <div className="option_circle_wrap">
          <div
            className="option_circle_border border_navy"
            style={{
              borderColor:
                item.color === '미드나이트 네이비' ? '#002F76' : 'white',
            }}
          >
            <div
              className="option_circle_circle"
              style={{ backgroundColor: '#002F76' }}
              onClick={() => handleSetItem('미드나이트 네이비')}
            ></div>
          </div>
          <div
            className="option_circle_border border_blue"
            style={{
              borderColor: item.color === '사파이어 블루' ? '#1888D9' : 'white',
            }}
          >
            <div
              className="option_circle_circle"
              style={{ backgroundColor: '#4296E0' }}
              onClick={() => handleSetItem('사파이어 블루')}
            ></div>
          </div>
          <div
            className="option_circle_border border_gray"
            style={{
              borderColor:
                item.color === '슬레이트 그레이' ? '#CECECE' : 'white',
            }}
          >
            <div
              className="option_circle_circle"
              style={{ backgroundColor: '#CBCBCB' }}
              onClick={() => handleSetItem('슬레이트 그레이')}
            ></div>
          </div>
        </div>
        <div className="option_btn" onClick={handleClickDecide}>
          {item.color} <span>선택하기</span>
        </div>
      </section>
    </>
  );
}

export default OptionPopup;
