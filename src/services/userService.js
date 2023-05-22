import axios from 'axios';

class UserService {
  registerUser(userData) {
    return axios.post('http://localhost:8080/api/user', userData);
  }

  // Diğer kullanıcı işlemleri metotları buraya eklenebilir
}

export default new UserService();
