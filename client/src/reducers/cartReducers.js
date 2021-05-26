import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: []}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; //new item to the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state, //returns the item in the cart that is not being updated
          error: '', //cart happened successfully and there should be no error
          cartItems: state.cartItems.map((x) => 
            x.product === existItem.product ? item : x
          ), //updates the already existing item in the cart
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item]}; //adds the new item to the cart
      }
    case CART_REMOVE_ITEM:
      return{
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return{ ...state, shippingAddress: action.payload};
    case CART_SAVE_PAYMENT_METHOD:
      return{ ...state, paymentMethod: action.payload};
    case CART_ADD_ITEM_FAIL:
      return{ ...state, error: action.payload };
    case CART_EMPTY:
      return{ ...state, error: '', cartItems: [] };
    default: //to prevent getting error
      return state;
  }
};