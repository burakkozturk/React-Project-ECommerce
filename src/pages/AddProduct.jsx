import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Select, Input } from 'semantic-ui-react';
import CategoryService from '../services/categoryService';
import ProductService from '../services/productService';

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [categories, setCategories] = useState([]);

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

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yeni ürün bilgileri
    const newProduct = {
      name,
      categoryId,
      userId,
      price,
      description,
      photoUrl,
    };

    try {
      const productService = new ProductService();
      const response = await productService.addProduct(newProduct);

      console.log('Yeni ürün:', response.data); // Kaydedilen ürünü kontrol etmek için

      // Kaydetme işlemi başarılı olduğunda bir sonraki sayfaya yönlendirilebilir
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCategoryChange = (e, { value }) => {
    setCategoryId(value);
    console.log('Seçilen kategori ID:', value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    console.log('Kullanıcı ID:', e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log('Fiyat:', e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log('Açıklama:', e.target.value);
  };

  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value);
    console.log('Fotoğraf URL:', e.target.value);
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
          <Select
            placeholder="Kategori Seçin"
            options={categories.map((category) => ({
              key: category.id,
              value: category.id,
              text: category.name,
            }))}
            value={categoryId}
            onChange={handleCategoryChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Kullanıcı ID:</label>
          <Input type="text" value={userId} onChange={handleUserIdChange} required />
        </Form.Field>
        <Form.Field>
          <label>Fiyat:</label>
          <Input type="number" value={price} onChange={handlePriceChange} required />
        </Form.Field>
        <Form.Field>
          <label>Açıklama:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </Form.Field>
        <Form.Field>
          <label>Fotoğraf URL:</label>
          <Input type="text" value={photoUrl} onChange={handlePhotoUrlChange} required />
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
