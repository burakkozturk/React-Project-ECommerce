import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RemoveFromCart } from '../store/actions/cartActions';

export default function CartDetail() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    console.log("Ürünü Sil:", productId);
    dispatch(RemoveFromCart(productId));
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(cartItem => {
      totalPrice += cartItem.product.price * cartItem.quantity;
    });
    return totalPrice.toFixed(2); // İki basamaklı ondalık olarak formatlanmış sepet toplamını döndürür
  };

  return (
    <div>
      <h1>Sepet Detayı</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fotoğraf</Table.HeaderCell>
            <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
            <Table.HeaderCell>Ürün Fiyatı</Table.HeaderCell>
            <Table.HeaderCell>Ürün Miktarı</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <Table.Row key={cartItem.product.id}>
                <Table.Cell>
                  <Image src={cartItem.product.photoUrl} size="tiny" rounded />
                </Table.Cell>
                <Table.Cell>{cartItem.product.name}</Table.Cell>
                <Table.Cell>{cartItem.product.price}</Table.Cell>
                <Table.Cell>{cartItem.quantity}</Table.Cell>
                <Table.Cell>
                  <Button as={Link} to={`/products/${cartItem.product.id}`} primary>
                    Ürünü İncele
                  </Button>
                  <Button onClick={() => handleRemoveFromCart(cartItem.product.id)} color="red">
                    Sil
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5}>Sepetiniz boş</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

        {cartItems.length > 0 && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={4} textAlign="right">
                Toplam:
              </Table.HeaderCell>
              <Table.HeaderCell>
                {calculateTotalPrice()} TL
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={5} textAlign="right">
                <Button color="teal" onClick={() => { /* Ödeme sayfasına yönlendirme işlemleri burada yapılacak */ }}>
                  Ödemeye Git
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}
