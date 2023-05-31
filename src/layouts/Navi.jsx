import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
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
      <Menu class="ui menu secondary menu" inverted fixed='top' size='massive'>
        <Container >
          <Menu.Item as={Link} to='/' className="active red item custom-font">
            Emek Pazarı
          </Menu.Item>
          <Menu.Item class="item " as={Link} to='/products' name='Ürünler' />
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
