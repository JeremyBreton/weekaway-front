import { FormEvent, useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
import { themeOptions } from '../Theme/Theme';

import { getCookie } from '../../utils/cookieUtils';

function JoinEventForm() {
  const defaultTheme = createTheme(themeOptions);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  console.log('isAuthenticated', isAuthenticated);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const id = Cookies.get('id');
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    //! A commenter pour le dev
    const eventtoJoin = { password: formObj.password, id };

    const eventFetched = await axios
      .post('http://caca-boudin.fr/api/joinEvent', eventtoJoin)
      .then((response) => {
        Cookies.set('eventId', response.data.eventId);
        // console.log('je suis ici fraté', response.data);
        return JSON.parse(JSON.stringify(response.data));
      });
    const eventId = Cookies.get('eventId');
    navigate(`/user/${id}/event/${eventId}`);
  };

  //! On peut surement simplifier avec un else ou else if
  useEffect(() => {
    if (isAuthenticated) {
      Cookies.get('token');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line no-alert
      alert('Vous devez être connectés pour créer un évènement');
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
          <CssBaseline />

          <Box sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}>
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
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
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
