import {
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { BarChart } from '@mui/x-charts';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchEvents } from '../../store/reducers/events';
import Calendar from '../Calendar/Calendar';
import { themeOptions } from '../Theme/Theme';

function EventDetails() {
  const dispatch = useAppDispatch();
  const defaultTheme = createTheme(themeOptions);
  const { idEvent } = useParams();

  const eventsArray = useAppSelector((state) => state.events.eventsArray);

  const oneEvent = eventsArray.filter(
    (event) => event.eventId.toString() === idEvent
  );

  useEffect(() => {
    dispatch(fetchEvents());
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
          {oneEvent.map((item) => (
            <Box
              key={item.eventId}
              sx={{
                backgroundColor: '#ABD1C6',
                borderRadius: 5,
                // px: 5,
                mt: 20,
                mb: 20,
                width: 'xl',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.picture}
                alt="banniere de l'évènement"
                sx={{
                  objectFit: 'fill',
                  mb: 5,
                  borderRadius: 5,
                }}
              />
              <Typography sx={{ textAlign: 'center', mb: 2 }}>
                {item.name}
              </Typography>
              <Typography sx={{ textAlign: 'center', mb: 5 }}>
                {item.description}
              </Typography>

              <Calendar />
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 5, color: 'secondary.main' }}
                // onClick={handleClickCreateEvent}
              >
                Valider mes dates
              </Button>
              <BarChart
                sx={{ color: 'f0f' }}
                xAxis={[
                  {
                    id: 'barCategories',
                    data: ['22/05/24', '29/05/24', '06/06/24'],
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    data: [2, 15, 3],
                  },
                ]}
                width={500}
                height={500}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default EventDetails;
