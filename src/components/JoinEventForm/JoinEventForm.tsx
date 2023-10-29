import { FormEvent, useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch } from '../../hooks/redux';

import { getCookie } from '../../utils/cookieUtils';

function JoinEventForm() {
  const defaultTheme = createTheme(themeOptions);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Vous devez être connectés pour créer un évènement');
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // je vais dispatcher un thunk pour contacter mon API avec les identifiants
    const form = event.currentTarget;
    const id = Cookies.get('id');
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    const eventtoJoin = { password: formObj.password, id };

    axios.post('http://caca-boudin.fr/api/joinEvent', eventtoJoin);
    //! important : il faut rediriger vers la page de l'event
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Cookies.set('isLogged', 'true');
      Cookies.get('token');
      // navigate('/events');
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
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
              <Typography component="h1" variant="h5">
                Rejoindre un évènement
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
                  id="password"
                  label="Code secret"
                  name="password"
                  autoFocus
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
                  Rejoindre l'évènement
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default JoinEventForm;
