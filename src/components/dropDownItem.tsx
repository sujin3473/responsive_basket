import React from 'react';

import { shopItemVO } from 'containers/cart/types';

interface Props {
  item: shopItemVO;
  cycle: number;
}

function DropDownItem(props: Props): React.ReactElement {
  const { item, cycle } = props;
  const { img, name, des, amount, price } = item;
  return (
    <>
      <div className="drop_item">
        <img src={img} className="drop_img" />
        <div>
          <p className="drop_name">{name}</p>
          <p className="drop_des">{des}</p>
          <div className="drop_cycle">
            <span className="w_blue">{cycle}주마다</span>
            <span className="d_right">
              {amount}개/{price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default DropDownItem;
