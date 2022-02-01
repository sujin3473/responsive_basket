import React from 'react';

import { shopItemVO } from 'containers/cart/types';

interface Props {
  item: shopItemVO;
  cycle: number;
}

function DropDownItem(props: Props): React.ReactElement {
  const { item, cycle } = props;
  const { img } = item;
  return (
    <>
      <div className="drop_item">
        <img src={img} className="drop_img" />
      </div>
      <hr />
    </>
  );
}

export default DropDownItem;
