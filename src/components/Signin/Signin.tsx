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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { login } from '../../store/reducers/user';
import { getCookie } from '../../utils/cookieUtils';

const defaultTheme = createTheme(themeOptions);

function SignIn() {
  // ! JEREMY
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  console.log('isAuthenticated', isAuthenticated);
  const isLogged = useAppSelector((state) => state.user.logged);
  console.log('isLogged', isLogged);
  // ! JEREMY

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // console.log('form', form);
    // console.log('formData', formData);

    dispatch(login(formData));
  };
  console.log('isLogged', isLogged);
  useEffect(() => {
    if (isLogged) {
      getCookie('token');
      const id = getCookie('id');
      // //! important Needs to be debugged

      navigate(`/user/${id}/events`);
    }
  }, [isLogged, navigate]);
  // ! JEREMY
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     alert('Vous êtes connectés !');
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);
  // ! JEREMY

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
        <CssBaseline />

        <Box sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}>
          {!isAuthenticated && (
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
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
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
                    {/* <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
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
