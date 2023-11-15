import { Box, CssBaseline, styled, Typography } from '@mui/material';
import { Container, useTheme } from '@mui/system';
import { Css } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GuideBox from '../GuideBox/GuideBox';
import GuidesBox from '../GuidesBox/GuidesBox';

import OrganisationWE from '../../assets/1-OrganisationWE.png';
import CalendrierCollaboratif from '../../assets/2-CalendrierCollaboratif.png';
import VoyagesATheme from '../../assets/3-VoyagesATheme.png';
import { themeOptions } from '../Theme/Theme';

function Advantage() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);

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
    <ThemeProvider theme={defaultTheme}>
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
          variant="h3"
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
              variant="body1"
              sx={{
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
              variant="body1"
              sx={{
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
              variant="body1"
              sx={{
                color: '#001E1D',
                my: 1,
              }}
            >
              Personnalisez vos escapades avec des voyages à thème
            </Typography>
          </GuideBox>
        </GuidesBox>
      </Box>
    </ThemeProvider>
  );
}

export default Advantage;
