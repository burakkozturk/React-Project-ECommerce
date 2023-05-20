import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownDivider, DropdownItem } from 'semantic-ui-react';

export default function CartSummary() {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <div>
      <Dropdown item text='Sepetiniz'>
        <Dropdown.Menu>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <Dropdown.Item key={cartItem.product.id}>
                {cartItem.product.name}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>Sepetiniz boş</Dropdown.Item>
          )}
          <DropdownDivider />
          <DropdownItem as={NavLink} to="/cart">
            Sepete Git
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
