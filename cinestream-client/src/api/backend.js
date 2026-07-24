import { apiRequest } from "./http";

export const backend = {
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: payload }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: payload }),
  profile: (token) => apiRequest("/users/profile", { token }),
  updateProfile: (token, payload) => apiRequest("/users/profile", { method: "PUT", token, body: payload }),
  changePassword: (token, payload) => apiRequest("/users/change-password", { method: "PUT", token, body: payload }),
  uploadAvatar: (token, file) => {
    const form = new FormData();
    form.append("avatar", file);
    return apiRequest("/users/avatar", { method: "PUT", token, body: form });
  },
  getFavorites: (token) => apiRequest("/favorites", { token }),
  addFavorite: (token, movieId) => apiRequest("/favorites", { method: "POST", token, body: { movieId } }),
  removeFavorite: (token, movieId) => apiRequest(`/favorites/${movieId}`, { method: "DELETE", token }),
  getWatchlist: (token) => apiRequest("/watchlist", { token }),
  addWatchlist: (token, movieId) => apiRequest("/watchlist", { method: "POST", token, body: { movieId } }),
  removeWatchlist: (token, movieId) => apiRequest(`/watchlist/${movieId}`, { method: "DELETE", token }),
  getHistory: (token) => apiRequest("/history", { token }),
  addHistory: (token, payload) => apiRequest("/history", { method: "POST", token, body: payload }),
  removeHistory: (token, movieId) => apiRequest(`/history/${movieId}`, { method: "DELETE", token }),
  getReviews: (movieId) => apiRequest(`/reviews/${movieId}`),
  addReview: (token, payload) => apiRequest("/reviews", { method: "POST", token, body: payload }),
  removeReview: (token, movieId) => apiRequest(`/reviews/${movieId}`, { method: "DELETE", token }),

  chatWithAI: (message) => apiRequest("/ai/chat", { method: "POST", body: { message } }),
};
