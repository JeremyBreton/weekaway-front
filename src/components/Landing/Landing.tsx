import { Button, styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../Theme/Theme';
import { useAppSelector } from '../../hooks/redux';

function Landing() {
  const events = useAppSelector((state) => state.events.list);
  console.log('events', events);

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
          Mes évènements
        </Typography>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 5,
            px: 5,
            width: '30%',
            justifyContent: 'center',
            mb: 5,
          }}
        >
          <Container>
            {events.map((event) => (
              <CustomBox
                key={event.id}
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
            ))}
          </Container>
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
          <Container>
            {/* <CustomBox
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
                Beuverie chez Tim
              </Typography>
            </CustomBox> */}
          </Container>
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
