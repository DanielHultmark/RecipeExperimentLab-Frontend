import api from "./Api";

export const accountService = {
  async register(fullName, email, password) {
    const response = await api.post("/account/register", {
      fullName,
      email,
      password,
    });

    return response.data;
  },

  async login(email, password) {
    const response = await api.post("/account/login", {
      email,
      password,
    });

    return response.data;
  },

  async logout() {
    await api.post("/account/logout");
  },

  async getCurrentUser() {
    const response = await api.get("/account/me");
    return response.data;
  },
};