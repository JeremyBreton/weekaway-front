import { Box, styled } from '@mui/material';

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(10),
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

export default CustomBox;
