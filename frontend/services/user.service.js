import Router from "next/router";
import axios from "axios";

export const userService = {
  login,
  logout,
  register,
};

function login(email, password) {
  return axios
    .post(`http://localhost:5000/user/login`, {user: { email, password }})
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user.data));
      return user;
    })
    .catch((err) =>{
      return err; 
    });
}

function logout() {
  localStorage.removeItem("user");
  Router.push("/user/login");
}

function register(user) {
  return axios
    .post(`http://localhost:5000/user/register`, {user: {...user}})
    .then((user) => {
      Router.push("/login");
    })
    .catch((err) => alert(err));
}
