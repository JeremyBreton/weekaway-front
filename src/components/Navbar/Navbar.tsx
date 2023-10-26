import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import logo from '../../assets/1-removebg-preview.png';
import { logout } from '../store/reducers/user';

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
  // { name: 'Me déconnecter', link: 'logout' },
];
const navItemsLogged = [{ name: 'Me déconnecter', link: 'logout' }];

function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
  console.log(isLogged);

  const firstname = useAppSelector((state) => state.user.firstname);
  console.log(firstname);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WeekAway
      </Typography>
      <Divider sx={{ bgcolor: '#001E1D' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isLogged && (
        <AppBar
          style={{ backgroundColor: '#ABD1C6', color: '#001E1D' }}
          component="nav"
        >
          <Box>
            <Typography>Bienvenue {firstname}, tu es connecté !</Typography>
            <Button
              sx={{
                color: '#001E1D',
                '&:hover': {
                  backgroundColor: '#001E1D',
                  color: '#f9bc60',
                },
              }}
              onClick={handleLogout}
            >
              me déconnecter
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
        </AppBar>
      )}
      {!isLogged && (
        <AppBar
          style={{ backgroundColor: '#ABD1C6', color: '#001E1D' }}
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
                  flexGrow: 1,
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
                    color: '#001E1D',
                    '&:hover': {
                      backgroundColor: '#001E1D',
                      color: '#f9bc60',
                    },
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
              bgcolor: '#ABD1C6',
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
