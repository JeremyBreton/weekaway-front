import * as React from 'react';
import { useEffect, useState } from 'react';
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

const defaultTheme = createTheme(themeOptions);

function SignIn() {
  // Ca on en a besoin dans navbar et dans signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { email, password };
    const data = new FormData(event.currentTarget);

    const response = await axios.post(
      'http://geoffrey-fardeau.vpnuser.lan:3000/api/login',
      user
    );

    setUser(response.data);

    localStorage.setItem('user', response.data);

    console.log(response.data);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { email, password };
  //   // send the username and password to the server
  //   const response = await axios.post(
  //     'http://geoffrey-fardeau.vpnuser.lan:3000/api/login',
  //     user
  //   );
  //   // set the state of the user
  //   setUser(response.data);
  //   // store the user in localStorage
  //   localStorage.setItem('user', response.data);
  //   console.log(response.data);
  // };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // if there's a user show the message below
  if (user) {
    return <div>{user} is loggged in</div>;
  }

  // if there's no user, show the login form

  const handleLogout = () => {
    setUser({});
    setEmail('');
    setPassword('');
    localStorage.clear();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
        <CssBaseline />
        <Box
          // height="100vh"
          sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}
        >
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
              Me connecter
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
                value={email}
                onChange={({ target }) => setEmail(target.value)}
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
                value={password}
                onChange={({ target }) => setPassword(target.value)}
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
                  <Link href="#" variant="body2">
                    Je veux m'inscrire
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
