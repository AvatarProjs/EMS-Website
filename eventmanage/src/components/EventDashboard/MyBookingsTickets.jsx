import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  Grid, 
  Button, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  Search as SearchIcon,
  QrCode as QrCodeIcon,
  FileDownload as FileDownloadIcon,
  ListAlt as ListAltIcon,
  Add as AddIcon,
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const MyBookingsTickets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [status, setStatus] = useState('All Status');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleShowQR = (event) => {
    console.log('Show QR', event);
  };

  const handleDownload = (event) => {
    console.log('Download ticket', event);
  };

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'Convention Center, New York',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      date: 'July 1-3, 2024',
      time: 'All Day',
      location: 'Design Studio, San Francisco',
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Modern Art Exhibition',
      date: 'April 5, 2024',
      time: '6:00 PM',
      location: 'Tech Hub, Seattle',
      status: 'Upcoming'
    }
  ];

  // Sidebar width calculations
  const sidebarWidth = 240;
  const collapsedWidth = 58;
  const currentSidebarWidth = sidebarOpen ? sidebarWidth : collapsedWidth;

  // Common card style for consistent visual enhancement
  const cardStyle = {
    borderRadius: 16, 
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      bgcolor: '#f9fafb'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        px: 2.5,
        py: 1.5,
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        bgcolor: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        zIndex: 1100
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Event Management
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <IconButton sx={{ 
            bgcolor: '#f4f9ff', 
            '&:hover': { bgcolor: '#e6f2ff' }
          }}>
            <CalendarIcon />
          </IconButton>
          <Link to="/profile">
                                                              
           
                                                                                    
                                                              
          <IconButton sx={{ 
            bgcolor: '#f4f9ff', 
            '&:hover': { bgcolor: '#e6f2ff' }
          }}>
            <PersonIcon />
          </IconButton>
          </Link>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box 
          component="nav" 
          sx={{ 
            width: currentSidebarWidth, 
            flexShrink: 0, 
            bgcolor: '#ffffff', 
            borderRight: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: sidebarOpen ? 'auto' : 'visible',
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.03)',
            transition: 'width 0.25s ease-in-out',
            zIndex: 1000,
            position: 'relative',
            paddingTop: 1,
            paddingBottom: 1
          }}
        >
          <List component="nav" aria-label="main navigation" sx={{ 
            py: 0.5,
            px: 0.5,
            width: '100%'
          }}>
            <ListItem 
              button 
              sx={{ 
                borderRadius: 2, 
                mb: 0.5,
                '&:hover': { bgcolor: '#f5f8fa' },
                px: 1.5,
                minHeight: 46,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'flex',
                transition: 'all 0.25s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36, 
                fontSize: '1.2rem', 
              }}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    sx={{ 
                      opacity: sidebarOpen ? 1 : 0,
                      transition: 'opacity 0.25s ease-in-out',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                     <Link to="/dashboard/home">
                                                              
                    Event List & Details 
                                          
                    </Link>
                  </Typography>
                } 
                sx={{ 
                  ml: sidebarOpen ? 0 : -4,
                  transition: 'margin-left 0.25s ease-in-out',
                }}
              />
            </ListItem>
            <ListItem 
              button 
              sx={{ 
                borderRadius: 2, 
                mb: 0.5,
                '&:hover': { bgcolor: '#f5f8fa' },
                px: 1.5,
                minHeight: 46,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'flex',
                transition: 'all 0.25s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36,
                fontSize: '1.2rem', 
              }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    sx={{ 
                      opacity: sidebarOpen ? 1 : 0,
                      transition: 'opacity 0.25s ease-in-out', 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <Link to="/dashboard/edit-event">
                                                              
                    Create/Edit Event
                                          
                    </Link>
            
                  </Typography>
                } 
                sx={{ 
                  ml: sidebarOpen ? 0 : -4,
                  transition: 'margin-left 0.25s ease-in-out',
                }}
              />
            </ListItem>
            <ListItem 
              button 
              selected
              sx={{ 
                borderRadius: 2, 
                bgcolor: '#f4f9ff',
                '&:hover': { bgcolor: '#e6f2ff' },
                px: 1.5,
                minHeight: 46,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'flex',
                transition: 'all 0.25s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 36,
                color: '#1976d2',
                fontSize: '1.2rem', 
              }}>
                <TicketIcon />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography 
                    color="primary"
                    fontWeight="medium"
                    sx={{ 
                      opacity: sidebarOpen ? 1 : 0,
                      transition: 'opacity 0.25s ease-in-out',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Bookings & Tickets
                  </Typography>
                } 
                sx={{ 
                  ml: sidebarOpen ? 0 : -4,
                  transition: 'margin-left 0.25s ease-in-out',
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Main content */}
        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: 3, 
          overflow: 'auto',
          transition: 'all 0.25s ease-in-out',
        }}>
          <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
            My Bookings & Tickets
          </Typography>

          {/* Search and Filter */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3,
            flexWrap: 'wrap'
          }}>
            <TextField
              placeholder="Search events..."
              variant="outlined"
              sx={{ 
                flexGrow: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
                displayEmpty
                sx={{ 
                  borderRadius: 2,
                  height: '100%',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.12)'
                  }
                }}
              >
                <MenuItem value="All Status">All Status</MenuItem>
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Past">Past</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ 
                width: 160,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
              InputProps={{
                sx: {
                  height: '100%',
                }
              }}
            />
          </Box>

          {/* Events List */}
          <Grid container spacing={3}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card sx={cardStyle}>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.date} • {event.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {event.location}
                        </Typography>
                      </Box>
                      <Chip 
                        label={event.status} 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(46, 125, 50, 0.1)', 
                          color: '#2e7d32',
                          fontWeight: 'medium',
                          borderRadius: 8,
                          py: 0.5
                        }} 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          onClick={() => handleShowQR(event)}
                          startIcon={<QrCodeIcon />}
                          variant="outlined"
                          sx={{ 
                            borderRadius: 8,
                            '&:hover': {
                              bgcolor: 'rgba(25, 118, 210, 0.08)'
                            }
                          }}
                        >
                          Show QR
                        </Button>
                        <Button
                          onClick={() => handleDownload(event)}
                          startIcon={<FileDownloadIcon />}
                          variant="contained"
                          sx={{ 
                            borderRadius: 8,
                            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                            '&:hover': {
                              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                            }
                          }}
                        >
                          Download
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBookingsTickets;