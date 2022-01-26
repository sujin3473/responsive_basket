import React from 'react';

import { shopItemVO } from './types';

interface Props {
  shopItem: shopItemVO;
}

function ShopItem(props: Props): React.ReactElement {
  const { name, price, type, img } = props.shopItem;
  return (
    <>
      <div className="shop_item">
        <img src={img} className="shop_img" />
        <p>
          {name}
          <br />
          <span>{price}원</span>
        </p>
        <button>추가</button>
      </div>
    </>
  );
}

export default ShopItem;
