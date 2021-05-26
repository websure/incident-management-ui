/*
  Return axios instance
*/
import axios from 'axios';

const defaultSettings = {
  withCredentials: false,
  timeout: 60000,
  baseURL: 'http://localhost:5000/api/v1',
};
const instance = axios.create({ ...defaultSettings });

instance.interceptors.request.use(
  (config) =>
  /* Add logic to add/update request headers */
  ({
    ...config,
    headers: {
      ...config.headers,
      authorization: 'frt53.oifh.hg6tr',
    },
    responseType: 'json',
  }),
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    /* Add logic to play with response */
    console.log('response ', response.data);
    return response.data;
  },

  (error) => Promise.reject(error.response.data),
);

export default instance;
