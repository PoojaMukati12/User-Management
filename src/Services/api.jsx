// src/Services/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://reqres.in/api',
});
