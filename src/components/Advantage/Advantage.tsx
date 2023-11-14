import { Box, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import GuideBox from '../GuideBox/GuideBox';
import GuidesBox from '../GuidesBox/GuidesBox';

import OrganisationWE from '../../assets/1-OrganisationWE.png';
import CalendrierCollaboratif from '../../assets/2-CalendrierCollaboratif.png';
import VoyagesATheme from '../../assets/3-VoyagesATheme.png';

function Advantage() {
  const theme = useTheme();
  // const GuidesBox = styled(Box)(({ theme }) => ({
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   width: '100%',
  //   marginTop: theme.spacing(5),
  //   marginBottom: theme.spacing(5),
  //   textAlign: 'center',
  //   [theme.breakpoints.down('md')]: {
  //     width: '100%',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     marginBottom: '0',
  //     flexDirection: 'column',
  //     padding: '2rem',
  //   },
  // }));

  // const GuideBox = styled(Box)(({ theme }) => ({
  //   display: 'flex',
  //   width: '20%',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   marginTop: theme.spacing(5),
  //   [theme.breakpoints.down('md')]: {
  //     width: '100%',
  //     flexDirection: 'column',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     margin: theme.spacing(2, 0, 2, 0),
  //     width: '100%',
  //     flexDirection: 'column',
  //   },
  // }));

  const Divider = styled('div')(({ theme }) => ({
    width: '5%',
    height: '5px',
    backgroundColor: '#001E1D',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
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
      <Divider />
      <Typography
        sx={{
          fontSize: '2rem',
          color: '#004643',
          fontWeight: '700',
          mt: 2,
        }}
      >
        WeekAway en 3 points :
      </Typography>

      <GuidesBox>
        <GuideBox>
          <img
            src={OrganisationWE}
            alt="OrganisationWE"
            style={{ width: 150, height: 150 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '1rem',
              color: '#001E1D',
              my: 1,
            }}
          >
            Connectez-vous et organisez des weekends avec vos amis en quelques
            clics
          </Typography>
        </GuideBox>

        <GuideBox>
          <img
            src={CalendrierCollaboratif}
            alt="CalendrierCollaboratif"
            style={{ width: 150, height: 150 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '1rem',
              color: '#00E1E1D',
              my: 1,
            }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Éliminez les conflits d'emploi du temps avec un calendrier
            collaboratif
          </Typography>
        </GuideBox>

        <GuideBox>
          <img
            src={VoyagesATheme}
            alt="VoyagesATheme"
            style={{ width: 150, height: 150 }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: '500',
              fontSize: '1rem',
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
