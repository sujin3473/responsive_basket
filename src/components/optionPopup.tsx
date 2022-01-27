import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import { closeOptionPopup } from '../modules/cart';

interface Props {
  onClose: () => void;
}

function OptionPopup(props: Props): React.ReactElement {
  const [color, setColor] = useState('미드나이트 네이비');
  const [imgSrc, setImgSrc] = useState('img/image_navy.png');
  const isOpenOptionPopup = useSelector(
    (state: RootState) => state.cart.isOpenOptionPopup,
  );

  const handleClosePopup = () => {
    props.onClose();
  };

  return (
    <section
      className="option_popup"
      style={{ display: isOpenOptionPopup ? 'block' : 'none' }}
    >
      <div className="popup_text">
        <p>
          <span>면도기 색상</span>을 선택해주세요
        </p>
        <img
          src="img/Close.png"
          onClick={handleClosePopup}
          className="close_btn"
        />
      </div>
      <img src={imgSrc}></img>
      <button className="option_btn">
        <span>{color} 선택하기</span>
      </button>
    </section>
  );
}

export default OptionPopup;
