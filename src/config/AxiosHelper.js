import axios from "axios";
export const baseURL = "https://chat-springboot-1.onrender.com"
export const httpClient = axios.create({
  baseURL: baseURL,
});
