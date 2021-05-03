import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: []}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; //new item to the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state, //returns the item in the cart that is not being updated
          cartItems: state.cartItems.map((x) => 
            x.product === existItem.product ? item : x
          ), //updates the already existing item in the cart
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item]}; //adds the new item to the cart
      }
    case CART_REMOVE_ITEM:
      return{
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default: //to prevent getting error
      return state;
  }
}