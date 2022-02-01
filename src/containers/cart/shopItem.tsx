import React from 'react';

import { shopItemVO } from './types';

interface Props {
  shopItem: shopItemVO;
  handlePopup: () => void;
  handleClickAdd: (shopItem: shopItemVO) => void;
}

function ShopItem(props: Props): React.ReactElement {
  const { name, price, type, img } = props.shopItem;

  const handleClickAdd = () => {
    if (type === 'razor') props.handlePopup();
    else {
      props.handleClickAdd(props.shopItem);
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <img src={img} className="shop_img" />
        <div className="shop_txt1">
          {name}
          <br />
          <span className="shop_txt2">{price.toLocaleString()}원</span>
        </div>
        <div className="add_btn" onClick={handleClickAdd}>
          추가
        </div>
      </div>
    </>
  );
}

export default ShopItem;
