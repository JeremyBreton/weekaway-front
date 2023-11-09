import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import logohangover from '../../assets/404LABONNE.png';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Error() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FBFDF0',
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${logohangover})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '899px',
            width: '899px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Button
          sx={{
            color: '#001E1D',
            backgroundColor: '#F9BC60',
            borderRadius: 1,
            p: 1,
            mb: 2,
            '&:hover': {
              backgroundColor: '#001E1D',
              color: '#F9BC60',
            },
          }}
        >
          Accueil
        </Button>
      </Box>
      <Footer />
    </>
  );
}
export default Error;
