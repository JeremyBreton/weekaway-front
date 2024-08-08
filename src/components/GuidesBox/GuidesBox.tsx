import { Box, styled } from '@mui/material';

const GuidesBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '0',
    flexDirection: 'column',
    padding: '1rem',
  },
}));

export default GuidesBox;
