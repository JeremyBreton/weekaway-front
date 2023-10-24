import { styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import visu from '../../../assets/2-removebg-preview.png';

function Details() {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(10),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#000',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    color: '#7B8087',
    fontWeight: '500',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(5),
    },
  }));

  const Divider = styled('div')(({ theme }) => ({
    width: '13%',
    height: '5px',
    backgroundColor: '#001E1D',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img src={visu} alt="illustration" style={{ maxWidth: '100%' }} />
          </ImgContainer>

          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: '35px',
                color: '#F9BC60',
                fontWeight: '700',
                my: 3,
              }}
            >
              Adieu les tracas de l'organisation
            </Typography>

            <Typography
              sx={{
                fontSize: '16px',
                color: '#ABD1C6',
                lineHeight: '27px',
              }}
            >
              Simplifiez l'organisation de vos évènements avec WeekAway : l'art
              de planifier ensemble des weekends inoubliables !
            </Typography>
          </Box>
        </CustomBox>

        {/* <TextFlexbox>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>2500+</LargeText>
            <SmallText>Homes For Sale</SmallText>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>3000+</LargeText>
            <SmallText>Properties Rented</SmallText>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>3500+</LargeText>
            <SmallText>Homes Sold</SmallText>
          </Box>
        </TextFlexbox> */}
      </Container>
    </Box>
  );
}

export default Details;
