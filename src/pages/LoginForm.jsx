// Login.js

import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import ProfilePage from './ProfilePage';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await UserService.loginUser(email, password);
      setLoggedInUser(userData.name);
      navigate('/profile'); // Giriş yapıldıktan sonra profil sayfasına yönlendir
    } catch (error) {
      setError('Giriş işlemi başarısız. Lütfen tekrar deneyin.');
    }
  };

  if (loggedInUser) {
    return <ProfilePage name={loggedInUser} />;
  }

  return (
    <Grid textAlign="center" style={{ height: '50vh', marginBottom: '30vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          Giriş Yap
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="red" fluid size="large" onClick={handleLogin}>
              Giriş Yap
            </Button>
          </Segment>
        </Form>
        {error && <Message negative>{error}</Message>}
        <Message color="red">
          Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
