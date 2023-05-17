import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";

const initialState = {
  cartItems: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { product } = action.payload;
      const existingItem = state.cartItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product, quantity: 1 }]
        };
      }

    case REMOVE_FROM_CART:
      const { productId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product.id !== productId
        )
      };

    default:
      return state;
  }
}
