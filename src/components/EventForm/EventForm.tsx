import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Calendar from '../Calendar/Calendar';
import { getCookie } from '../../utils/cookieUtils';

function EventForm() {
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
    const formData = new FormData(form);
    dispatch(event(formData));
  };

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

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
                Créer mon évènement
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
                  id="name"
                  label="Nom de l'évènement"
                  name="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Theme"
                  label="Thème de l'évènement"
                  type="Theme"
                  id="Theme"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Lieu"
                  label="Lieu de l'évènement"
                  type="Lieu"
                  id="Lieu"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Description"
                  label="Description de l'évènement"
                  type="Description"
                  id="Description"
                />
                <Calendar />
                {/* <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              /> */}
                {/* <Calendar /> */}
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
                  Créer mon évènement
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default EventForm;
