import { Typography, Button } from '@mui/material';
import { Box, Container, styled } from '@mui/system';
import image2 from '../../assets/DESSIN-CAR.png';

function Reveal() {
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
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
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
    <Box sx={{ py: 10, bgcolor: '#004643', pt: 20, display: 'flex' }}>
      <ImgContainer>
        <img src={image2} alt="illustration" style={{ maxWidth: '80%' }} />
      </ImgContainer>
      <Container>
        <CustomBox sx={{ mb: 10 }}>
          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: '2rem',
                color: '#F9BC60',
                fontWeight: '700',
                my: 2,
              }}
            >
              Des week-ends inoubliables, en toute simplicité !
            </Typography>

            <Typography
              sx={{
                fontSize: '1rem',
                color: '#ABD1C6',
                lineHeight: '2rem',
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Avec WeekAway, la{' '}
              <strong>
                planification de week-ends entre amis n'a jamais été aussi
                simple !
              </strong>
            </Typography>
            <Box
              sx={{
                fontSize: '1rem',
                color: '#ABD1C6',
                lineHeight: '2rem',
              }}
            >
              <ol>
                <li>Créez un évènement</li>
                <li>Invitez vos amis</li>
                <li>Choisissez une plage de dates</li>
                <li>Choisissez vos dates de disponiblités</li>
                <li>
                  Laissez-nous vous trouvez la meilleure date pour votre
                  week-end
                </li>
              </ol>
            </Box>
          </Box>
        </CustomBox>
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#f9bc60',
            color: '#001E1D',
            width: '50%',
            '&:hover': { color: '#f9bc60', backgroundColor: '#001E1D' },
          }}
        >
          Je m'inscris pour créer une évènement !
        </Button>
      </Container>
    </Box>
  );
}

export default Reveal;
