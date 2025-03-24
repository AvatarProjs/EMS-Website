import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Container,
  CardMedia,
  CardActions,
  Tooltip,
} from "@mui/material";
import {
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  ListAlt as ListAltIcon,
  Edit as EditIcon,
  EventNote as EventNoteIcon,
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EventDashboard = () => {
  const [timeRange, setTimeRange] = useState("7");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data for the chart
  const chartData = [
    { name: "Mon", registrations: 120, revenue: 150 },
    { name: "Tue", registrations: 130, revenue: 200 },
    { name: "Wed", registrations: 100, revenue: 130 },
    { name: "Thu", registrations: 130, revenue: 160 },
    { name: "Fri", registrations: 90, revenue: 110 },
    { name: "Sat", registrations: 220, revenue: 240 },
  ];

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      date: "March 15, 2024",
      time: "9:00 AM",
      registered: 200,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "July 1-3, 2024",
      time: "All Day",
      registered: 1500,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Modern Art Exhibition",
      date: "April 5, 2024",
      time: "6:00 PM",
      registered: 150,
      image:
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  // Common card style for consistent visual enhancement
  const cardStyle = {
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
    },
  };

  // Sidebar width calculations - IMPROVED FOR BETTER TRANSITIONS
  const sidebarWidth = 240; // Slightly wider for better text display
  const collapsedWidth = 58; // Slightly narrower for icon-only view
  const currentSidebarWidth = sidebarOpen ? sidebarWidth : collapsedWidth;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "#f9fafb", // Background color for the entire app
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.5,
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          bgcolor: "#fff",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          zIndex: 1100,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Tooltip title="Calendar">
            <IconButton
              sx={{
                bgcolor: "#f4f9ff",
                "&:hover": { bgcolor: "#e6f2ff" },
              }}
            >
              <CalendarIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              sx={{
                bgcolor: "#f4f9ff",
                "&:hover": { bgcolor: "#e6f2ff" },
              }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* IMPROVED SIDEBAR - Better transitions and spacing */}
        <Box
          component="nav"
          sx={{
            width: currentSidebarWidth,
            flexShrink: 0,
            bgcolor: "#ffffff",
            borderRight: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: sidebarOpen ? "auto" : "visible",
            boxShadow: "4px 0 10px rgba(0, 0, 0, 0.03)",
            transition: "width 0.25s ease-in-out",
            zIndex: 1000,
            position: "relative",
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <List
            component="nav"
            aria-label="main navigation"
            sx={{
              py: 0.5,
              px: 0.5, // Add padding to list to reduce space between items and border
              width: "100%",
            }}
          >
            <ListItem
              button
              selected
              sx={{
                borderRadius: "8px",
                mb: 0.5,
                bgcolor: "#f4f9ff",
                "&:hover": { bgcolor: "#e6f2ff" },
                px: 1.5,
                minHeight: 46,
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "flex",
                transition: "all 0.25s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: "#1976d2",
                  fontSize: "1.2rem",
                }}
              >
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    color="primary"
                    fontWeight="medium"
                    sx={{
                      opacity: sidebarOpen ? 1 : 0,
                      transition: "opacity 0.25s ease-in-out",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Event List & Details
                  </Typography>
                }
                sx={{
                  ml: sidebarOpen ? 0 : -4, // Move text off-screen when collapsed
                  transition: "margin-left 0.25s ease-in-out",
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{
                borderRadius: "8px",
                mb: 0.5,
                "&:hover": { bgcolor: "#f5f8fa" },
                px: 1.5,
                minHeight: 46,
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "flex",
                transition: "all 0.25s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  fontSize: "1.2rem",
                }}
              >
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      opacity: sidebarOpen ? 1 : 0,
                      transition: "opacity 0.25s ease-in-out",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Link to="/dashboard/edit-event">Create/Edit Event</Link>
                  </Typography>
                }
                sx={{
                  ml: sidebarOpen ? 0 : -4, // Move text off-screen when collapsed
                  transition: "margin-left 0.25s ease-in-out",
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{
                borderRadius: "8px",
                "&:hover": { bgcolor: "#f5f8fa" },
                px: 1.5,
                minHeight: 46,
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "flex",
                transition: "all 0.25s ease-in-out",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  fontSize: "1.2rem",
                }}
              >
                <TicketIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      opacity: sidebarOpen ? 1 : 0,
                      transition: "opacity 0.25s ease-in-out",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Link to="/dashboard/bookings">
                                                              
                    Bookings & Tickets
                                                              
                    </Link>
                    
                  </Typography>
                }
                sx={{
                  ml: sidebarOpen ? 0 : -4, // Move text off-screen when collapsed
                  transition: "margin-left 0.25s ease-in-out",
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Main content - ADJUSTED SPACING */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: "auto",
            transition: "all 0.25s ease-in-out",
            ml: 0,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Dashboard
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Total Events
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                        sx={{ mt: 0.5 }}
                      >
                        48
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <EventNoteIcon color="primary" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Total Attendees
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                        sx={{ mt: 0.5 }}
                      >
                        2,847
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PersonIcon color="primary" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Tickets Sold
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                        sx={{ mt: 0.5 }}
                      >
                        3,621
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TicketIcon color="primary" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Revenue
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        fontWeight="bold"
                        sx={{ mt: 0.5 }}
                      >
                        $124,200
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MoneyIcon color="primary" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Rest of the component remains unchanged... */}
          {/* Upcoming Events */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2" fontWeight="bold">
                Upcoming Events
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 28,
                  px: 3,
                  py: 0.75,
                  boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                <Link
                  to="/dashboard/edit-event"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Create New Event
                </Link>
              </Button>
            </Box>
            <Grid container spacing={3}>
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{
                      ...cardStyle,
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image}
                      alt={event.title}
                      sx={{
                        transition: "transform 0.5s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {event.date} • {event.time}
                      </Typography>
                      <Box sx={{ mt: 1.5 }}>
                        <Chip
                          label={`${event.registered} Registered`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(46, 125, 50, 0.1)",
                            color: "#2e7d32",
                            fontWeight: "medium",
                            borderRadius: 8,
                            py: 0.5,
                          }}
                        />
                      </Box>
                    </CardContent>
                    <Box
                      sx={{
                        p: 1.5,
                        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                        display: "flex",
                        justifyContent: "flex-end",
                        bgcolor: "rgba(0, 0, 0, 0.01)",
                      }}
                    >
                      <Button
                        color="primary"
                        startIcon={<EditIcon />}
                        sx={{
                          fontWeight: "medium",
                          borderRadius: 8,
                          "&:hover": {
                            bgcolor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Event Analytics */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2" fontWeight="bold">
                Event Analytics
              </Typography>
              <FormControl size="small" sx={{ minWidth: 135 }}>
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  displayEmpty
                  sx={{
                    borderRadius: 8,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <MenuItem value="7">Last 7 days</MenuItem>
                  <MenuItem value="30">Last 30 days</MenuItem>
                  <MenuItem value="90">Last 90 days</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Card
              sx={{
                ...cardStyle,
                p: 2.5,
              }}
            >
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(0, 0, 0, 0.06)"
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: 12,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        border: "none",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Line
                      type="monotone"
                      dataKey="registrations"
                      stroke="#1D9BF0"
                      activeDot={{ r: 8 }}
                      name="Registrations"
                      strokeWidth={3}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4CAF50"
                      name="Revenue"
                      strokeWidth={3}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDashboard;
