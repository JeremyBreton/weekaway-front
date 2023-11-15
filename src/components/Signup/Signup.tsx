import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { themeOptions } from '../Theme/Theme';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import NotificationBar from '../NotificationBar/NotificationBar';
import axiosInstance from '../../utils/axios';

const defaultTheme = createTheme(themeOptions);

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [user, setUser] = useState();
  const [valid, setValid] = useState(true);
  const [mailValid, setMailValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = { firstname, lastname, email, password };
    // userData.email.toLowerCase();
    const data = new FormData(event.currentTarget);
    if (firstname && lastname && email && password) {
      try {
        const response = await axiosInstance.post('/register', userData);
        setUser(response.data);
        navigate('/Signin');
      } catch (e) {
        console.error(e);
      }
    } else {
      dispatch(
        showNotification({
          message: 'Merci de remplir tous les champs',
          type: NotificationType.Error,
        })
      );
    }
  };

  const handleMailValidation = (e) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    setMailValid(reg.test(e.target.value));
    setEmail(e.target.value);
  };

  const handleValidation = (e) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    setValid(reg.test(e.target.value));
    setPassword(e.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{ minHeight: '62vh' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#ABD1C6',
            borderRadius: 5,
            px: 5,
          }}
        >
          <Box
            sx={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <NotificationBar />
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              M'inscrire
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                    value={firstname}
                    onChange={({ target }) => setfirstname(target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastname}
                    onChange={({ target }) => setlastname(target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={!mailValid}
                    helperText={
                      !mailValid && 'Merci de rentrer un email valide'
                    }
                    value={email}
                    onChange={(e) => handleMailValidation(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={!valid}
                    helperText={
                      !valid &&
                      'Le mot de passe doit contenir au moins 8 caratères, 1 majuscule et 1 caractère spécial'
                    }
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => handleValidation(e)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'secondary.main',
                  color: 'text.primary',
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                M'inscrire
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/signin"
                    variant="body2"
                    sx={{ color: 'text.primary' }}
                  >
                    Déjà un compte ? Je me connecte
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
