import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,  // Use the base URL from the environment variable
});

export default instance;
