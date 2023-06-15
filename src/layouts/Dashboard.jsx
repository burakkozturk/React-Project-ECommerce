import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import CartDetail from '../pages/CartDetail';
import CategoryList from '../pages/CategoryList';
import CategoryDetail from '../pages/CategoryDetail';
import RegisterForm from '../pages/RegisterForm';
import AddProduct from '../pages/AddProduct';
import LoginForm from '../pages/LoginForm';
import ProfilePage from '../pages/ProfilePage';

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (name) => {
    setLoggedIn(true);
    setUsername(name);
  };

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <CategoryList />
          </Grid.Column>
          <Grid.Column width={13}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartDetail />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/:name" element={<CategoryDetail />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route
                path="/login"
                element={<LoginForm onLogin={handleLogin} />}
              />
              <Route
                path="/profile"
                element={
                  loggedIn ? (
                    <ProfilePage username={username} />
                  ) : (
                    <LoginForm onLogin={handleLogin} />
                  )
                }
              />
            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
