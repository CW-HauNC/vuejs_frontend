export default function authHeader() {
  let userToken = JSON.parse(localStorage.getItem('token'));
  console.log("userToken: ", userToken);

  if (userToken) {
    return userToken;
  } else {
    return {};
  }
}
