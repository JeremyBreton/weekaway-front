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
import { useState } from 'react';
import Link from '@mui/material/Link';
import { ButtonBase } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { themeOptions } from '../Theme/Theme';

import logo from '../../assets/LOGO_HORIZONTAL__ONLY_VERT___RESIZE-NEWpng.png';
import { logout } from '../../store/reducers/user';
import { getTokenId, getCookie } from '../../utils/cookieUtils';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = [
  { name: 'ME CONNECTER', link: 'signin' },
  { name: "M'INSCRIRE", link: 'signup' },
];

const navItemsLogged = [
  { name: 'MES ÉVÈNEMENTS', link: `/events` },
  { name: 'CRÉER UN ÉVÈNEMENT', link: `/create` },
  { name: 'MON PROFIL', link: `/profil` },
];

function Navbar(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCookie('token'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = Cookies.get('token');

  const { window } = props;
  const defaultTheme = createTheme(themeOptions);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  //! A supprimer potentiellement puisque pas utilisé

  const isLogged = useAppSelector((state) => state.user.logged);

  const firstname = useAppSelector((state) => state.user.firstname);

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {isLoggedIn && (
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
                      // maxWidth: 150,
                      maxHeight: 120,
                      padding: 10,
                    }}
                  />
                </Link>
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItemsLogged.map((item) => (
                  <ButtonBase
                    key={item.name}
                    href={item.link}
                    sx={{
                      color: '#001E1D',
                      borderRadius: 1,
                      p: 1,
                      '&:hover': {
                        backgroundColor: '#001E1D',
                        color: '#F9BC60',
                      },
                      fontWeight: 500,
                      fontSize: '1.07rem',
                    }}
                  >
                    {item.name}
                  </ButtonBase>
                ))}
                <ButtonBase
                  href="/"
                  sx={{
                    color: '#001E1D',
                    borderRadius: 1,
                    p: 1,
                    '&:hover': {
                      backgroundColor: '#001E1D',
                      color: '#F9BC60',
                    },
                    fontWeight: 500,
                    fontSize: '1.07rem',
                  }}
                  onClick={handleLogout}
                >
                  ME DÉCONNECTER
                </ButtonBase>
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
        )}
        {!isLoggedIn && (
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
                      maxHeight: 130,
                      padding: 10,
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
                      fontWeight: 500,
                      fontSize: '1.07rem',
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
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
                color: 'text.primary',
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
    </ThemeProvider>
  );
}

export default Navbar;
