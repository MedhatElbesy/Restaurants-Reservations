import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../../api/auth/register';
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
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mobile_number, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [profile_image, setImage] = useState('');
  const [birth_date, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const data = await registerUser({
        first_name,
        last_name,
        email,
        password,
        mobile_number,
        gender,
        profile_image,
        birth_date,
      });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#7B3C1E', color: 'white' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, ml: 2, width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      autoFocus
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      name="mobileNumber"
                      label="Mobile Number"
                      type="tel"
                      id="mobileNumber"
                      autoComplete="tel"
                      value={mobile_number}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      name="birthDate"
                      label="Birth Date"
                      type="date"
                      id="birthDate"
                      autoComplete="bday"
                      value={birth_date}
                      onChange={(e) => setBirth(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      select
                      name="gender"
                      label="Gender"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      size='small'
                      name="profileImage"
                      label="Profile Image"
                      type="file"
                      id="profileImage"
                      onChange={handleImageChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#7B3C1E' }}
                >
                  Register
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2" sx={{ color: '#7B3C1E' }}>
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Grid>
    </ThemeProvider>
  );
};

export default Register;
