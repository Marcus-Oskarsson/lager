import config from "../.config/config.json";
import storage from "./storage";

const auth = {
  loggedIn: async function loggedIn() {
    const tokenAndDate: any = await storage.readToken();
    const twentyFourHours = 1000 * 60 * 60 * 24;
    const notExpired = new Date().getTime() - twentyFourHours < 0;
    return tokenAndDate.token && notExpired;
  },
  register: async function register(email: string, password: string) {
    const data = {
      api_key: config.API_KEY,
      email: email,
      password: password,
    };
    const response = await fetch(`${config.BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  },
  login: async function login(email: string, password: string) {
    const data = {
      api_key: config.API_KEY,
      email: email,
      password: password,
    };
    const response = await fetch(`${config.BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    await storage.storeToken(result.data.token);
    return result.data.message;
  },
  logut: async function logut() {
    await storage.deleteToken();
  },
};

export default auth;
