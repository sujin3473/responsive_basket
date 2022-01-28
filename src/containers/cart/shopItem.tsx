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
      <div className="shop_item">
        <img src={img} className="shop_img" />
        <p>
          {name}
          <br />
          <span>{price.toLocaleString()}원</span>
        </p>
        <button onClick={handleClickAdd}>추가</button>
      </div>
    </>
  );
}

export default ShopItem;
