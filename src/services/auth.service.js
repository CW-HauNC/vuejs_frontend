import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/auth/';
console.log(API_URL);
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'sign_in', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log('1111111')
        const userData = response.data.data
        const accessToken = response.headers['access-token']
        if (accessToken) {
          const userData = response.data.data
          console.log('xxxx')
          userData.accessToken = accessToken
          localStorage.setItem('user', JSON.stringify(userData));
          // console.log(localStorage)
        }
        console.log(response.data.data)
        return userData;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
