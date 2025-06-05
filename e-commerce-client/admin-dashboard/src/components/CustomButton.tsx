import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
interface CustomButtonProps {
  title: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  variant = "contained",
  color = "success",
}) => {
  return (
    <Button variant={variant} color={color} startIcon={<AddIcon/>}  onClick={onClick} sx={{borderRadius:0}}>
    {title}
    </Button>
  );
};

export default CustomButton;
