import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Select } from 'semantic-ui-react';
import CategoryService from '../services/categoryService';

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryService = new CategoryService();
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        // Kullanıcıları getiren bir işlev kullanılmalı
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchCategories();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yeni ürün bilgileri
    const newProduct = {
      name,
      categoryId,
    };

    // Diğer işlemler...

    // Örneğin, ürünü kaydetmek ve bir sonraki sayfaya yönlendirmek için:
    // productApi.saveProduct(newProduct);
    // navigate('/products');
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    console.log('Seçilen kategori ID:', selectedCategoryId);
  };

  return (
    <div>
      <h2>Yeni Ürün Ekle</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Ürün Adı:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Kategori:</label>
          <select value={categoryId} onChange={handleCategoryChange} required>
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Field>
        <Form.Field>
          <label>Kullanıcı:</label>
          <select>
            <option value="">Kullanıcı Seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
