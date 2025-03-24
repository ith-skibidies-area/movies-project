import { jwtDecode } from "jwt-decode";

export const tokenKey = "accessToken";

export const userLoggin = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

export const userLoggout = () => {
  localStorage.removeItem(tokenKey);
};

export const userLogged = () => {
  return Boolean(localStorage.getItem(tokenKey));
};

export const getLoggedUser = (): { role: string; username: string } | null => {
  const token = localStorage.getItem(tokenKey);
  if (!token) return null;
  const data = jwtDecode<{
    sub: string;
    role: string;
  }>(token);
  return { role: data.role, username: data.sub };
};

export const adminLogged = () => {
  const loggedUser = getLoggedUser();
  return loggedUser ? loggedUser.role === "admin" : false;
};
