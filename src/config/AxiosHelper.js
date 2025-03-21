import axios from "axios";
export const baseURL = "https://chat-app-backend-rakt.onrender.com"
export const httpClient = axios.create({
  baseURL: baseURL,
});
