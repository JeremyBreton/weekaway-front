import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../../utils/axios';

import { setCookie, removeCookie, getCookie } from '../../utils/cookieUtils'; // Importez les fonctions

interface UserState {
  logged: boolean;
  firstname: string;
  token: string;
}
export const initialState: UserState = {
  logged: false,
  firstname: '',
  token: '',
};

export const logout = createAction('user/logout');

/*
  on peut typer le thunk pour, notamment si on a des calculs
  sur les résultats de l'API, et/ou pour auto-compléter
  le payload de l'action fulfilled

  Plusieurs solutions :
  2. on type le paramètre de la fonction en « interne » +
  on type le retour grâce à `return data as MonType`
*/
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const formObj = Object.fromEntries(formData);
    console.log('formObj', formObj);

    const { data } = await axiosInstance.post('/login', formObj, {
      withCredentials: true,
    });
    console.log('data.user_id', data.user_id);

    if (data.token) {
      // ! JEREMY
      setCookie('token', data.token, { expires: 1 });
      setCookie('id', data.user_id);
      console.log('je suis le cookie id', getCookie('id'));
    }

    // Dès que j'ai le JWT, je l'ajoute à mon instance Axios :
    // toutes mes prochaines requêtes l'auront (et l'enverront)
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    // console.log(
    //   'axiosInstance',
    //   axiosInstance.defaults.headers.common.Authorization
    // );
    // le token n'est plus nécessaire ici, je le supprime de mes données
    // delete data.token;
    console.log('data', data);
    return data as UserState;
    // return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.logged = action.payload.logged;
      state.firstname = action.payload.firstname;
      state.token = action.payload.token;
      // ! JEREMY
      setCookie('token', action.payload.token, { expires: 1 });
      // Cookies.set('token', action.payload.token);
      // ! JEREMY
      console.log('je suis le token', state.token);
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.firstname = '';
      state.token = '';
      // on supprime le token de l'instance Axios
      delete axiosInstance.defaults.headers.common.Authorization;
      removeCookie('token');
      removeCookie('id');
      // Cookies.remove('isLogged');
    });
});

export default userReducer;
