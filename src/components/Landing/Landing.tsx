import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEvents } from '../../store/reducers/events';
// import { findEventId } from '../../store/selectors/eventSelector';

function Landing() {
  const eventsArray = useAppSelector((state) => state.events.eventsArray);

  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(10),
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const defaultTheme = createTheme(themeOptions);

  const navigate = useNavigate();
  Cookies.remove('eventId');
  const id = Cookies.get('id');

  const handleClickCreateEvent = () => {
    navigate(`/user/${id}/create`);
  };

  const handleClickJoinEvent = () => {
    navigate(`/user/${id}/join`);
  };

  const eventFilteredPast = eventsArray?.filter(
    (event) => event.status === false
  );
  const eventFilteredFutur = eventsArray?.filter(
    (event) => event.status === true
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: 'background.default',
          pt: 15,
          pb: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: 2, color: 'secondary.main' }}
          onClick={handleClickCreateEvent}
        >
          Créer mon évènement
        </Button>
        <Button
          variant="contained"
          onClick={handleClickJoinEvent}
          sx={{ ml: 2, color: 'secondary.main' }}
        >
          Rejoindre un évènement
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',

          backgroundColor: 'background.default',
          // pt: 15,
          minHeight: '100vh',
        }}
      >
        <Typography sx={{ fontSize: 30, color: 'secondary.main', mb: 5 }}>
          Mes évènements à venir
        </Typography>
        {!eventFilteredFutur && (
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 1,
              p: 2,
              mb: 5,
            }}
          >
            <Typography sx={{ color: 'primary.main' }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Vous n'avez pas encore d'évènements à venir
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {eventFilteredFutur?.map((event) => (
            <Card
              key={event.eventId}
              sx={{
                width: 500,
                height: 300,
                mb: 10,
              }}
              onClick={() => {
                Cookies.remove('eventId', event.eventId as any);
                Cookies.set('eventId', event.eventId as unknown as string);
                navigate(`/user/${id}/event/${event.eventId}`);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.picture}
                  alt="banniere de l'évènement"
                  sx={{ objectFit: 'fit', objectPosition: 'center' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button size="small" color="primary" sx={{ mt: 2 }}>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Voir l'évènement
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Typography sx={{ fontSize: 30, color: 'secondary.main', mb: 5 }}>
          Mes évènements passés
        </Typography>
        {!eventFilteredPast && (
          <Box
            sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 2 }}
          >
            <Typography sx={{ color: 'primary.main' }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Vous n'avez pas encore d'évènements passés
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {eventFilteredPast?.map((event) => (
            <Card
              key={event.eventId}
              sx={{
                width: 500,
                height: 300,
                mr: 10,
                mb: 10,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.picture}
                  alt="banniere de l'évènement"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 5,
            px: 5,
            width: '30%',
            mb: 5,
          }}
        >
          <Container />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Landing;
