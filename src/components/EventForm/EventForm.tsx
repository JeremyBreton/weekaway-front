import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Container, useTheme } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';
import { themeOptions } from '../Theme/Theme';
import Calendar from '../Calendar/Calendar';
import { getTokenId, getCookie } from '../../utils/cookieUtils';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import { useAppDispatch } from '../../hooks/redux';
import NotificationBar from '../NotificationBar/NotificationBar';
import axiosInstance from '../../utils/axios';

function EventForm() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const [fileChange, setFileChange] = useState<File>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fileToSend = fileChange;

    // modify formData to send everything we need to the backend
    const eventPicture = fileToSend as unknown as string;
    formData.append('event', eventPicture);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    const formObj = Object.fromEntries(formData);

    // error handling
    if (formObj) {
      try {
        await axiosInstance
          .post('/event', formObj, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            Cookies.set('eventId', response.data.id);
            navigate(`/event/${response.data.id}`);
          });
      } catch (e) {
        console.error(e);
        dispatch(
          showNotification({
            message: 'Merci de remplir tous les champs',
            type: NotificationType.Error,
          })
        );
      }
    }
  };
  // visually hidden input
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

  // functions to get startDate and endDate from Calendar component and format them
  const startDateReceived = (date: string | null) => {
    const formattedStartDate = dayjs(date).format('YYYY-MM-DD HH:mm:ssZ');
    setStartDate(formattedStartDate);
    // console.log('cest la date de début dans le parent', formattedStartDate);
  };

  // console.log('startDateReceived', startDateReceived);

  const endDateReceived = (date: string | null) => {
    const formattedEndDate = dayjs(date).format('YYYY-MM-DD HH:mm:ssZ');
    // console.log('cest la date de fin dans le parent', formattedEndDate);
    setEndDate(formattedEndDate);
  };
  let handleOwnerId = '';
  if (isAuthenticated) {
    handleOwnerId = getTokenId();
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            minHeight: '76vh',
          }}
        >
          <CssBaseline />
          <NotificationBar />

          <Box
            sx={{
              backgroundColor: '#ABD1C6',
              borderRadius: 5,
              px: 5,
              mb: 8,
            }}
          >
            <Box
              sx={{
                mt: 15,
                mb: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2,
                [theme.breakpoints.down('sm')]: {
                  mt: 8,
                },
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
                  width: '100%',
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="theme"
                  label="Thème de l'évènement"
                  id="theme"
                />
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
                  multiline
                  rows={3}
                  name="description"
                  label="Description de l'évènement"
                  type="Description"
                  id="description"
                />
                <Calendar
                  startDateReceived={startDateReceived}
                  endDateReceived={endDateReceived}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Bannière de l'évènement
                  <VisuallyHiddenInput
                    type="file"
                    id="event"
                    name="event"
                    onChange={(e) => setFileChange(e.target.files[0])}
                  />
                </Button>
                <TextField
                  margin="normal"
                  fullWidth
                  name="event"
                  type="text"
                  id="event"
                  sx={{ bgcolor: '#ABD1C6', color: 'black', focus: 'none' }}
                  placeholder={fileChange?.name}
                  disabled
                />
                <VisuallyHiddenInput
                  type="input"
                  id="owner_id"
                  name="owner_id"
                  defaultValue={handleOwnerId}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="status"
                  name="status"
                  defaultValue="true"
                />
                <VisuallyHiddenInput
                  type="input"
                  id="startDate"
                  name="startDate"
                  defaultValue={startDate}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="endDate"
                  name="endDate"
                  defaultValue={endDate}
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
