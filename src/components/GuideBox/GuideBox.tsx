import { Box, styled } from '@mui/material';

const GuideBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '20%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(2, 0, 2, 0),
    width: '100%',
    flexDirection: 'column',
  },
}));

export default GuideBox;
