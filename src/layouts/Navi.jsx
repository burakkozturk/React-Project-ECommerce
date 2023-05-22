import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.PNG';

export default function Navi() {
  const navigate = useNavigate();

  function handleRegister() {
    navigate('/register');
  }

  return (
    <div>
      <Menu inverted fixed='top' size='large'>
        <Container>
          <Menu.Item>
            <img src={logo} alt="Logo" />
          </Menu.Item>
          <Menu.Item name='Ürünler' onClick={() => navigate('/products')} />
          <Menu.Item name='Kategoriler' onClick={() => navigate('/categories')} />
        </Container>
        <Menu.Menu position='right'>
          <Menu.Item name='Kayıt Ol' onClick={handleRegister} />
        </Menu.Menu>
      </Menu>
    </div>
  );
}
