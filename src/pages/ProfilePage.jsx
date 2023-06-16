import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { Button, Image } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = ({ name }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productService = new ProductService();
        const response = await productService.getProducts();
        const productList = response.data;

        // Kullanıcının ismi ile eşleşen ürünleri filtreleyin
        const userProducts = productList.filter((product) => product.userName === name);

        setProducts(userProducts);
      } catch (error) {
        console.log('Ürünleri getirirken bir hata oluştu:', error);
      }
    };

    fetchProducts();
  }, [name]);

  const handleAddProduct = () => {
    // /add-product sayfasına yönlendir
    navigate('/add-product');
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const productService = new ProductService();
      await productService.deleteProduct(productId);
      // Ürünü listeden kaldır
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.log('Ürünü silerken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h1>Hoş geldiniz, {name}!</h1>
      <h3>Ürünleriniz</h3>
      <div className="ui link cards">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card" key={product.id}>
              <div className="image">
                <Image src={product.photoUrl} alt={product.name} style={{ width: '300px', height: '300px' }} />
              </div>
              <div className="content">
                <div className="header">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </div>
                <div className="meta">
                  <span className="category">{product.categoryName}</span>
                </div>
                <div className="description">
                  {name} tarafından satılıyor.
                </div>
                <Button color="red" onClick={() => handleDeleteProduct(product.id)}>
                  Ürünü Sil
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>Henüz ürününüz bulunmamaktadır.</div>
        )}
      </div>
      <Button style={{ margin: '50px' }} onClick={handleAddProduct} color="green">
        Ürün Ekle
      </Button>
    </div>
  );
};

export default ProfilePage;
