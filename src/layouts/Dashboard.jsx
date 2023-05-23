import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import CartDetail from '../pages/CartDetail';
import CategoryList from '../pages/CategoryList';
import CategoryDetail from '../pages/CategoryDetail';
import Register from '../pages/Register';
import AddProduct from '../pages/AddProduct'; // Yeni eklendi
import UserList from '../pages/UserList';

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <CategoryList />
          </Grid.Column>
          <Grid.Column width={12}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartDetail />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/:name" element={<CategoryDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-product" element={<AddProduct />} /> {/* Yeni eklendi */}
              <Route path="/userlist" element={<UserList />} /> {/* Yeni eklendi */}

            </Routes>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
