import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Segment, Image } from 'semantic-ui-react';
import ProductService from '../services/productService';

export default function ProductDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState({});

  // Lifecycle hook
  useEffect(() => {
    let productService = new ProductService();
    productService.getProductById(id).then((result) => setProduct(result.data));
  }, []);

  return (
    <Segment>
      <div style={{ display: 'flex' }}>
        <Image src={product.photoUrl} size="large" floated="left" />
        <div style={{ marginLeft: '20px' }}>
          <Header as="h1">{product.name}</Header>
          <p style={{ marginTop: '100px' }}>{product.description}</p>
          <h3 style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'yellow', borderRadius: '5px', padding: '5px' }}>{product.price} TL</h3>
        </div>
      </div>
    </Segment>
  );
}
