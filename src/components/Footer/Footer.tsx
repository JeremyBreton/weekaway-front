import { styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { themeOptions } from '../Theme/Theme';

import logo from '../../assets/LOGO_HORIZONTAL__ONLY_VERT___RESIZE-NEWpng.png';

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

  const FooterText = styled('span')(({ theme }) => ({
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
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  mb: 2,
                }}
              >
                WeekAway
              </Typography>

              <FooterText>
                <Link href="/aboutus" sx={{ textDecoration: 'none' }}>
                  Qui sommes nous ?
                </Link>
              </FooterText>
              <br />
              <FooterText>
                <Link href="/contactus" sx={{ textDecoration: 'none' }}>
                  Nous contacter
                </Link>
              </FooterText>
              <br />
              <FooterText>
                <Link href="/legalnotices" sx={{ textDecoration: 'none' }}>
                  Mention légales
                </Link>
              </FooterText>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img alt="logo-weekaway" src={logo} style={{ width: '70%' }} />
            </Box>
          </CustomContainer>
        </CustomContainer>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
