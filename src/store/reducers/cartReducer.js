import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
import { cartItems } from "../initialValues/cartItems";

const initailState = {
    cartItems: cartItems
}



export default function cartReducer(state = initailState, { type, payload }) {
    switch (type) {
        case ADD_TO_CART:
            let product = state.cartItems.find(p => p.product.id == payload.id)
            if (product) {
                product.quantity++;
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { product: payload }]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(p => p.product.id !== payload.id)
            }

        default:
            return state;
    }
}