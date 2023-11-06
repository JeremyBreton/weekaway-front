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
import EditIcon from '@mui/icons-material/Edit';

import * as React from 'react';

import axios from 'axios';
import { getCookie } from '../../utils/cookieUtils';
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
  const [profile_desc, setProfile_desc] = useState(userfetch.profile_desc);
  const [address, setAddress] = useState(userfetch.address);
  const [gender, setGender] = useState(userfetch.gender);
  const [birth_date, setBirth_date] = useState(userfetch.birth_date);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = Cookies.get('id');
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Supprimez les champs vides ou nuls de FormData
    formData.forEach((value, key) => {
      if (value === '' || value === null) {
        formData.delete(key);
      }
    });

    // Vous n'avez pas besoin de supprimer gender ou address séparément car vous l'avez déjà fait ci-dessus
    const formObj = Object.fromEntries(formData);

    const patchUser = await axios.patch(
      `http://caca-boudin.fr/api/user/${id}`,
      formObj,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {isAuthenticated && (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '62vh' }}>
          <CssBaseline />

          <Box
            sx={{
              backgroundColor: '#ABD1C6',
              borderRadius: 5,
              px: 5,
              mt: 20,
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
              <Typography>Nom: {userfetch.lastname}</Typography>
              <Typography>Prénom: {userfetch.firstname}</Typography>
              <Typography>Date de naissance: {userfetch.birth_date}</Typography>
              <Typography>Genre: {userfetch.gender}</Typography>
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
              <Typography>Adresse: {userfetch.address}</Typography>
              <Typography>Email: {userfetch.email}</Typography>
              <Typography>Mot de passe: ******</Typography>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
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
                      <TextField
                        fullWidth
                        name="birth_date"
                        label="Date d'anniversaire"
                        id="birth_date"
                        value={birth_date}
                        onChange={({ target }) => setBirth_date(target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="gender"
                        label="Genre"
                        id="gender"
                        value={gender}
                        onChange={({ target }) => setGender(target.value)}
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

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="profile_desc"
                        label="Bio"
                        id="profile_desc"
                        value={profile_desc}
                        onChange={({ target }) => setProfile_desc(target.value)}
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
