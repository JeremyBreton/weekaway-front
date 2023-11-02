import { Box } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { themeOptions } from '../Theme/Theme';

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));
const StyledDay = styled(PickersDay)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.primary.dark
      : theme.palette.secondary.light,
}));

type CalendarProps = {
  startDateReceived: (date: string | null) => void;
  endDateReceived: (date: string | null) => void;
};

function Calendar({ startDateReceived, endDateReceived }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const [endDate, setEndDate] = useState<Date | null>(null);
  console.log('endDate', endDate);

  const [error, setError] = useState(null);
  console.log('error', error);

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      setError(
        'La date de fin ne peut pas être antérieure à la date de début.'
      );
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }
    setStartDate(date);
    setError(null);

    startDateReceived(date);
  };

  const handleEndDateChange = (date) => {
    // compare if date is before startDate
    if (startDate && date < startDate) {
      setError(
        'La date de fin ne peut pas être antérieure à la date de début.'
      );
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }
    setEndDate(date);
    setError(null);

    endDateReceived(date);
  };

  const defaultTheme = createTheme(themeOptions);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: '#ABD1C6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <DatePicker
            label="Date de début"
            format="DD/MM/YYYY"
            sx={{ mb: 2 }}
            onChange={handleStartDateChange}
            value={startDate}
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
                placeholder: 'JJ/MM/AAAA',
              },
            }}
          />
          <DatePicker
            label="Date de fin"
            format="DD/MM/YYYY"
            onChange={handleEndDateChange}
            value={endDate}
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
                placeholder: 'JJ/MM/AAAA',
              },
            }}
          />
        </ThemeProvider>
      </Box>
    </LocalizationProvider>
  );
}

export default Calendar;
