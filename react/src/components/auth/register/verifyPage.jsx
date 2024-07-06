import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  CssBaseline,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Swal from "sweetalert2";
import axios from "../../../axios";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setError("Please enter the verification code.");
      return;
    }

    try {
      await axios.get(`/verification/${verificationCode}`);
      Swal.fire({
        icon: "success",
        title: "Email verified successfully!",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        text: error.response.data.msg,
      });
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Avatar sx={{ p: 2, bgcolor: "#ffd28d" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Email
          </Typography>
          <Typography
            component="p"
            variant="h5"
            align="center"
            style={{ fontSize: "small", padding: "10px" }}
          >
            We sent an email to your registered address. <br />
            Enter the Verification code to get started.
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="verification_code"
              label="Verification Code"
              id="verification_code"
              autoComplete="verification-code"
              value={verificationCode}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Verify;
