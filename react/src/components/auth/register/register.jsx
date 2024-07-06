import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Avatar,
  CssBaseline,
  Link,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  FormGroup,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { register as registerUser } from "../../../slices/auth/authSlice";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import "./register.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const defaultTheme = createTheme();

const Register = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async () => {
    if (formData.password !== formData.password_confirmation) {
      Swal.fire({
        title: "Oops...",
        text: "Passwords do not match.",
      });
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "A verification email has been sent to your email address.",
      });
      navigate("/verify");
    } catch (err) {
      Swal.fire({
        title: "Oops...",
        text: authError || "Registration failed.",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="register"
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <LockPersonIcon className="fs-1" />
              {/* <Avatar sx={{ m:0, bgcolor: "#7B3C1E", color: "white" }}>
              </Avatar> */}
              <Typography component="h1" variant="h4">
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1, ml: 2, width: "100%" }}
                encType="multipart/form-data"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      autoComplete="given-name"
                      autoFocus
                      {...register("first_name", {
                        required: "First name is required",
                        pattern: {
                          value: /^[a-zA-Z]{3,}$/,
                          message:
                            "Name should be at least 3 characters and contain only letters.",
                        },
                      })}
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                      {...register("last_name", {
                        required: "Last name is required",
                        pattern: {
                          value: /^[a-zA-Z]{3,}$/,
                          message:
                            "Name should be at least 3 characters and contain only letters.",
                        },
                      })}
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      id="mobile_number"
                      label="Mobile Number"
                      name="mobile_number"
                      autoComplete="tel"
                      {...register("mobile_number", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^01\d{9}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      error={!!errors.mobile_number}
                      helperText={errors.mobile_number?.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password should be at least 8 characters long",
                        },
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="password_confirmation"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      id="password_confirmation"
                      {...register("password_confirmation", {
                        required: "Password confirmation is required",
                      })}
                      error={!!errors.password_confirmation}
                      helperText={errors.password_confirmation?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="birth_date"
                      label="Birth Date"
                      type="date"
                      id="birth_date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("birth_date", {
                        required: "Birth date is required",
                      })}
                      error={!!errors.birth_date}
                      helperText={errors.birth_date?.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      select
                      name="gender"
                      label="Gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      name="profile_image"
                      label="Profile Image"
                      type="file"
                      id="profile_image"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleChange}
                    />
                    {/* 
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" />
                    </Button> */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size="small"
                      select
                      id="roles-select"
                      value={formData.roles_name}
                      label="Role"
                      name="roles_name"
                      {...register("roles_name", {
                        required: "role is required",
                      })}
                      error={!!errors.roles_name}
                      helperText={errors.roles_name?.message}
                      onChange={handleChange}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="owner">Ownner</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <FormGroup>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: "#7B3C1E",
                      "&:hover": {
                        bgcolor: "#5a2915",
                      },
                    }}
                  >
                    Register
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link
                        href="/login"
                        variant="body2"
                        sx={{
                          color: "#7B3C1E",
                          textDecorationColor: "#7B3C1E",
                          "&:hover": {
                            color: "#ac603c",
                            textDecorationColor: "#ac603c",
                          },
                        }}
                      >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </FormGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
