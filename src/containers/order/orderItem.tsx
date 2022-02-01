import React, { useState } from 'react';

import { shopItemVO } from 'containers/cart/types';

interface Props {
  item: shopItemVO;
  cycle: number;
  isX2?: boolean;
  is16w: boolean;
  handleOnX1: (item: shopItemVO) => void;
  handleOnX2: (item: shopItemVO) => void;
}

function OrderItem(props: Props): React.ReactElement {
  const { item, cycle, is16w, handleOnX1, handleOnX2 } = props;
  const [isX2, setIsX2] = useState(props.isX2);

  const onClickX2 = () => {
    if (!isX2) {
      setIsX2(true);
      handleOnX2(item);
    }
  };

  const onClickX1 = () => {
    if (isX2) {
      setIsX2(false);
      handleOnX1(item);
    }
  };

  return (
    <>
      <img src={item.img} className="order_img" />
      <span>{item.name}</span>
      {is16w ? (
        <div className="cycle_btn">
          <div className="checked_btn">{cycle}주에 한 번</div>
        </div>
      ) : (
        <div className="cycle_btn">
          <div
            onClick={onClickX1}
            className={isX2 ? 'unchecked_btn' : 'checked_btn'}
          >
            {props.cycle}주에 한 번
          </div>
          <div
            onClick={onClickX2}
            className={isX2 ? 'checked_btn' : 'unchecked_btn'}
          >
            {props.cycle * 2}주에 한 번
          </div>
        </div>
      )}
    </>
  );
}

export default OrderItem;
