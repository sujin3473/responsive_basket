import { shopItemVO, totalPrice } from 'containers/cart/types';

const OPEN_OPTION_POPUP = 'cart/OPEN_OPTION_POPUP' as const;
const CLOSE_OPTION_POPUP = 'cart/CLOSE_OPTION_POPUP' as const;
const SET_CART_LIST = 'cart/SET_CART_LIST' as const;
const SET_FINAL_PRICE = 'cart/SET_FINAL_PRICE' as const;
const OPEN_DROP_DOWN = 'cart/OPEN_DROP_DOWN' as const;
const CLOSE_DROP_DOWN = 'cart/CLOSE_DROP_DOWN' as const;

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

export const setFinalPrice = (price: totalPrice) => ({
  type: SET_FINAL_PRICE,
  payload: price,
});

export const openDropDown = () => ({
  type: OPEN_DROP_DOWN,
});

export const closeDropDown = () => ({
  type: CLOSE_DROP_DOWN,
});

type CartAction =
  | ReturnType<typeof openOptionPopup>
  | ReturnType<typeof closeOptionPopup>
  | ReturnType<typeof setCartList>
  | ReturnType<typeof setFinalPrice>
  | ReturnType<typeof openDropDown>
  | ReturnType<typeof closeDropDown>;

type CartState = {
  isOpenOptionPopup: boolean;
  cartList: shopItemVO[];
  totalPrice: totalPrice;
  isOpenDropDown: boolean;
};

const initialState: CartState = {
  isOpenOptionPopup: false,
  cartList: [],
  totalPrice: { itemPrice: 0, shipping: 0 },
  isOpenDropDown: false,
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
    case OPEN_DROP_DOWN:
      return { ...state, isOpenDropDown: true };
    case CLOSE_DROP_DOWN:
      return { ...state, isOpenDropDown: false };
    default:
      return state;
  }
}

export default cart;
