import * as usersAPI from "../api/users";
import { getToken, removeToken } from "../util/security";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  return token;
}

export async function getLoginDetails(email) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const loginDetails = await usersAPI.getLoginDetails(email);
  // Baby step by returning whatever is sent back by the server
  return loginDetails;
}

export async function loginUser(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const res = await usersAPI.loginUser(userData);
  // Baby step by returning whatever is sent back by the server
  return res;
}

export async function logoutUser() {
  const token = getToken();
  if (token) {
    const res = await usersAPI.logoutUser(
      token,
      JSON.parse(atob(token.split(".")[1])).payload
    );
    removeToken();
    return res;
  }
}
