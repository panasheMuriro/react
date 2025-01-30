import httpClient from "./httpClient";

export const register = async (name, email, password) => {
  return httpClient.post("/auth/register", { name, email, password });
};

export const login = async (name, email, password) => {
  return httpClient.post("/auth/login", { name, email, password });
};

export const refreshAccessToken = async () => {
  return httpClient.post("/auth/refresh");
};

export const logout = async () => {
  return httpClient.post("/auth/logout");
};
