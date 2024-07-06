import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { login } from "../../../slices/auth/authSlice";
import "./login.css"
const defaultTheme = createTheme();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus.isAuthenticated) {
      if (authStatus.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [authStatus.isAuthenticated, authStatus.role, navigate]);

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        // title: "Oops...",
        text: error.message.msg,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }} className="login-page">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
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
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#7B3C1E" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&:checked": {
                        bgcolor: "#5a2915 !important",
                      },
                    }}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
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
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/forget-password"
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
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/register"
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
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/" variant="body2" sx={{ color: "#7B3C1E" }}>
                    Go Back
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
