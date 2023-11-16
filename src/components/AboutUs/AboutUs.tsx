import {
  Box,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
  Chip,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { themeOptions } from '../Theme/Theme';
import { aboutUsData } from '../../data/aboutUsData';

function AboutUs() {
  const theme = useTheme();
  const defaultTheme = createTheme(themeOptions);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          py: 5,
          bgcolor: '#004643',
          pt: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            pt: 8,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            color: '#F9BC60',
            fontWeight: '700',
          }}
        >
          Qui sommes-nous ?
        </Typography>
      </Box>
      <Box
        sx={{
          py: 5,
          bgcolor: '#004643',
          pt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {aboutUsData.map((item) => (
          <Card
            key={item.name}
            sx={{ width: 350, height: 550, borderRadius: 2, boxShadow: 5 }}
          >
            <CardMedia
              sx={{ height: 300 }}
              image={item.img}
              title={item.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  textAlign: 'center',
                }}
              >
                {item.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Chip
                  label={item.role}
                  sx={{
                    py: 2,
                    mb: 2,
                    bgcolor: '#004643',
                    color: '#fff',
                    width: '50%',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Link href={item.github} target="_blank">
                <GitHubIcon
                  fontSize="large"
                  sx={{
                    color: '#004643',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.5s ease',
                    },
                  }}
                />
              </Link>
              <Link href={item.linkedin} target="_blank">
                <LinkedInIcon
                  fontSize="large"
                  sx={{
                    color: '#004643',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                />
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default AboutUs;
