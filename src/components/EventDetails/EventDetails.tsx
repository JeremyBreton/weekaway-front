import {
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts';
import { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../Theme/Theme';
import Calendar from '../Calendar/Calendar';
import { fetchOneEvent } from '../../store/reducers/events';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import Loading from '../Loading/Loading';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import NotificationBar from '../NotificationBar/NotificationBar';
import { getCookie } from '../../utils/cookieUtils';
import axiosInstance from '../../utils/axios';

function EventDetails() {
  const theme = useTheme();
  const [isAuthenticated] = useState(!!getCookie('token'));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  // Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const defaultTheme = createTheme(themeOptions);

  const { idEvent } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const OneEvent = useAppSelector((state) => state.events.oneEvent);
  const loading = useAppSelector((state) => state.events.loading);

  // Verify if user is authenticated, if not show error message and redirect to signin page
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

  useEffect(() => {
    dispatch(fetchOneEvent());
  }, [dispatch]);

  // console.log('OneEvent dans eventDetails', OneEvent);

  // VisuallyHiddenInput component
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

  // function to get the date from the child component

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

    // error handling
    if (startDate && endDate) {
      try {
        axiosInstance
          .post('userchoice', formObj, {
            withCredentials: false,
          })
          .then((response) => {
            return JSON.parse(JSON.stringify(response.data));
          });
        dispatch(
          showNotification({
            message: 'Votre date a bien été ajoutée',
            type: NotificationType.Success,
          })
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
          message: "Oops quelque chose s'est mal passé",
          type: NotificationType.Error,
        })
      );
    }
  };

  // decode token to get user id

  const token = Cookies.get('token');
  const decoded = jwtDecode(token);

  const handleUserId = decoded.id;

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #004643',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    // error handling

    if (formObj.email !== '') {
      try {
        await axiosInstance.post('/inviteLink', formObj, {
          withCredentials: false,
        });

        dispatch(
          showNotification({
            message: 'Votre invité a bien été ajouté',
            type: NotificationType.Success,
          })
        );
        setOpen(false);
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
          message: "Oops quelque chose s'est mal passé",
          type: NotificationType.Error,
        })
      );
      setOpen(false);
    }
  };

  const handleDeleteValidation = async (event) => {
    event.preventDefault();
    await axiosInstance.delete(`/event/${idEvent}`);
    navigate('/events');
  };

  const handleDeleteEvent = (event) => {
    event.preventDefault();
    handleOpenDeleteModal();
  };

  // Create condition to show loading component
  if (loading) {
    setTimeout(() => {}, 1000);

    return <Loading />;
  }

  // Create condition to show the chart with userChoices & numberVote
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
        <Container component="main" sx={{ minHeight: '62vh' }}>
          <CssBaseline />
          <NotificationBar />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: 'background.default',
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
                width: '90%',
                [theme.breakpoints.down('md')]: {
                  width: '100%',
                  my: 10,
                },
                [theme.breakpoints.down('sm')]: {
                  my: 5,
                },
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
                  [theme.breakpoints.down('md')]: {
                    width: '90%',
                  },
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
                  [theme.breakpoints.down('md')]: {
                    width: '90%',
                  },
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
                  mt: 3,
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
                <Box
                  sx={{
                    width: '90%',
                    display: 'flex',
                    m: 0,
                    [theme.breakpoints.down('md')]: {
                      width: '90%',
                      m: 0,
                    },
                  }}
                >
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
                    // style={{ maxWidth: '100%' }}
                    height={500}
                  />
                </Box>
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
                    onClick={handleDeleteEvent}
                  >
                    Delete
                  </Button>
                  <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 3 }}
                      >
                        Etes vous sur de voulour supprimer cet évènement ?
                      </Typography>
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
                        onClick={handleDeleteValidation}
                      >
                        Je veux supprimer cet évènement
                      </Button>
                    </Box>
                  </Modal>

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
                        sx={{
                          mb: 3,
                        }}
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
      <Container component="main" sx={{ minHeight: '60vh' }}>
        <CssBaseline />
        <NotificationBar />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            pt: 11,
            [theme.breakpoints.down('md')]: {
              pt: 0,
            },
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
              width: '100%',
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
                  onClick={handleDeleteEvent}
                >
                  Delete
                </Button>
                <Modal
                  open={openDeleteModal}
                  onClose={handleCloseDeleteModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ mb: 3 }}
                    >
                      Etes vous sur de voulour supprimer cet évènement ?
                    </Typography>
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
                      onClick={handleDeleteValidation}
                    >
                      Je veux supprimer cet évènement
                    </Button>
                  </Box>
                </Modal>
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
