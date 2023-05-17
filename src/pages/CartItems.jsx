import React from 'react';
import { useSelector } from 'react-redux';

export default function CartItems() {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <div>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(cartItem => (
            <li key={cartItem.product.id}>{cartItem.product.name}</li>
          ))}
        </ul>
      ) : (
        <p>Sepetiniz boş</p>
      )}
    </div>
  );
}
