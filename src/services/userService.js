import axios from "axios";

export default class CategoryService {
  registerUser(userData) {
    return axios.post('http://localhost:8080/api/user', userData);
  }
  
  getUsers() {
    return axios.get('http://localhost:8080/api/user');
  }
}


