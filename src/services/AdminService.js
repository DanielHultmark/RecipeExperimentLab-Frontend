import api from "/api";

export const adminService = {
  async getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async updateRole(userId, role) {
    await api.put(`/admin/users/${userId}/role`, {
      role,
    });
  },
};