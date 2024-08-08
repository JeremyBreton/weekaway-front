import { Typography } from '@mui/material';
import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/system';
import { themeOptions } from '../Theme/Theme';

function LegalNotices() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          py: 5,
          bgcolor: '#004643',
          pt: 15,
          minHeight: '28vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            pt: 3,
            minHeight: '15vh',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            color: '#F9BC60',
            fontWeight: '700',
          }}
        >
          Mentions Légales
        </Typography>
      </Box>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            backgroundColor: '#ABD1C6',
            borderRadius: 5,
            px: 5,
            mb: 8,
          }}
        >
          <Box
            sx={{
              bgcolor: '#ABD1C6',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 5,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin
              2004 pour la confiance en l’économie numérique, il est précisé aux
              utilisateurs du site <strong>WEEKAWAY</strong> l’identité des
              différents intervenants dans le cadre de sa réalisation et de son
              suivi.
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                color: '#004643',
                fontWeight: '700',
                pt: 5,
              }}
            >
              Edition du site
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Le site <strong>WEEKAWAY</strong> est un projet de groupe dont les
              stagiaires font partie de l’école O’clock
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                color: '#004643',
                fontWeight: '700',
                pt: 5,
                textAlign: 'center',
              }}
            >
              Responsables des publications
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              <ul>
                <li>Renaud Berni</li>
                <li>Jérémy Breton</li>
                <li>Enzo Caldora</li>
                <li>Geoffrey Fardeau</li>
                <li>Tim Moyence</li>
              </ul>
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                color: '#004643',
                fontWeight: '700',
                pt: 5,
              }}
            >
              Nous contacter
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              contact.weekaway@gmail.com
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                color: '#004643',
                fontWeight: '700',
                pt: 5,
              }}
            >
              Hébergeur
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              IONOS
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LegalNotices;
