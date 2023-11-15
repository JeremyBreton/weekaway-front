/* eslint-disable react/no-unescaped-entities */
import { styled, Typography } from '@mui/material';
import { Box, Container, useTheme } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomBox from '../CustomBox/CustomBox';
import image1 from '../../assets/DESSIN-CHEMIN.png';
import image2 from '../../assets/DESSIN-CAR.png';
import Divider from '../Divider/Divider';
import { themeOptions } from '../Theme/Theme';

function Presentation() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          py: 10,
          bgcolor: '#004643',
          pt: 15,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center',
            pt: 0,
          },
        }}
      >
        <Container>
          <CustomBox sx={{ mb: 2 }}>
            <ImgContainer>
              <img
                src={image1}
                alt="illustration_WeekAway"
                style={{ maxWidth: '70%' }}
              />
            </ImgContainer>

            <Box>
              <Divider />
              <Typography
                sx={{
                  color: '#F9BC60',

                  my: 3,
                }}
                variant="h3"
              >
                Organisez des évènements mémorables
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#ABD1C6',
                  lineHeight: '2rem',
                }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Peu importe la destination de votre voyage, WeekAway vous aide à
                planifier des jours, week-ends ou semaines inoubliables. <br />{' '}
                Partagez des aventures et vivez des expériences mémorables.
                Explorez de nouveaux horizons et créez des souvenirs durables.
              </Typography>
            </Box>
          </CustomBox>
        </Container>

        <Container>
          <CustomBox
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexDirection: 'column-reverse',
              },
            }}
          >
            <Box>
              <Divider />
              <Typography
                sx={{
                  fontSize: '2rem',
                  color: '#F9BC60',
                  fontWeight: '700',
                  my: 3,
                }}
                variant="h3"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Adieu les tracas de l'organisation
              </Typography>

              <Typography
                sx={{
                  color: '#ABD1C6',
                  lineHeight: '2rem',
                }}
                variant="body1"
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Notre calendrier collaboratif vous permet de créer des
                événements en un instant et d'inviter vos amis à choisir les
                dates qui leur conviennent le mieux.
                <br /> Trouvez la bonne date pour une sortie de groupe n'a
                jamais été aussi simple. WeekAway vous offre une expérience sans
                tracas
              </Typography>
            </Box>
            <ImgContainer>
              <img
                src={image2}
                alt="illustration"
                style={{ maxWidth: '70%' }}
              />
            </ImgContainer>
          </CustomBox>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Presentation;
