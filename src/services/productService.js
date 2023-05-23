import axios from "axios";

export default class ProductService {
  getProducts() {
    return axios.get("http://localhost:8080/api/products");
  }

  getProductById(id) {
    return axios.get("http://localhost:8080/api/products/" + id);
  }

  getProductsByCategoryName(categoryName) {
    return axios.get("http://localhost:8080/api/products?categoryName=" + categoryName);
  }
  
  addProduct(productData) {
    return axios.post('http://localhost:8080/api/products', productData);
  }
}
