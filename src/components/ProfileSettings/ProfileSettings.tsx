import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import * as React from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import { DateField, LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCookie, getTokenId } from '../../utils/cookieUtils';
import { themeOptions } from '../Theme/Theme';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser } from '../../store/reducers/user';

function ProfileSettings() {
  const userfetch = useAppSelector((state) => state.user.user);
  const defaultTheme = createTheme(themeOptions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const [email, setEmail] = useState(userfetch.email);
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState(userfetch.firstname);
  const [lastname, setLastname] = useState(userfetch.lastname);
  const [profileDesc, setProfileDesc] = useState(userfetch.profile_desc);
  const [address, setAddress] = useState(userfetch.address);
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState(userfetch.birth_date);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //! A voir pour simplifier avec else ou else if + alert a passer en snackbar
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Vous devez être connectés pour créer un évènement');
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      Cookies.get('token');
    }
  }, [isAuthenticated]);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #f9bc60',
    boxShadow: 24,
    px: 5,
    pt: 2,
    borderRadius: 5,
  };

  // This is a trick for not showing Invalid Date must be reworked
  let dateFromBackend = '';
  if (userfetch.birth_date === null) {
    dateFromBackend = '';
  } else {
    dateFromBackend = dayjs(userfetch.birth_date).format('DD-MM-YYYY');
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formattedDate = dayjs(birthDate).format('YYYY-MM-DD HH:mm:ssZ');
    formData.set('birth_date', formattedDate);

    const formObj = Object.fromEntries(formData);

    // Remove empty fields from formData
    Object.keys(formObj).forEach((key) => {
      const value = formObj[key];
      if (value === '' || value === null) {
        delete formObj[key];
      }
    });

    const id = getTokenId();

    await axios.patch(`http://caca-boudin.fr/api/user/${id}`, formObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            minHeight: '76vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CssBaseline />

          <Box
            sx={{
              backgroundColor: '#ABD1C6',
              borderRadius: 5,
              px: 5,
              mt: 15,
              mb: 5,
              height: '50%',
              width: '50vh',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center', mb: 5, pt: 5 }}
            >
              Mon profil
            </Typography>
            <Box
              sx={{
                backgroundColor: '#004643',
                color: '#ABD1C6',
                borderRadius: 1,
                p: 2,
                mb: 5,
              }}
            >
              <Typography>Genre: {userfetch.gender}</Typography>
              <Typography>Nom: {userfetch.lastname}</Typography>
              <Typography>Prénom: {userfetch.firstname}</Typography>
              <Typography>Date de naissance: {dateFromBackend}</Typography>
              <Typography>Adresse: {userfetch.address}</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#004643',
                color: '#ABD1C6',
                borderRadius: 1,
                p: 2,
                mb: 5,
              }}
            >
              <Typography>Bio: {userfetch.profile_desc}</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#004643',
                color: '#ABD1C6',
                borderRadius: 1,
                p: 2,
                mb: 5,
              }}
            >
              <Typography>Email: {userfetch.email}</Typography>
              <Typography>Mot de passe: ******</Typography>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    mt: 1,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="gender">Genre</InputLabel>
                        <Select
                          labelId="gender"
                          id="gender"
                          value={gender}
                          label="Genre"
                          onChange={({ target }) => setGender(target.value)}
                        >
                          <MenuItem value="Homme">Homme</MenuItem>
                          <MenuItem value="Femme">Femme</MenuItem>
                        </Select>
                      </FormControl>
                      <VisuallyHiddenInput
                        type="gender"
                        id="gender"
                        name="gender"
                        defaultValue={gender}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstname"
                        required
                        fullWidth
                        id="firstname"
                        label="Prénom"
                        defaultValue={userfetch.firstname}
                        onChange={({ target }) => setFirstname(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastname"
                        label="Nom"
                        name="lastname"
                        autoComplete="family-name"
                        defaultValue={userfetch.lastname}
                        onChange={({ target }) => setLastname(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={
                          frFR.components.MuiLocalizationProvider.defaultProps
                            .localeText
                        }
                      >
                        <DateField
                          label="Date de naissance"
                          format="DD/MM/YYYY"
                          onChange={setBirthDate}
                          fullWidth
                        />
                      </LocalizationProvider>
                      <VisuallyHiddenInput
                        type="input"
                        id="birth_date"
                        name="birth_date"
                        defaultValue={birthDate}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="address"
                        label="Adresse"
                        id="address"
                        value={address}
                        onChange={({ target }) => setAddress(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="profile_desc"
                        label="Bio"
                        id="profile_desc"
                        value={profileDesc}
                        onChange={({ target }) => setProfileDesc(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        defaultValue={userfetch.email}
                        onChange={({ target }) => setEmail(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                    </Grid>
                  </Grid>
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
                    Mettre à jour mon profil
                  </Button>
                </Box>
              </Box>
            </Modal>
            <Button
              type="button"
              onClick={handleOpen}
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
              Mettre à jour mon profil
            </Button>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default ProfileSettings;
