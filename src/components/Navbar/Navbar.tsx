import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { themeOptions } from '../Theme/Theme';

import logo from '../../assets/1-removebg-preview.png';
import { logout } from '../../store/reducers/user';
import { getCookie } from '../../utils/cookieUtils';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = [
  { name: 'Me connecter', link: 'signin' },
  { name: "M'inscrire", link: 'signup' },
];

//! ICI
const navItemsLogged = [
  { name: 'Mes évènements', link: `events` },
  { name: 'Créer un évènement', link: 'create' },
  { name: 'Mon profil', link: 'profil' },
];

function Navbar(props: Props) {
  const isLoggedIn = Cookies.get('token');

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isLogged = useAppSelector((state) => state.user.logged);
  console.log('isLogged', isLogged);
  // ! JEREMY
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  console.log('isAuthenticated', isAuthenticated);
  // ! JEREMY

  const firstname = useAppSelector((state) => state.user.firstname);
  // console.log("firstname", firstname);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WeekAway
      </Typography>
      <Divider sx={{ bgcolor: '#001E1D' }} />
      {!isLoggedIn && (
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton href={item.link} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {isLoggedIn && (
        <List>
          {navItemsLogged.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton href={item.link} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const defaultTheme = createTheme(themeOptions);

  // const coucouK = navItemsLogged.map((item) => {

  //   const id = Cookies.get('id');
  //   useEffect(() => {
  //     const coucou = navigate(
  //     `/user/${id}/${coucouK.link}}`
  //   });
  //   ) as unknown as string;
  // }, [id, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isLoggedIn && (
        <ThemeProvider theme={defaultTheme}>
          <AppBar
            style={{
              backgroundColor: '#ABD1C6',
              color: '#001E1D',
            }}
            component="nav"
          >
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Link
                  href="/"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <img
                    alt="logo-weekaway"
                    src={logo}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                </Link>
              </Typography>
              {/* <Box>
              <Typography
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                Bienvenue {firstname}, tu es connecté !
              </Typography>
            </Box> */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItemsLogged.map((item) => (
                  <Button
                    key={item.name}
                    href={item.link}
                    sx={{
                      color: '#001E1D',
                      '&:hover': {
                        backgroundColor: '#001E1D',
                        color: '#F9BC60',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button
                  href="/logout"
                  sx={{
                    color: '#001E1D',
                    '&:hover': {
                      backgroundColor: '#001E1D',
                      color: '#F9BC60',
                    },
                  }}
                  onClick={handleLogout}
                >
                  Me déconnecter
                </Button>
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      )}
      {!isLoggedIn && (
        <ThemeProvider theme={defaultTheme}>
          <AppBar
            style={{
              backgroundColor: '#ABD1C6',
              color: '#001E1D',
            }}
            component="nav"
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <Link
                  href="/"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <img
                    alt="logo-weekaway"
                    src={logo}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                </Link>
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    href={item.link}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'secondary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      )}

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Navbar;
