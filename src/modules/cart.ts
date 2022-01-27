import { shopItemVO } from '../containers/types';

const OPEN_OPTION_POPUP = 'cart/OPEN_OPTION_POPUP' as const;
const CLOSE_OPTION_POPUP = 'cart/CLOSE_OPTION_POPUP' as const;
const SET_CART_LIST = 'cart/SET_CART_LIST' as const;

export const openOptionPopup = () => ({
  type: OPEN_OPTION_POPUP,
});

export const closeOptionPopup = () => ({
  type: CLOSE_OPTION_POPUP,
});

export const setCartList = (arr: shopItemVO[]) => ({
  type: SET_CART_LIST,
  payload: arr,
});

type CartAction =
  | ReturnType<typeof openOptionPopup>
  | ReturnType<typeof closeOptionPopup>
  | ReturnType<typeof setCartList>;

type CartState = {
  isOpenOptionPopup: boolean;
  cartList: shopItemVO[];
};

const initialState: CartState = {
  isOpenOptionPopup: false,
  cartList: [],
};

function cart(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case OPEN_OPTION_POPUP:
      return { ...state, isOpenOptionPopup: true };
    case CLOSE_OPTION_POPUP:
      return { ...state, isOpenOptionPopup: false };
    case SET_CART_LIST:
      return { ...state, cartList: action.payload };
    default:
      return state;
  }
}

export default cart;
