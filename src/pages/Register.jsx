import React, { useState } from 'react';
import userService from '../services/userService';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      mail: email,
      password
    };

    try {
      await userService.registerUser(newUser);
      console.log('Kullanıcı başarıyla kaydedildi.');
      // Başarılı kayıt işlemi tamamlandıktan sonra yapılacak işlemleri buraya ekleyebilirsiniz.
    } catch (error) {
      console.error('Kullanıcı kaydedilirken bir hata oluştu:', error);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>E-posta:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Şifre:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
