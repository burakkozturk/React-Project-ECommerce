  import React, { useState, useEffect } from 'react';
  import { Table, Button, Image, Icon } from 'semantic-ui-react';
  import ProductService from '../services/productService';
  import { Link } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { AddToCart } from '../store/actions/cartActions';

  const MAX_IMAGE_SIZE = 300; // Maksimum fotoğraf boyutu (genişlik veya yükseklik)

  export default function ProductList() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      let productService = new ProductService();
      productService.getProducts().then(result => setProducts(result.data));
    }, []);

    const handleAddToCart = (product) => {
      console.log("Ürün sepete eklendi:", product);
      dispatch(AddToCart({ product: product, quantity: 1 }));
    };

    const resizeImage = (imageUrl) => {
      // Resim URL'sini al ve boyutlandır
      const resizedUrl = new URL(imageUrl);
      resizedUrl.searchParams.set('w', MAX_IMAGE_SIZE);
      resizedUrl.searchParams.set('h', MAX_IMAGE_SIZE);
      resizedUrl.searchParams.set('fit', 'crop');
      return resizedUrl.toString();
    };

    return (
      <div>
        <div className="ui link cards">
          {products?.length &&
            products.map((product) => (
              <div className="card" key={product.id}>
                <div className="image">
                  <Image style={{ width:"300px", height:"300px" }}
                    src={resizeImage(product.photoUrl)}
                    alt={product.name}
                    size="tiny"
                    rounded
                  />
                </div>
                <div className="content">
                  <div className="header">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </div>
                  <div className="meta">
                    <span className="category">{product.categoryName}</span>
                  </div>
                  <div className="description">
                    {product.userName} tarafından satılıyor.
                  </div>
                </div>
                <div className="extra content">
                  <Link to={`/products/${product.id}`}>
                    <Button primary>
                      <Icon name="eye" /> İncele
                    </Button>
                  </Link>
                  <Button onClick={() => handleAddToCart(product)}>
                    <Icon name="cart" /> 
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
