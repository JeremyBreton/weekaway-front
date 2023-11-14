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
import { Box, Container, useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEvents } from '../../store/reducers/events';
import {
  NotificationType,
  showNotification,
} from '../../store/reducers/notification';
import { getCookie } from '../../utils/cookieUtils';
import '@fontsource-variable/comfortaa';
import '@fontsource/coming-soon';

function Landing() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const defaultTheme = createTheme(themeOptions);
  const eventsArray = useAppSelector((state) => state.events.eventsArray);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  Cookies.remove('eventId');

  const handleClickCreateEvent = () => {
    navigate(`/create`);
  };

  const handleClickJoinEvent = () => {
    navigate(`/join`);
  };

  const eventFilteredPast = eventsArray?.filter(
    (event) => event.status === false
  );
  const eventFilteredFutur = eventsArray?.filter(
    (event) => event.status === true
  );

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
          [theme.breakpoints.down('md')]: {
            pt: 8,
            px: 3,
          },
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
          minHeight: '100vh',
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            color: 'secondary.main',
            mb: 5,
          }}
        >
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
            width: '100%',
          }}
        >
          {eventFilteredFutur?.map((event) => (
            <Card
              key={event.eventId}
              sx={{
                width: '35%',
                height: 300,
                [theme.breakpoints.down('md')]: {
                  width: '80%',
                },
              }}
              onClick={() => {
                Cookies.remove('eventId', event.eventId as any);
                Cookies.set('eventId', event.eventId as unknown as string);
                navigate(`/event/${event.eventId}`);
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '97%',
                    }}
                  >
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

        <Typography sx={{ fontSize: 30, color: 'secondary.main', my: 5 }}>
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
