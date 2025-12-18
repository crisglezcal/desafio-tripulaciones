// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_LLM,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // AÑADIDO
});

export default api;