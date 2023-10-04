import axios from "axios";

export const api = axios.create({
  baseURL: "https://expense-tracker-api.crystalux.web.id",
});
