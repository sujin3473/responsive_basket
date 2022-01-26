import React from 'react';

import { shopItemVO } from './types';

interface Props {
  shopItem: shopItemVO;
}

function ShopItem(props: Props): React.ReactElement {
  const { name, price, type, img } = props.shopItem;
  return (
    <>
      <div className="shopItem">
        <img src={img} />
        <p>{name}</p>
      </div>
    </>
  );
}

export default ShopItem;
