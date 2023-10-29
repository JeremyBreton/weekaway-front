import { Button, styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEvents } from '../../store/reducers/events';

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

  const handleClickCreateEvent = () => {
    navigate('/create');
  };

  const eventFilteredPast = eventsArray.filter(
    (event) => event.status === false
  );
  const eventFilteredFutur = eventsArray.filter(
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
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'background.default',
          pt: 15,
          minHeight: '100vh',
        }}
      >
        <Typography sx={{ fontSize: 30, color: 'secondary.main', mb: 5 }}>
          Mes évènements à venir
        </Typography>
        {eventFilteredFutur.map((event) => (
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 5,
              px: 5,
              width: '30%',
              justifyContent: 'center',
              mb: 5,
            }}
            key={event.eventId}
          >
            <Container>
              <CustomBox
                sx={{
                  bgcolor: 'background.paper',
                  justifyContent: 'center',
                  width: 'md',
                  mb: 5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '35px',
                    color: '#001E1D',
                    fontWeight: '700',
                    my: 10,
                  }}
                >
                  {event.name}
                </Typography>
              </CustomBox>
            </Container>
          </Box>
        ))}
        <Typography sx={{ fontSize: 30, color: 'secondary.main', mb: 5 }}>
          Mes évènements passés
        </Typography>
        {eventFilteredPast.map((event) => (
          <Box
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 5,
              px: 5,
              width: '30%',
              justifyContent: 'center',
              mb: 5,
            }}
            key={event.eventId}
          >
            <Container>
              <CustomBox
                sx={{
                  bgcolor: 'background.paper',
                  justifyContent: 'center',
                  width: 'md',
                  mb: 5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '35px',
                    color: '#001E1D',
                    fontWeight: '700',
                    my: 10,
                  }}
                >
                  {event.name}
                </Typography>
              </CustomBox>
            </Container>
          </Box>
        ))}
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
        <Button
          variant="contained"
          sx={{ mb: 5, color: 'secondary.main' }}
          onClick={handleClickCreateEvent}
        >
          Créer mon évènement
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Landing;
