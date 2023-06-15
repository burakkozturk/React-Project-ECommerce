import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const UserService = {
  registerUser,
  loginUser
};

export default UserService;
