import React, { useState } from 'react';
import UserService from '../services/userService';
import { Form, Button } from 'semantic-ui-react'

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    };

    try {
      await UserService.registerUser(newUser);
      const message = `Kullanıcı başarıyla kaydedildi.\nAd: ${newUser.name}\nE-posta: ${newUser.email}`;
      console.log('Kullanıcı başarıyla kaydedildi. Email: ', newUser.email);
      alert(message);
      // Başarılı kayıt işlemi tamamlandıktan sonra yapılacak işlemleri buraya ekleyebilirsiniz.
    } catch (error) {
      console.error('Kullanıcı kaydedilirken bir hata oluştu:', error);
    }
  };
  
  return (
    <div>
      <h2>Kayıt Ol</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Ad:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>E-posta:</label>
          <input type="text" value={email || ""} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Field>
        <Form.Field>
          <label>Şifre:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Field>
        <Button type="submit">Kaydet</Button>
      </Form>
    </div>
  );
}
