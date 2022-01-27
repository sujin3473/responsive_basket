import React, { useState, useEffect } from 'react';

import { shopItemVO } from './types';

interface Props {
  shopItem: shopItemVO;
  handlePopup: (type: string) => void;
  handleClickAdd: (shopItem: shopItemVO) => void;
}

function ShopItem(props: Props): React.ReactElement {
  const { name, price, type, img } = props.shopItem;
  const [isRazor, setIsRazor] = useState(false);

  const handleClickAdd = () => {
    if (isRazor) props.handlePopup(type);
    else {
      props.handleClickAdd(props.shopItem);
    }
  };

  useEffect(() => {
    if (type === 'razor') setIsRazor(true);
  }, []);

  return (
    <>
      <div className="shop_item">
        <img src={img} className="shop_img" />
        <p>
          {name}
          <br />
          <span>{price}원</span>
        </p>
        <button onClick={handleClickAdd}>추가</button>
      </div>
    </>
  );
}

export default ShopItem;
