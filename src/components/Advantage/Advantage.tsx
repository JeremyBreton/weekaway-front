import { Box, styled, Typography } from '@mui/material';

import logo from '../../assets/1-removebg-preview.png';

function Advantage() {
  const GuidesBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
      flexDirection: 'column',
      padding: '2rem',
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 2, 0),
      width: '100%',
      flexDirection: 'column',
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ABD1C6',
        pt: 5,
      }}
    >
      <div
        style={{
          width: '5%',
          height: '5px',
          backgroundColor: '#001E1D',
          margin: '0 auto',
        }}
      />

      <GuidesBox>
        <GuideBox>
          <img src={logo} alt="buyIcon" style={{ width: 300, height: 300 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '18px',
              color: '#001E1D',
              my: 1,
            }}
          >
            Connectez-vous et organisez des weekends avec vos amis en quelques
            clics
          </Typography>
        </GuideBox>

        <GuideBox>
          <img src={logo} alt="buyIcon" style={{ width: 300, height: 300 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '18px',
              color: '#00E1E1D',
              my: 1,
            }}
          >
            Éliminez les conflits d'emploi du temps avec un calendrier
            collaboratif
          </Typography>
        </GuideBox>

        <GuideBox>
          <img src={logo} alt="buyIcon" style={{ width: 300, height: 300 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '18px',
              color: '#001E1D',
              my: 1,
            }}
          >
            Personnalisez vos escapades avec des voyages à thème
          </Typography>
        </GuideBox>
      </GuidesBox>
    </Box>
  );
}

export default Advantage;
