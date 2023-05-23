import axios from 'axios';

class UserService {
  registerUser(userData) {
    return axios.post('http://localhost:8080/api/user', userData);
  }

  getUsers() {
    return axios.get('http://localhost:8080/api/user');
  }

  // Diğer kullanıcı işlemleri metotları buraya eklenebilir
}

export default new UserService();