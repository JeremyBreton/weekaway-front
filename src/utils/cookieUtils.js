import Cookies from 'js-cookie';
import * as Decode from 'jwt-decode';

export const setCookie = (name, value, options) => {
  Cookies.set(name, value, options);
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};

export const getTokenId = () => {
  const token = Cookies.get('token');
  const decode = Decode.jwtDecode(token);
  return decode.id;
};