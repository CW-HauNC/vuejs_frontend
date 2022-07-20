import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/auth/";
console.log(API_URL);
class AuthService {
  login(user) {
    return axios
      .post(API_URL + "sign_in", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        const userData = response.data.data;
        const accessToken = response.headers["access-token"];
        if (accessToken) {
          userData.accessToken = accessToken;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return userData;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios
      .post(API_URL, {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data.data);
        const accessToken = response.headers["access-token"];
        if (accessToken) {
          const userData = response.data.data;
          userData.accessToken = accessToken;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return response;
      });
  }
}

export default new AuthService();
