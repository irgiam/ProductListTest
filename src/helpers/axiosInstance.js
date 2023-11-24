import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', //belum pakai env
});

axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (
      error?.response?.status === 403 ||
      (error?.response?.status === 401 &&
        error?.response?.data?.error?.message ===
          'commonauth.VerifyTokenMiddleware: token verification failed')
    ) {
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
