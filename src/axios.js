import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://laravel-seopage1.codenixx.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
