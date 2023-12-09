import apiClient from "./api-client";

export function getAccessToken() {
  return localStorage.getItem("user-token");
}

export function putAccessToken(accessToken) {
  return localStorage.setItem("user-token", accessToken);
}

export function deleteAccessToken() {
  localStorage.removeItem("user-token");
}

export function getUserInfo() {
  return localStorage.getItem("user-info");
}

export function putUserInfo(userInfo) {
  return localStorage.setItem("user-info", userInfo);
}

export function deleteUserInfo() {
  localStorage.removeItem("user-info");
}

export async function login({ email, password }) {
  try {
    const { data } = await apiClient.post("login", { email, password });

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function register({ name, email, password }) {
  try {
    await apiClient.post("register", { name, email, password });

    return { error: false };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function getUserLogged() {
  try {
    const { data } = await apiClient.get("users/me");

    return { error: false, data: data.data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}
