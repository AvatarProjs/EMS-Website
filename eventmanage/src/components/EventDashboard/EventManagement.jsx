import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  TextField,
  Grid,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Alert,
  ThemeProvider,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ListAlt as ListAltIcon,
  Add as AddIcon,
  EventNote as EventNoteIcon,
  ConfirmationNumber as TicketIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Map from "./Map";
import EventModal from "./EventModal";
import theme from "../../theme";

// Styled components
const StyledTabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: "100%",
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  border: "1px dashed rgba(0, 0, 0, 0.12)",
  borderRadius: "16px",
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: "200px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "rgba(29, 155, 240, 0.04)",
  },
}));

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

const EventManagement = () => {
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    location: "",
    ticketType: "free",
    banner: null,
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Open modal for creating event
  const handleCreateEvent = () => {
    setEditMode(false);
    setEventData({
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      location: "",
      ticketType: "free",
      banner: null,
    });
    setModalOpen(true);
  };

  // Open modal for editing event
  const handleEditEvent = (event) => {
    setEditMode(true);
    setEventData(event);
    setModalOpen(true);
  };

  // Handle save event
  const handleSaveEvent = () => {
    // Here you would typically save to a database or state management
    setSnackbarMessage(
      editMode ? "Event updated successfully!" : "Event created successfully!"
    );
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setModalOpen(false);
  };

  // Handle event data change
  const handleEventDataChange = (field, value) => {
    setEventData({
      ...eventData,
      [field]: value,
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Sidebar width calculations
  const sidebarWidth = 240;
  const collapsedWidth = 58;
  const currentSidebarWidth = sidebarOpen ? sidebarWidth : collapsedWidth;

  return (
    <ThemeProvider theme={theme}>
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
              <Link to="/profile">
                                                                            
              
                                                        
                                  
              <IconButton
                sx={{
                  bgcolor: "#f4f9ff",
                  "&:hover": { bgcolor: "#e6f2ff" },
                }}
              >
                <PersonIcon />
              </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* IMPROVED SIDEBAR */}
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
                px: 0.5,
                width: "100%",
              }}
            >
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
                  <ListAltIcon />
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
                      <Link to="/dashboard/home">
                                          
                      Event List & Details 
                      
                      </Link>
                      
                    </Typography>
                  }
                  sx={{
                    ml: sidebarOpen ? 0 : -4,
                    transition: "margin-left 0.25s ease-in-out",
                  }}
                />
              </ListItem>
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
                  <AddIcon />
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
                      Create/Edit Event
                    </Typography>
                  }
                  sx={{
                    ml: sidebarOpen ? 0 : -4,
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
                    ml: sidebarOpen ? 0 : -4,
                    transition: "margin-left 0.25s ease-in-out",
                  }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Main content */}
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
              {editMode ? "Edit Event" : "Create New Event"}
            </Typography>

            <Card sx={cardStyle}>
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    p: 2.5,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mr: 2 }}
                  >
                    Last saved 2 minutes ago - Draft
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    sx={{
                      mr: 1.5,
                      borderRadius: 28,
                      px: 2.5,
                      py: 0.75,
                      borderColor: "rgba(0, 0, 0, 0.12)",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "rgba(0, 0, 0, 0.24)",
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveEvent}
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
                    Save Event
                  </Button>
                </Box>

                <Box sx={{ px: 2.5 }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="event tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                      "& .MuiTab-root": {
                        minHeight: "56px",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                      },
                    }}
                  >
                    <Tab label="Basic Details" />
                    <Tab label="Location & Time" />
                    <Tab label="Tickets" />
                    <Tab label="Media" />
                  </Tabs>
                </Box>

                {/* Basic Details Tab */}
                <StyledTabPanel hidden={tabValue !== 0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Title"
                        placeholder="Enter event title"
                        fullWidth
                        value={eventData.title}
                        onChange={(e) =>
                          handleEventDataChange("title", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Description"
                        placeholder="Describe your event"
                        fullWidth
                        multiline
                        rows={4}
                        value={eventData.description}
                        onChange={(e) =>
                          handleEventDataChange("description", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Start Date & Time"
                          value={eventData.startDate}
                          onChange={(newValue) =>
                            handleEventDataChange("startDate", newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="End Date & Time"
                          value={eventData.endDate}
                          onChange={(newValue) =>
                            handleEventDataChange("endDate", newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Venue Location"
                        placeholder="Enter venue address"
                        fullWidth
                        value={eventData.location}
                        onChange={(e) =>
                          handleEventDataChange("location", e.target.value)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                sx={{
                                  color: theme.palette.primary.main,
                                  "&:hover": {
                                    bgcolor: "rgba(25, 118, 210, 0.08)",
                                  },
                                }}
                              >
                                <LocationIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "&.Mui-focused fieldset": {
                              borderColor: theme.palette.primary.main,
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          height: "300px",
                          mt: 1,
                          borderRadius: "16px",
                          overflow: "hidden",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        <Map />
                      </Box>
                    </Grid>
                  </Grid>
                </StyledTabPanel>

                {/* Location & Time Tab */}
                <StyledTabPanel hidden={tabValue !== 1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 3 }}
                      >
                        Location & Time Details
                      </Typography>
                    </Grid>

                    {/* Date and Time Section */}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          mb: 4,
                          p: 2.5,
                          bgcolor: "rgba(25, 118, 210, 0.04)",
                          borderRadius: "12px",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="medium"
                          sx={{ mb: 2, display: "flex", alignItems: "center" }}
                        >
                          <CalendarIcon
                            sx={{ mr: 1, color: theme.palette.primary.main }}
                          />
                          Event Schedule
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                label="Start Date & Time"
                                value={eventData.startDate}
                                onChange={(newValue) =>
                                  handleEventDataChange("startDate", newValue)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="Select start date and time"
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        "&.Mui-focused fieldset": {
                                          borderColor:
                                            theme.palette.primary.main,
                                          borderWidth: "2px",
                                        },
                                      },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                label="End Date & Time"
                                value={eventData.endDate}
                                onChange={(newValue) =>
                                  handleEventDataChange("endDate", newValue)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="Select end date and time"
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        "&.Mui-focused fieldset": {
                                          borderColor:
                                            theme.palette.primary.main,
                                          borderWidth: "2px",
                                        },
                                      },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={eventData.isAllDay || false}
                                  onChange={(e) =>
                                    handleEventDataChange(
                                      "isAllDay",
                                      e.target.checked
                                    )
                                  }
                                  color="primary"
                                />
                              }
                              label="All-day event"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            {/* <FormControlLabel
                              control={
                                <Switch
                                  checked={eventData.isRecurring || false}
                                  onChange={(e) =>
                                    handleEventDataChange(
                                      "isRecurring",
                                      e.target.checked
                                    )
                                  }
                                  color="primary"
                                />
                              }
                              label="Recurring event"
                            /> */}
                          </Grid>

                          {eventData.isRecurring && (
                            <Grid item xs={12}>
                              <TextField
                                select
                                label="Recurrence Pattern"
                                value={eventData.recurrencePattern || "weekly"}
                                onChange={(e) =>
                                  handleEventDataChange(
                                    "recurrencePattern",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                  },
                                }}
                              >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                              </TextField>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Grid>

                    {/* Location Section */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 4 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="medium"
                          sx={{ mb: 2, display: "flex", alignItems: "center" }}
                        >
                          <LocationIcon
                            sx={{ mr: 1, color: theme.palette.primary.main }}
                          />
                          Event Location
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              label="Venue Name"
                              placeholder="Enter venue name"
                              fullWidth
                              value={eventData.venueName || ""}
                              onChange={(e) =>
                                handleEventDataChange(
                                  "venueName",
                                  e.target.value
                                )
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              label="Address"
                              placeholder="Enter venue address"
                              fullWidth
                              value={eventData.location}
                              onChange={(e) =>
                                handleEventDataChange(
                                  "location",
                                  e.target.value
                                )
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      sx={{
                                        color: theme.palette.primary.main,
                                        "&:hover": {
                                          bgcolor: "rgba(25, 118, 210, 0.08)",
                                        },
                                      }}
                                    >
                                      <LocationIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              label="City"
                              placeholder="Enter city"
                              fullWidth
                              value={eventData.city || ""}
                              onChange={(e) =>
                                handleEventDataChange("city", e.target.value)
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Zip / Postal Code"
                              placeholder="Enter postal code"
                              fullWidth
                              value={eventData.postalCode || ""}
                              onChange={(e) =>
                                handleEventDataChange(
                                  "postalCode",
                                  e.target.value
                                )
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                    borderWidth: "2px",
                                  },
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Box
                              sx={{
                                height: "300px",
                                mt: 1,
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                              }}
                            >
                              <Map />
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={eventData.isOnline || false}
                                  onChange={(e) =>
                                    handleEventDataChange(
                                      "isOnline",
                                      e.target.checked
                                    )
                                  }
                                  color="primary"
                                />
                              }
                              label="This is an online event"
                            />
                          </Grid>

                          {eventData.isOnline && (
                            <Grid item xs={12}>
                              <TextField
                                label="Online Event Link"
                                placeholder="Enter meeting link (Zoom, Teams, etc.)"
                                fullWidth
                                value={eventData.onlineLink || ""}
                                onChange={(e) =>
                                  handleEventDataChange(
                                    "onlineLink",
                                    e.target.value
                                  )
                                }
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.main,
                                      borderWidth: "2px",
                                    },
                                  },
                                }}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Grid>

                    {/* Additional Information */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="medium"
                          sx={{ mb: 2 }}
                        >
                          Additional Information
                        </Typography>

                        <TextField
                          label="Special Instructions for Attendees"
                          placeholder="Parking details, entry instructions, etc."
                          fullWidth
                          multiline
                          rows={3}
                          value={eventData.specialInstructions || ""}
                          onChange={(e) =>
                            handleEventDataChange(
                              "specialInstructions",
                              e.target.value
                            )
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.main,
                                borderWidth: "2px",
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </StyledTabPanel>

                {/* Tickets Tab */}
                <StyledTabPanel hidden={tabValue !== 2}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                    Ticket Type
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <ToggleButtonGroup
                      value={eventData.ticketType}
                      exclusive
                      onChange={(e, newValue) =>
                        handleEventDataChange("ticketType", newValue)
                      }
                      sx={{ width: "100%" }}
                      color="primary"
                    >
                      <ToggleButton
                        value="free"
                        sx={{
                          flex: 1,
                          py: 3,
                          borderRadius: "12px 0 0 12px",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          "&.Mui-selected": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.12)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <TicketIcon
                            sx={{
                              fontSize: 28,
                              color:
                                eventData.ticketType === "free"
                                  ? theme.palette.primary.main
                                  : "inherit",
                            }}
                          />
                          <Typography sx={{ mt: 1, fontWeight: 500 }}>
                            Free Event
                          </Typography>
                        </Box>
                      </ToggleButton>
                      <ToggleButton
                        value="paid"
                        sx={{
                          flex: 1,
                          py: 3,
                          borderRadius: "0 12px 12px 0",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          "&.Mui-selected": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: "rgba(25, 118, 210, 0.12)",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: "bold",
                              color:
                                eventData.ticketType === "paid"
                                  ? theme.palette.primary.main
                                  : "inherit",
                            }}
                          >
                            $
                          </Typography>
                          <Typography sx={{ mt: 1, fontWeight: 500 }}>
                            Paid Event
                          </Typography>
                        </Box>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </StyledTabPanel>

                {/* Media Tab */}
                <StyledTabPanel hidden={tabValue !== 3}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                    Event Banner
                  </Typography>
                  <ImageUploadBox
                    onClick={() =>
                      document.getElementById("banner-upload").click()
                    }
                  >
                    <UploadIcon
                      sx={{ fontSize: 40, color: theme.palette.primary.main }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, color: "text.secondary" }}
                    >
                      Drag and drop your image here, or click to select
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      Recommended size: 1200 x 600 px (16:9 ratio)
                    </Typography>
                    <input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleEventDataChange("banner", e.target.files[0])
                      }
                    />
                  </ImageUploadBox>
                </StyledTabPanel>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Event Modal */}
        <EventModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEvent}
          event={eventData}
          onChange={handleEventDataChange}
          isEdit={editMode}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default EventManagement;
