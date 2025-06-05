import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormHelperText, Grid2, Paper, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/userService";
import { Loader } from "../../components/Loader";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import loginBg from "../../assets/herbals.jpg";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Check if "Remember Me" data exists in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberMeEmail");
    const savedPassword = localStorage.getItem("rememberMePassword");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (data: any) => {
    try {
      setLoading(true);

      // Convert email to lowercase
      const lowercaseEmail = data.email.toLowerCase();

      // Save email and password to localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberMeEmail", lowercaseEmail);
        localStorage.setItem("rememberMePassword", data.password);
      } else {
        localStorage.removeItem("rememberMeEmail");
        localStorage.removeItem("rememberMePassword");
      }

      const response = await loginService({ ...data, email: lowercaseEmail });
      console.log(response,"-------->admin login");
      if (response.success === true) {
        if(response?.user?.role ==="admin"){
          Cookies.set("admin", JSON.stringify(response.user));
          Cookies.set("adminToken", response.token);
          navigate("/");
        }else{
          Swal.fire({
            icon: "info",
            title: "Information!",
            text: "Login privileges are exclusively granted to administrative users",
          });
        }
     
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Login Failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid2
      container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: "400px", width: "100%", p: 3, backgroundColor: "whitesmoke" }}>
        <h2 className="text-[#3a5e1f] font-semibold text-3xl mb-5 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email Input */}
          <Grid2 sx={{ mb: 2 }}>
            <TextField
              label="Email"
              variant="standard"
              size="small"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
          </Grid2>

          {/* Password Input */}
          <Grid2 sx={{ mb: 2 }}>
            <FormControl fullWidth variant="standard" error={!!errors.password}>
              <InputLabel>Password</InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText>
                  {errors.password.message as string}
                </FormHelperText>
              )}
            </FormControl>
          </Grid2>

          {/* Remember Me Checkbox */}
          <Grid2 sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
            />
          </Grid2>

          {/* Submit Button */}
          <Grid2 sx={{ my: 4 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </Button>
          </Grid2>
        </form>
      </Paper>
    </Grid2>
  );
}

export default Login;