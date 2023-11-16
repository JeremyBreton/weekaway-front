import { styled } from '@mui/system';

const Divider = styled('div')(({ theme }) => ({
  width: '13%',
  height: '5px',
  backgroundColor: '#001E1D',
  [theme.breakpoints.down('md')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default Divider;
