import React, { useState } from 'react';
import { Form, Button, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/userService';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.registerUser(formData);
      const message = `Kullanıcı başarıyla kaydedildi.\nAd: ${formData.name}\nE-posta: ${formData.email}`;
      console.log('Kullanıcı başarıyla kaydedildi. Email: ', formData.email);
      alert(message);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        alert('Zaten bu e-posta kullanılıyor!');
      } else {
        setErrorMessage('Bu e-posta zaten kullanılıyor');
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ height: '50vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Kayıt Ol
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Ad"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-posta adresi"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Şifre"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button color="teal" fluid size="large" type="submit">
              Kaydol
            </Button>
          </Segment>
        </Form>
        {errorMessage && (
          <Message negative>
            <p>{errorMessage}</p>
          </Message>
        )}
        <Message>
          Zaten hesabınız var mı? <Link to="/login">Giriş yap</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
