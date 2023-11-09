import { Typography } from '@mui/material';
import { Box, Container, styled } from '@mui/system';

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
              {/* eslint-disable-next-line react/no-unescaped-entities */}
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
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Adieu les tracas de l'organisation
            </Typography>

            <Typography
              sx={{
                fontSize: '16px',
                color: '#ABD1C6',
                lineHeight: '27px',
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Simplifiez l'organisation de vos évènements avec WeekAway : l'art
              de planifier ensemble des weekends inoubliables !
            </Typography>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
}

export default Reveal;
