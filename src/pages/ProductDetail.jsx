import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Segment, Image, Button } from 'semantic-ui-react';
import ProductService from '../services/productService';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../store/actions/cartActions';

export default function ProductDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState({});
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  // Lifecycle hook
  useEffect(() => {
    let productService = new ProductService();
    productService.getProductById(id).then((result) => setProduct(result.data));
  }, []);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    console.log('Ürün sepete eklendi:', product);
    dispatch(AddToCart({ product: product, quantity: 1 }));
    setIsCartEmpty(false);
  };

  return (
    <Segment>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Image src={product.photoUrl} size="large" floated="left" />
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Header as="h1">{product.name}</Header>
          <p>{product.description}</p>
          <h3>{product.price} TL</h3>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            <Button color="teal" onClick={() => handleAddToCart(product)} disabled={!isCartEmpty}>
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </Segment>
  );
}
