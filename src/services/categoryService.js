import axios from "axios";

export default class CategoryService {
  getCategories() {
    return axios.get("http://localhost:8080/api/category");
  }

  getCategoryById(id) {
    return axios.get("http://localhost:8080/api/category/" + id);
  }

  getCategoryByName(name) {
    return axios.get("http://localhost:8080/api/category?name=" + name);
  }
}