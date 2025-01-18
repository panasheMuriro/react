import httpClient from './httpClient';

export const register = async (email, password) => {
  return httpClient.post('/auth/register', { email, password });
};

export const login = async (email, password) => {
  return httpClient.post('/auth/login', { email, password });
};

export const refreshAccessToken = async () => {
  return httpClient.post('/auth/refresh');
};

export const logout = async () => {
  return httpClient.post('/auth/logout');
};
