import api from "./Api";

export const recipeService = {
  async getAll() {
    const response = await api.get("/recipes");
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  async getFormOptions() {
    const [styles, scores] = await Promise.all([
      api.get("/reference-data/styles"),
      api.get("/reference-data/scores"),
    ]);

    return {
      styles: styles.data,
      scores: scores.data,
    };
  },

  async createStyle(name) {
    const response = await api.post("/reference-data/styles", { name });
    return response.data;
  },

  async create(recipe) {
    const response = await api.post("/recipes", recipe);
    return response.data;
  },

  async update(id, recipe) {
    await api.put(`/recipes/${id}`, recipe);
  },

  async remove(id) {
    await api.delete(`/recipes/${id}`);
  },
};
