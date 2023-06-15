import React, { useState, useEffect } from 'react';
import { Table, Button, Image } from 'semantic-ui-react';
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
    return `${imageUrl}?w=${MAX_IMAGE_SIZE}&h=${MAX_IMAGE_SIZE}&fit=crop`;
  };

  return (
    <div>
      <div className="ui link cards">
        {products?.length &&
          products.map((product) => (
            <div className="card" key={product.id}>
              <div className="image">
                <Image
                  src={resizeImage(product.photoUrl)}
                  alt={product.name}
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
              <div class="button-area" className="extra content">
                <Link to={`/products/${product.id}`}>
                  <Button onClick={() => handleAddToCart(product)}>
                    Ürünü İncele
                  </Button>
                </Link>
                <Button onClick={() => handleAddToCart(product)}>
                  Sepete Ekle
                </Button>
                <Button
                  class="last-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Favorilere Ekle
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
