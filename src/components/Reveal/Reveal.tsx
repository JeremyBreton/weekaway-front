import { Typography, Button } from '@mui/material';
import { Box, Container, styled, useTheme } from '@mui/system';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image2 from '../../assets/DESSIN-CAR.png';
import GuidesBox from '../GuidesBox/GuidesBox';
import Divider from '../Divider/Divider';
import CustomBox from '../CustomBox/CustomBox';
import { getCookie } from '../../utils/cookieUtils';
import { themeOptions } from '../Theme/Theme';

function Reveal() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          bgcolor: '#004643',
          display: 'flex',
          pt: 10,
          [theme.breakpoints.down('md')]: {
            pt: 0,
            mb: 5,
          },
        }}
      >
        <GuidesBox>
          <ImgContainer>
            <img src={image2} alt="illustration" style={{ maxWidth: '70%' }} />
          </ImgContainer>

          <Container>
            <CustomBox sx={{ mb: 10 }}>
              <Box>
                <Divider />
                <Typography
                  variant="h3"
                  sx={{
                    // fontSize: '2rem',
                    color: '#F9BC60',
                    // fontWeight: '700',
                    my: 2,
                  }}
                >
                  Des week-ends inoubliables, en toute simplicité !
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    // fontSize: '1rem',
                    color: '#ABD1C6',
                  }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Avec WeekAway, la{' '}
                  <strong>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    planification de week-ends entre amis n'a jamais été aussi
                    simple !
                  </strong>
                </Typography>
                <Box
                  sx={{
                    fontSize: '1.1rem',
                    color: '#ABD1C6',
                    lineHeight: '3rem',
                    mt: '2rem',
                    textAlign: 'left',
                  }}
                >
                  <ul>
                    <li>Créez un évènement</li>
                    <li>Invitez vos amis</li>
                    <li>Choisissez une plage de dates</li>
                    <li>Choisissez vos dates de disponiblités</li>
                    <li>
                      Laissez-nous vous trouvez la meilleure date pour votre
                      week-end
                    </li>
                  </ul>
                </Box>
              </Box>
            </CustomBox>
            {!isAuthenticated && (
              <Button
                type="button"
                // fullWidth
                href="/signup"
                variant="contained"
                sx={{
                  backgroundColor: '#f9bc60',
                  color: '#001E1D',
                  width: '50%',
                  '&:hover': { color: '#f9bc60', backgroundColor: '#001E1D' },
                  [theme.breakpoints.down('md')]: {
                    width: '80%',
                  },
                }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Je m'inscris pour créer une évènement !
              </Button>
            )}
          </Container>
        </GuidesBox>
      </Box>
    </ThemeProvider>
  );
}

export default Reveal;
