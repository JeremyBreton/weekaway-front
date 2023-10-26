import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { login, logout } from '../../store/reducers/user';

const defaultTheme = createTheme(themeOptions);

// function SignIn() {
// // Ca on en a besoin dans navbar et dans signin
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [user, setUser] = useState();

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   const user = { email, password };
//   const data = new FormData(event.currentTarget);

//   const response = await axios.post(
//     'http://geoffrey-fardeau.vpnuser.lan:3000/api/login',
//     user
//   );

//   setUser(response.data);

//   console.log(response.data);
//   console.log({
//     email: data.get('email'),
//     password: data.get('password'),
//   });
// };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   const user = { email, password };
// //   // send the username and password to the server
// //   const response = await axios.post(
// //     'http://geoffrey-fardeau.vpnuser.lan:3000/api/login',
// //     user
// //   );
// //   // set the state of the user
// //   setUser(response.data);
// //   // store the user in localStorage
// //   localStorage.setItem('user', response.data);
// //   console.log(response.data);
// // };

// // if there's a user show the message below
// if (user) {
//   return <div>{user} is loggged in</div>;
// }

// // if there's no user, show the login form

// const handleLogout = () => {
//   setUser({});
//   setEmail('');
//   setPassword('');
//   localStorage.clear();
// };

interface LoginFormProps {
  handleLogout: () => void;
}

function SignIn() {
  const isLogged = useAppSelector((state) => state.user.logged);
  console.log(isLogged);

  const navigate = useNavigate();

  const firstname = useAppSelector((state) => state.user.firstname);
  console.log(firstname);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // je vais dispatcher un thunk pour contacter mon API avec les identifiants
    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };

  // Si l'utilisateur est connecté, effectuez la redirection ici
  if (isLogged) {
    navigate('/events');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
        <CssBaseline />

        <Box
          // height="100vh"
          sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}
        >
          {isLogged && (
            <Box sx={{ mt: 60 }}>
              <Typography>Bienvenue {firstname}, tu es connecté !</Typography>
              <Button onClick={handleLogout}>me déconnecter</Button>
            </Box>
          )}
          {!isLogged && (
            <Box
              sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#f9bc60' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Me connecter test@testeur.fr Testsauvage1!
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // value={}
                  // onChange={({ target }) => setEmail(target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  // value={}
                  // onChange={({ target }) => setPassword(target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#f9bc60',
                    color: '#001E1D',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  Me connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      Je veux m'inscrire
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
