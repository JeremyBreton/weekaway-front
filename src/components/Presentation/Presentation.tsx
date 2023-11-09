/* eslint-disable react/no-unescaped-entities */
import { styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import image1 from '../../assets/DESSIN-CHEMIN.png';
import image2 from '../../assets/DESSIN-CAR.png';

function Presentation() {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(10),
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

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

  const Divider = styled('div')(({ theme }) => ({
    width: '13%',
    height: '5px',
    backgroundColor: '#001E1D',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  return (
    <Box sx={{ py: 10, bgcolor: '#004643', pt: 15 }}>
      <Container>
        <CustomBox sx={{ mb: 2 }}>
          <ImgContainer>
            <img src={image1} alt="illustration" style={{ maxWidth: '70%' }} />
          </ImgContainer>

          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: '2rem',
                color: '#F9BC60',
                fontWeight: '700',
                my: 3,
              }}
            >
              Organisez des évènements mémorables
            </Typography>

            <Typography
              sx={{
                fontSize: '1rem',
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
        <CustomBox>
          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: '2rem',
                color: '#F9BC60',
                fontWeight: '700',
                my: 3,
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Adieu les tracas de l'organisation
            </Typography>

            <Typography
              sx={{
                fontSize: '1rem',
                color: '#ABD1C6',
                lineHeight: '2rem',
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Notre calendrier collaboratif vous permet de créer des événements
              en un instant et d'inviter vos amis à choisir les dates qui leur
              conviennent le mieux.
              <br /> Trouvez la bonne date pour une sortie de groupe n'a jamais
              été aussi simple. WeekAway vous offre une expérience sans tracas
            </Typography>
          </Box>
          <ImgContainer>
            <img src={image2} alt="illustration" style={{ maxWidth: '70%' }} />
          </ImgContainer>
        </CustomBox>
      </Container>
    </Box>
  );
}

export default Presentation;
