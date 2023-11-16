import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
  TextField,
  Container,
} from '@mui/material';
import { FormEvent } from 'react';
import { themeOptions } from '../Theme/Theme';

function ContactUs() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Envoyé !');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          bgcolor: '#004643',
          pt: 20,
          pb: 5,
          [theme.breakpoints.down('md')]: {
            height: '75vh',
            pt: 10,
          },
          [theme.breakpoints.down('sm')]: {
            pt: 0,
          },
        }}
      >
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2,

                [theme.breakpoints.down('sm')]: {
                  mt: 8,
                },
              }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                textAlign: 'center',
                pt: 2,
              }}
            >
              Conctactez-nous
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nom & Prénom"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={5}
                id="message"
                label="Message"
                name="message"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#f9bc60',
                  color: '#001E1D',
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                Envoyer
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default ContactUs;
