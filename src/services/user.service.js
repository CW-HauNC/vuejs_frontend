import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:3000/api/";

class UserService {
  getPosts(title, currentPage, perPage) {
    return axios.get(API_URL + `posts?title=${title}&page=${currentPage}&per_page=${perPage}`, { headers: authHeader() });
  }
}
export default new UserService();
