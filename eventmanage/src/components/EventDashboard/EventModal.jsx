// src/components/EventModal.jsx
import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  IconButton
} from '@mui/material';
import { 
  Close as CloseIcon,
  ConfirmationNumber as TicketIcon,
  Upload as UploadIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Map from './Map';

const EventModal = ({ open, onClose, onSave, event, onChange, isEdit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isEdit ? 'Edit Event' : 'Create New Event'}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Title"
              placeholder="Enter event title"
              fullWidth
              value={event.title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event Description"
              placeholder="Describe your event"
              fullWidth
              multiline
              rows={4}
              value={event.description}
              onChange={(e) => onChange('description', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Date & Time"
                value={event.startDate}
                onChange={(newValue) => onChange('startDate', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="End Date & Time"
                value={event.endDate}
                onChange={(newValue) => onChange('endDate', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Venue Location"
              placeholder="Enter venue address"
              fullWidth
              value={event.location}
              onChange={(e) => onChange('location', e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <LocationIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ height: '200px' }}>
              <Map />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Ticket Type</Typography>
            <ToggleButtonGroup
              value={event.ticketType}
              exclusive
              onChange={(e, newValue) => onChange('ticketType', newValue || event.ticketType)}
              sx={{ width: '100%', mt: 1 }}
            >
              <ToggleButton value="free" sx={{ flex: 1, py: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TicketIcon />
                  <Typography sx={{ mt: 1 }}>Free Event</Typography>
                </Box>
              </ToggleButton>
              <ToggleButton value="paid" sx={{ flex: 1, py: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">$</Typography>
                  <Typography sx={{ mt: 1 }}>Paid Event</Typography>
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Event Banner</Typography>
            <Box
              sx={{
                border: '1px dashed #ccc',
                borderRadius: '4px',
                p: 3,
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: '150px'
              }}
              onClick={() => document.getElementById('modal-banner-upload').click()}
            >
              <UploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Drag and drop your image here, or click to select
              </Typography>
              <input
                id="modal-banner-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onChange('banner', e.target.files[0])}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={onSave}
          disabled={!event.title || !event.startDate}
        >
          {isEdit ? 'Update Event' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;