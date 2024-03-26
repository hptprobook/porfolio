import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserCredentials {
  username: string;
  password: string;
  confirmPassword?: string; // Only used for registration
}

export default function Login() {
  const [credentials, setCredentials] = useState<UserCredentials>({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!credentials.username || !credentials.password || (isRegistering && !credentials.confirmPassword)) {
      alert('Please fill in all fields.');
      return;
    }

    if (isRegistering && credentials.password !== credentials.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (isRegistering) {
      registerUser();
    } else {
      loginUser();
    }
  };

  const loginUser = () => {
    const url = `http://localhost:3000/users?username=${credentials.username}`;

    axios
      .get<UserCredentials[]>(url)
      .then((response) => {
        const users = response.data;

        if (users.length === 0) {
          alert('User does not exist.');
          return;
        }

        const user = users[0];
        if (user.password !== credentials.password) {
          alert('Password is incorrect.');
          return;
        }

        const token = 'simulated-token';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', token);

        alert('Login successful');
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error', error);
        alert('Login failed. Please try again.');
      });
  };

  const registerUser = () => {
    const checkUserUrl = `http://localhost:3000/users?username=${credentials.username}`;
    axios
      .get(checkUserUrl)
      .then((response) => {
        if (response.data.length > 0) {
          alert('User already exists.');
          return;
        }

        const registrationUrl = 'http://localhost:3000/users';
        axios
          .post(registrationUrl, { username: credentials.username, password: credentials.password })
          .then(() => {
            const token = 'simulated-token';
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', token);

            alert('Registration successful. You are now logged in.');
            navigate('/');
          })
          .catch((error) => {
            console.error('Registration error', error);
            alert('Registration failed. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Checking user existence failed', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleInputChange}
        margin="normal"
      />
      {isRegistering && (
        <TextField
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleInputChange}
          margin="normal"
        />
      )}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        {isRegistering ? 'Register' : 'Login'}
      </Button>
      <Button sx={{ mt: 2 }} color="secondary" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </Box>
  );
}
