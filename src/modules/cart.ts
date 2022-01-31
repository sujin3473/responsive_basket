import { shopItemVO } from 'containers/cart/types';

const OPEN_OPTION_POPUP = 'cart/OPEN_OPTION_POPUP' as const;
const CLOSE_OPTION_POPUP = 'cart/CLOSE_OPTION_POPUP' as const;
const SET_CART_LIST = 'cart/SET_CART_LIST' as const;
const SET_FINAL_PRICE = 'cart/SET_FINAL_PRICE' as const;

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

export const setFinalPrice = (price: number) => ({
  type: SET_FINAL_PRICE,
  payload: price,
});

type CartAction =
  | ReturnType<typeof openOptionPopup>
  | ReturnType<typeof closeOptionPopup>
  | ReturnType<typeof setCartList>
  | ReturnType<typeof setFinalPrice>;

type CartState = {
  isOpenOptionPopup: boolean;
  cartList: shopItemVO[];
  totalPrice: number;
};

const initialState: CartState = {
  isOpenOptionPopup: false,
  cartList: [],
  totalPrice: 0,
};

function cart(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case OPEN_OPTION_POPUP:
      return { ...state, isOpenOptionPopup: true };
    case CLOSE_OPTION_POPUP:
      return { ...state, isOpenOptionPopup: false };
    case SET_CART_LIST:
      return { ...state, cartList: action.payload };
    case SET_FINAL_PRICE:
      return { ...state, totalPrice: action.payload };
    default:
      return state;
  }
}

export default cart;
