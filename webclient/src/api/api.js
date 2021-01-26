import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: '/tasks-app/rest/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the authenticated user for any request
  instance.interceptors.request.use(function (config) {
    const authUser = localStorage.getItem('auth_user');
    config.headers.authUser = authUser ? authUser : null;
    return config;
  });

  return instance;
};

export default fetchClient();
