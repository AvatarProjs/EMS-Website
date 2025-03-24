import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ForgotPasswordPage from './components/ForgotPass';
import ResetPasswordPage from './components/ResetPass';
import { ThemeProvider, CssBaseline } from '@mui/material';
import SignupPage from './components/SignupPage';
import SignInPage from './components/SignInPage';
import EventDashboard from './components/EventDashboard/EventDashboard';
import EditEvent from './components/EventDashboard/EventManagement';
import BookingsTickets from './components/EventDashboard/MyBookingsTickets'; // Renamed for clarity
import ProfileSettings from './components/ProfileSettings';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard/home" element={<EventDashboard />} />
          <Route path="/dashboard/edit-event" element={<EditEvent />} />
          <Route path="/dashboard/bookings" element={<BookingsTickets />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;