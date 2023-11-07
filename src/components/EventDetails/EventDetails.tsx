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
import { themeOptions } from '../Theme/Theme';
import Calendar from '../Calendar/Calendar';
import { fetchOneEvent } from '../../store/reducers/events';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

function EventDetails() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dispatch = useAppDispatch();
  const defaultTheme = createTheme(themeOptions);
  const { idEvent } = useParams();

  const OneEvent = useAppSelector((state) => state.events.oneEvent);
  console.log('OneEvent dans eventDetails', OneEvent);
  // console.log(
  //   'OneEvent.dates_of_event dans eventDetails',
  //   OneEvent.dates_of_event
  // );
  // const oneEvent = eventsArray.filter(
  //   (event) => event.eventId.toString() === idEvent
  // );

  // console.log('OneEvent', oneEvent);
  // const monevent = Cookies.get('eventId');

  // function handleClickAddUserChoice(
  //   event: MouseEvent<HTMLButtonElement, MouseEvent>
  // ): void {
  //   console.log('handleClickAddUserChoice');
  // }

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
    console.log("c'est la date de fin dans EventDetails", formattedEndDate);
    setEndDate(formattedEndDate);
  };

  const startDateReceived = (date: string | null) => {
    const formattedStartDate = dayjs(date).format('YYYY-MM-DD HH:mm:ssZ');
    setStartDate(formattedStartDate);
    console.log("c'est la date de début dans le parent", formattedStartDate);
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
  };

  const dataToDisplay = OneEvent.eventDetails;

  const handleUserId = Cookies.get('id');

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

    axios.post('http://caca-boudin.fr/api/inviteLink', formObj);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchOneEvent());
  }, [dispatch]);

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
              borderRadius: 5,
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
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  // data: ['22/05/24-26/05/24', '29/05/24', '06/06/24'],
                  data: OneEvent.eventDatereport.userChoice.map(
                    (date) => date.startDate
                  ),
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  // data: [2, 15, 3],
                  data: OneEvent.eventDatereport.numberVote,
                  color: '#004643',
                },
              ]}
              width={500}
              height={500}
            />
            {OneEvent.owner_id == handleUserId && (
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
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
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
