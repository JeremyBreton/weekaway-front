import { styled, Typography } from '@mui/material';
import { create } from '@mui/material/styles/createTransitions';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from '../Theme/Theme';

import logo from '../../assets/1-removebg-preview.png';

function Footer() {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    gap: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const FooterLink = styled('span')(({ theme }) => ({
    fontSize: '14px',
    color: 'text.primary',
    fontWeight: '300',
    cursor: 'pointer',
    '&:hover': {
      color: '#E16162',
    },
  }));
  const defaultTheme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          py: 5,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <CustomContainer>
          <CustomContainer>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '700',
                  mb: 2,
                }}
              >
                WeekAway
              </Typography>

              <FooterLink>Qui sommes nous ?</FooterLink>
              <br />
              <FooterLink>Nous contacter</FooterLink>
              <br />
              <FooterLink>Plan du site</FooterLink>
              <br />
              <FooterLink>Mention légales</FooterLink>
            </Box>

            <Box>
              <img
                alt="logo-weekaway"
                src={logo}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            </Box>
          </CustomContainer>
        </CustomContainer>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
