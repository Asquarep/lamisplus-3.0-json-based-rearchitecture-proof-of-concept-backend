import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import logo from "../assets/logo.svg";
import useCustomNavigate from "../hooks/useCustomNavigate";
import { login } from "../store/slices/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (isAuthenticated) {
      console.log("NAVIGATE CALLED");
      
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(login({ email, password }));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        width: "100vw",
      }}
    >
      <Paper sx={{ padding: 4, width: 360 }}>
        <Box sx={{ p: 2, height: 64 }}>
          <img
            src={logo}
            alt="Cormaflo Logo"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
              objectFit: "contain",
            }}
          />
        </Box>

        <Typography variant="h5" mb={2} textAlign="center">
          Login to CormaFlo
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginPage;