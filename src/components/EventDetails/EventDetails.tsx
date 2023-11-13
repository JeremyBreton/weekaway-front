import {
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { jwtDecode } from 'jwt-decode';
import { themeOptions } from '../Theme/Theme';
import Calendar from '../Calendar/Calendar';
import { fetchOneEvent } from '../../store/reducers/events';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import Loading from '../Loading/Loading';

function EventDetails() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultTheme = createTheme(themeOptions);

  const { idEvent } = useParams();
  const dispatch = useAppDispatch();

  const OneEvent = useAppSelector((state) => state.events.oneEvent);
  const loading = useAppSelector((state) => state.events.loading);

  useEffect(() => {
    // Crée un state isLoading
    // console.log('JE SUIS UN USEEFFECT');
    dispatch(fetchOneEvent());
    // Changer le status de isLoading
  }, [dispatch]);

  // console.log('OneEvent dans eventDetails', OneEvent);

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

  const endDateReceived = (date: string | null) => {
    const formattedEndDate = dayjs(date).format('YYYY-MM-DD HH:mm:ssZ');
    // console.log("c'est la date de fin dans EventDetails", formattedEndDate);
    setEndDate(formattedEndDate);
  };

  const startDateReceived = (date: string | null) => {
    const formattedStartDate = dayjs(date).format('YYYY-MM-DD HH:mm:ssZ');
    setStartDate(formattedStartDate);
    // console.log("c'est la date de début dans le parent", formattedStartDate);
  };

  const handleSubmitAddUserChoice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    axios
      .post('http://caca-boudin.fr/api/userchoice', formObj)
      .then((response) => {
        return JSON.parse(JSON.stringify(response.data));
      });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const token = Cookies.get('token');
  const decoded = jwtDecode(token);

  const handleUserId = decoded.id;

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    axios.post('http://caca-boudin.fr/api/inviteLink', formObj);
    setOpen(false);
  };

  // Créer une condition qui retourne soit l'un soit l'autre suivant le state de isLoading
  if (loading) {
    setTimeout(() => {}, 1000);

    return <Loading />;
  }

  //! A commenter
  if (!OneEvent.eventDetails.users.includes(null)) {
    const numberVote = OneEvent.eventDetails.numberVote.map(
      (vote: any) => vote
    );

    const userChoice = OneEvent.eventDetails.userChoice.map(
      (date) =>
        `${dayjs(date.start_date_choice).format('DD-MM-YYYY')}-${dayjs(
          date.end_date_choice
        ).format('DD-MM-YYYY')}`
    );

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: 'background.default',
              pt: 8,
              minHeight: '100vh',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#ABD1C6',
                borderRadius: 2,
                my: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vh',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={OneEvent.eventDetails.picture}
                alt="banniere de l'évènement"
                sx={{
                  objectFit: 'cover',
                  mb: 5,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#004643',
                  color: 'secondary.main',
                  borderRadius: 2,
                  py: 2,
                  my: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  {OneEvent.eventDetails.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#004643',
                  color: 'secondary.main',
                  borderRadius: 2,
                  p: 3,
                  my: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  {OneEvent.eventDetails.description}
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmitAddUserChoice}
                noValidate
                sx={{
                  mt: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Calendar
                  startDateReceived={startDateReceived}
                  endDateReceived={endDateReceived}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="userId"
                  name="userId"
                  defaultValue={handleUserId}
                />
                <VisuallyHiddenInput
                  type="input"
                  id="eventId"
                  name="eventId"
                  defaultValue={idEvent}
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
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, mb: 5, color: 'secondary.main' }}
                >
                  Valider mes dates
                </Button>
              </Box>
              {!OneEvent.eventDetails.users.includes(null) && (
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      // data: ['22/05/24-26/05/24', '29/05/24', '06/06/24'],

                      data: userChoice.map((date: any) => date),

                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      // data: [2, 15, 3],
                      data: numberVote,
                      color: '#004643',
                    },
                  ]}
                  width={800}
                  height={800}
                />
              )}
              {OneEvent.eventDetails.owner_id == handleUserId && (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ mt: 2, mb: 5, color: 'secondary.main' }}
                  >
                    Ajouter des invités
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{
                      mb: 2,
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: '#e16162',
                        color: '#001E1D',
                      },
                    }}
                  >
                    Delete
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Ajouter des invités
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
                          id="email"
                          label="Email de l'invité"
                          name="email"
                          autoFocus
                        />
                        <VisuallyHiddenInput
                          type="input"
                          id="eventId"
                          name="eventId"
                          defaultValue={idEvent}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, color: 'secondary.main' }}
                        >
                          Valider
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            pt: 11,
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ABD1C6',
              borderRadius: 2,
              // px: 5,
              my: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vh',
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={OneEvent.eventDetails.picture}
              alt="banniere de l'évènement"
              sx={{
                objectFit: 'cover',
                mb: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            />
            <Box
              sx={{
                backgroundColor: '#004643',
                color: 'secondary.main',
                borderRadius: 2,
                py: 2,
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{ textAlign: 'center', mb: 2 }}
              >
                {OneEvent.eventDetails.name}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#004643',
                color: 'secondary.main',
                borderRadius: 2,
                py: 2,
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '60%',
              }}
            >
              <Typography sx={{ textAlign: 'center', mb: 5 }}>
                {OneEvent.eventDetails.description}
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmitAddUserChoice}
              noValidate
              sx={{
                mt: 1,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Calendar
                startDateReceived={startDateReceived}
                endDateReceived={endDateReceived}
              />
              <VisuallyHiddenInput
                type="input"
                id="userId"
                name="userId"
                defaultValue={handleUserId}
              />
              <VisuallyHiddenInput
                type="input"
                id="eventId"
                name="eventId"
                defaultValue={idEvent}
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
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 5, color: 'secondary.main' }}
              >
                Valider mes dates
              </Button>
            </Box>
            {OneEvent.eventDetails.owner_id == handleUserId && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{ mt: 2, mb: 5, color: 'secondary.main' }}
                >
                  Ajouter des invités
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: '#e16162',
                      color: '#001E1D',
                    },
                  }}
                >
                  Delete
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Ajouter des invités
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
                        id="email"
                        label="Email de l'invité"
                        name="email"
                        autoFocus
                      />
                      <VisuallyHiddenInput
                        type="input"
                        id="eventId"
                        name="eventId"
                        defaultValue={idEvent}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, color: 'secondary.main' }}
                      >
                        Valider
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default EventDetails;
