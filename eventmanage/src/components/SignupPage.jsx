import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton, 
  Tabs, 
  Tab, 
  Paper,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Email, 
  Lock 
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Same styled components as before...
const BlueSide = styled(Box)(({ theme }) => ({
  backgroundColor: '#59BBF6',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(6),
  overflow: 'hidden',
}));

const FloatingShape = styled(Box)(({ 
  size = 100, 
  top, 
  left, 
  right, 
  bottom, 
  rotate = 0,
  opacity = 0.2
}) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '10px',
  top,
  left,
  right,
  bottom,
  transform: `rotate(${rotate}deg)`,
  filter: 'blur(4px)',
  opacity,
}));

const FormSide = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  margin: '0 auto',
}));

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Sign In, 1 for Sign Up
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 1) {
      // Navigate to sign in page when "Sign In" tab is clicked
      navigate('/signin');
    } else {
      setTabValue(newValue);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/signin');
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left side with illustrations */}
      <Grid item xs={12} md={6}>
        <BlueSide>
          {/* Floating geometric shapes */}
          <FloatingShape size={160} top="20%" left="20%" rotate={12} />
          <FloatingShape size={80} top="30%" right="20%" rotate={-12} />
          <FloatingShape size={60} bottom="20%" left="30%" rotate={45} />
          <FloatingShape size={50} top="15%" right="15%" rotate={-12} />
          <FloatingShape size={90} bottom="15%" right="20%" rotate={12} />
          <FloatingShape size={40} top="50%" left="15%" rotate={-45} />
          
          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1, mt: 'auto' }}>
            <Typography variant="h3" component="h1" color="white" fontWeight="bold">
              Create Your Account
            </Typography>
            <Typography variant="h6" color="white" sx={{ mt: 2, opacity: 0.9 }}>
              Join our community and start organizing or attending amazing events.
            </Typography>
          </Box>
        </BlueSide>
      </Grid>

      {/* Right side with form */}
      <Grid item xs={12} md={6}>
        <FormSide>
          <FormContainer>
            {/* Tabs */}
            <Paper elevation={0} sx={{ mb: 4 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
            </Paper>

            {/* Form fields */}
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full name"
                name="name"
                autoComplete="name"
                placeholder="Enter your full name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                placeholder="Create a password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 2, 
                  mb: 2, 
                  py: 1.5,
                  backgroundColor: '#1D9BF0',
                  '&:hover': {
                    backgroundColor: '#0E87D3',
                  }
                }}
              >
                Create account
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    href="#" 
                    onClick={handleSignIn}
                    sx={{ color: '#1D9BF0' }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </FormContainer>
        </FormSide>
      </Grid>
    </Grid>
  );
};

export default SignupPage;