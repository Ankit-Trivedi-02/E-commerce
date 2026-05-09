import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
