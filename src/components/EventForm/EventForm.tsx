import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Container, display } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { themeOptions } from '../Theme/Theme';
import Calendar from '../Calendar/Calendar';
import { getCookie } from '../../utils/cookieUtils';

function EventForm() {
  const defaultTheme = createTheme(themeOptions);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line no-alert
      alert('Vous devez être connectés pour créer un évènement');
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formObj = Object.fromEntries(formData);
    const eventPicture = formObj.event.toString();
    formData.append('event', eventPicture);

    console.log('Je suis le formbobj', formObj);

    // console.log('formObj', formObj);

    axios.post('http://caca-boudin.fr/api/event', formObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    //! important : il faut rediriger vers la page de l'event
    // const id = Cookies.get('id');

    // navigate(`/user/${id}/event/${idEvent}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      Cookies.get('token');
    }
  }, [isAuthenticated]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const startDateReceived = (date: string | null) => {
    console.log('date');
  };

  const endDateReceived = (date: string | null) => {
    console.log('date');
  };

  const handleOwnerId = Cookies.get('id');

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
                Créer mon évènement
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
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
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Theme"
                  label="Thème de l'évènement"
                  type="Theme"
                  id="Theme"
                /> */}
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Lieu"
                  label="Lieu de l'évènement"
                  type="Lieu"
                  id="Lieu"
                /> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description de l'évènement"
                  type="Description"
                  id="description"
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Bannière de l'évènement
                  <VisuallyHiddenInput type="file" id="event" name="event" />
                </Button>
                <Calendar
                  startDateReceived={startDate}
                  endDateReceived={endDate}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="ownerId"
                  name="ownerId"
                  value={handleOwnerId}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="status"
                  name="status"
                  value="true"
                />
                <VisuallyHiddenInput
                  type="input"
                  id="linkProject"
                  name="linkProject"
                  value="google.fr"
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
