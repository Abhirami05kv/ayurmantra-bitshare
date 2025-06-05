import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import  { Dayjs } from "dayjs";

interface CustomDatePickerProps {
  value: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
  label?: string;
}

const CustomDatePicker = ({
  value,
  onChange,
  label = "Select Date",
}: CustomDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
