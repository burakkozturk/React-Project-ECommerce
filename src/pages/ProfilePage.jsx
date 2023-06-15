import React, { useEffect, useState } from 'react';
import ProductService from '../services/productService';
import { Table, Button, Image } from 'semantic-ui-react';
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
        const shuffledProducts = shuffleArray(productList);
        const randomProducts = shuffledProducts.slice(0, 3); // Rastgele üç ürünü al
        setProducts(randomProducts);
      } catch (error) {
        console.log('Ürünleri getirirken bir hata oluştu:', error);
      }
    };

    fetchProducts();
  }, []);


  // Dizi elemanlarını rastgele karıştıran fonksiyon
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAddProduct = () => {
    // /add-product sayfasına yönlendir
    navigate('/add-product');
  };

  return (
    <div>
      <h1>Hoş geldiniz, {name}!</h1>
      <h3>Ürünleriniz</h3>
      <div className="ui link cards">
        {products?.length &&
          products.map((product) => (
            <div className="card" key={product.id}>
              <div className="image" >
                <Image src={product.photoUrl} style={{ width:"300px", height:"300px" }} alt={product.name} />
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
              </div>
            </div>
          ))}
      </div>
      <Button style={{ margin:"50px" }} onClick={handleAddProduct} color="green">
        Ürün Ekle
      </Button>
    </div>
  );
};

export default ProfilePage;
