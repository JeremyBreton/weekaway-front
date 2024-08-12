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
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducers/user';
import { getCookie } from '../../utils/cookieUtils';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import NotificationBar from '../NotificationBar/NotificationBar';

const defaultTheme = createTheme(themeOptions);

function SignIn() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogged = useAppSelector((state) => state.user.logged);
  const [showPassword, setShowPassword] = React.useState(false);
  const [valid, setValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData: FormData = new FormData(form);

    // create conditional to check if email and password are not empty
    if (email && password) {
      try {
        await dispatch(login(formData)).unwrap();
      } catch (error: any) {
        dispatch(
          showNotification({
            message: "Oops quelque chose s'est mal passé",
            type: NotificationType.Error,
          })
        );
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

  useEffect(() => {
    if (isLogged) {
      getCookie('token');

      navigate(`/events`);
    }
  }, [isLogged, navigate]);

  const handleValidation = (e) => {
    const reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    setValid(reg.test(e.target.value));
    setPassword(e.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ minHeight: '76vh' }}>
        <CssBaseline />
        <NotificationBar />
        <Box sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}>
          {!isAuthenticated && (
            <Box
              sx={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                [theme.breakpoints.down('sm')]: {
                  marginBottom: 10,
                },
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#f9bc60' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Me connecter
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  width: '100%',
                  backgroundColor: '#004643',
                  color: '#fff',
                  borderRadius: 5,
                  pt: 2,
                  pl: 2,
                }}
              >
                <Typography>
                  Vous pouvez tester en utilisant :
                  <ul>
                    <li>john.doe@example.com</li>
                    <li>ABcd1234!</li>
                  </ul>
                </Typography>
              </Box>
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
                  // autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                <FormControl sx={{ width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => handleValidation(e)}
                    value={password}
                    error={!valid}
                    required
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Mot de passe"
                    aria-describedby="outlined-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                  {!valid && (
                    <FormHelperText id="outlined-helper-text">
                      Le mot de passe doit contenir au moins 8 caratères, 1
                      majuscule et 1 caractère spécial
                    </FormHelperText>
                  )}
                </FormControl>
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
                  <Grid item xs />
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
