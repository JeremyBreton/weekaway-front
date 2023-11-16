import { FormEvent, useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, Typography } from '@mui/material';
import { Box, Container, useTheme } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { themeOptions } from '../Theme/Theme';
import { getTokenId, getCookie } from '../../utils/cookieUtils';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import { useAppDispatch } from '../../hooks/redux';
import NotificationBar from '../NotificationBar/NotificationBar';
import axiosInstance from '../../utils/axios';

function JoinEventForm() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const id = getTokenId();
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    // create object to send to backend
    const eventtoJoin = { password: formObj.password, id };

    // error handling
    if (formObj.password !== '') {
      try {
        await axiosInstance.post('/joinEvent', eventtoJoin).then((response) => {
          Cookies.set('eventId', response.data.eventId, {
            withCredentials: false,
          });

          // console.log('je suis ici fraté', response.data);
          if (response.data.eventId) {
            const eventId = Cookies.get('eventId');
            navigate(`/event/${eventId}`);
          } else if (response.data.eventId === undefined) {
            dispatch(
              showNotification({
                message: "Oops quelque chose s'est mal passé !",
                type: NotificationType.Error,
              })
            );
          }
          return JSON.parse(JSON.stringify(response.data));
        });
      } catch (e) {
        console.error(e);
        dispatch(
          showNotification({
            message: "Oops quelque chose s'est mal passé !",
            type: NotificationType.Error,
          })
        );
      }
    } else {
      dispatch(
        showNotification({
          message: "Oops quelque chose s'est mal passé !",
          type: NotificationType.Error,
        })
      );
    }
  };

  // verify if user is authenticated and redirect to signin if not with a notification
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(
        showNotification({
          message: 'Vous devez être connecté !',
          type: NotificationType.Error,
        })
      );
      navigate('/signin');
    } else {
      Cookies.get('token');
    }
  }, [dispatch, isAuthenticated, navigate]);
  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '76vh' }}>
          <CssBaseline />
          <NotificationBar />

          <Box sx={{ backgroundColor: '#ABD1C6', borderRadius: 5, px: 5 }}>
            <Box
              sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                [theme.breakpoints.down('md')]: {
                  marginTop: 10,
                  // marginBottom: 0,
                },
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
