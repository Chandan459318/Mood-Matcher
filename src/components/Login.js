// src/components/Login.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Login">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "20px", background: "#1976d2" }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Button variant="text" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default Login;
