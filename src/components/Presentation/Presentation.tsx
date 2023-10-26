import { styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import visu from '../../assets/2-removebg-preview.png';

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
    <Box sx={{ py: 10, bgcolor: '#004643', pt: 20 }}>
      <Container>
        <CustomBox sx={{ mb: 10 }}>
          <ImgContainer>
            <img src={visu} alt="illustration" style={{ maxWidth: '100%' }} />
          </ImgContainer>

          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: '35px',
                color: '#F9BC60',
                fontWeight: '700',
                my: 3,
              }}
            >
              Organisez des évènements mémorables
            </Typography>

            <Typography
              sx={{
                fontSize: '16px',
                color: '#ABD1C6',
                lineHeight: '27px',
              }}
            >
              Simplifiez vos évènements avec WeekAway : l'art de planifier
              ensemble des weekends inoubliables !
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
                fontSize: '35px',
                color: '#F9BC60',
                fontWeight: '700',
                my: 3,
              }}
            >
              Adieu les tracas de l'organisation
            </Typography>

            <Typography
              sx={{
                fontSize: '16px',
                color: '#ABD1C6',
                lineHeight: '27px',
              }}
            >
              Simplifiez l'organisation de vos évènements avec WeekAway : l'art
              de planifier ensemble des weekends inoubliables !
            </Typography>
          </Box>
          <ImgContainer>
            <img src={visu} alt="illustration" style={{ maxWidth: '100%' }} />
          </ImgContainer>
        </CustomBox>
      </Container>
    </Box>
  );
}

export default Presentation;
