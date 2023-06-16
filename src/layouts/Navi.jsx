import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from "../layouts/CartSummary";

const Navi = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUserId(null);
    navigate('/products');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    setLoggedInUser('John Doe');
    setUserId(1);
  };

  return (
    <div>
      <Menu class="ui menu secondary menu" inverted fixed='top' size='massive'>
        <Container>
          <Menu.Item as={Link} to='/' className="active red item custom-font">
            Emek Pazarı
          </Menu.Item>
          <Menu.Item className="item" as={Link} to='/products' name='Ürünler' />
          <Menu.Item as={Link} to='/categories' name='Kategoriler' />
        </Container>
        <Menu.Menu position='right'>
          <CartSummary /> {/* Sepet özeti */}
          {loggedInUser ? (
            <>
              <Menu.Item name='Profil' onClick={handleProfile} />
              <Menu.Item name='Çıkış Yap' onClick={handleLogout} />
            </>
          ) : (
            <>
              <Menu.Item name='Giriş Yap' onClick={handleLogin} as={Link} to='/login' />
              <Menu.Item name='Kayıt Ol' onClick={handleRegister} />
            </>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Navi;
