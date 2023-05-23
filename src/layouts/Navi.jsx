import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.PNG';
import CartSummary from "../layouts/CartSummary";



export default function Navi() {
  const navigate = useNavigate();



  function handleRegister() {
    navigate('/register');
  }


  function handleAddProduct() {
    navigate('/add-product');
  }

  return (
    <div>
      <Menu inverted fixed='top' size='large'>
        <Container>
          <Menu.Item as={Link} to='/'>
            <img src={logo} alt="Logo" />
          </Menu.Item>
          <Menu.Item as={Link} to='/products' name='Ürünler' />
          <Menu.Item as={Link} to='/categories' name='Kategoriler' />

        </Container>
        <Menu.Menu position='right'>

          <CartSummary /> {/* Sepet özeti */}

          <Menu.Item name='Ürün Ekle' onClick={handleAddProduct} /> {/* Ürün Ekle butonu */}
          <Menu.Item name='Kayıt Ol' onClick={handleRegister} />
        </Menu.Menu>
      </Menu>
    </div>
  );
}
