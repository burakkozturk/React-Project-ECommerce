export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"


export function AddToCart(product){
    return {
        type : ADD_TO_CART,
        payload : product 
    }
}

export const RemoveFromCart = (productId) => {
    return {
      type: REMOVE_FROM_CART,
      payload: productId
    };
  };

