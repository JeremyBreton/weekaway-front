import { Box, Button, CardMedia, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { BarChart } from '@mui/x-charts';
import { useAppSelector } from '../../hooks/redux';
import { findEventId } from '../../store/selectors/eventSelector';
import Calendar from '../Calendar/Calendar';

function EventDetails() {
  const { idEvent } = useParams();
  // const eventId: any = idEventParams.idEvent;

  console.log('EventId', idEvent);
  // ICI
  const oneEvent: any | undefined = useAppSelector((state) =>
    findEventId(state.events.eventsArray, +idEvent)
  );
  console.log('oneEvent', oneEvent);

  return (
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
      <CardMedia
        component="img"
        height="200"
        image={oneEvent?.picture}
        alt="banniere de l'évènement"
        sx={{ objectFit: 'cover' }}
      />
      {oneEvent?.name}
      <Typography>{oneEvent.description}</Typography>
      <Calendar />
      <Button>Valider mes dates</Button>
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
  );
}
export default EventDetails;
