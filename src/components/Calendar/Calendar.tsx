import * as React from 'react';
import { Box } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { themeOptions } from '../Theme/Theme';

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));
const StyledDay = styled(PickersDay)(({ theme }) => ({
  // borderRadius: theme.shape.borderRadius,
  color:
    theme.palette.mode === 'light'
      ? theme.palette.primary.dark
      : theme.palette.secondary.light,
}));

function Calendar() {
  const defaultTheme = createTheme(themeOptions);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ backgroundColor: '#ABD1C6' }}>
        <ThemeProvider theme={defaultTheme}>
          <DatePicker
            label="Date de début"
            slots={{
              openPickerIcon: EditCalendarRoundedIcon,
              openPickerButton: StyledButton,
              day: StyledDay,
            }}
            slotProps={{
              openPickerIcon: { fontSize: 'large' },
              openPickerButton: { color: 'primary' },
              textField: {
                variant: 'filled',
                focused: true,
                color: 'primary',
              },
            }}
          />
          <DatePicker
            label="Date de fin"
            slots={{
              openPickerIcon: EditCalendarRoundedIcon,
              openPickerButton: StyledButton,
              day: StyledDay,
            }}
            slotProps={{
              openPickerIcon: { fontSize: 'large' },
              openPickerButton: { color: 'primary' },
              textField: {
                variant: 'filled',
                focused: true,
                color: 'primary',
              },
            }}
          />
        </ThemeProvider>
      </Box>
    </LocalizationProvider>
  );
}

export default Calendar;
