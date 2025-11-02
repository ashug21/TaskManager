import axios from "axios";

export const api = axios.create({
  baseURL: "https://taskmanager-7sxx.onrender.com", // your Render backend URL
  withCredentials: false, // no cookies/session for now
});
