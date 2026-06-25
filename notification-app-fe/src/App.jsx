import React from 'react';
import { useNotifications } from './hooks/useNotifications';
import { Container, Typography, Card, CardContent, Chip, Box, CircularProgress } from '@mui/material';

// grab the right color chip for the notification type
const getCategoryColor = (type) => {
  if (type === 'placement') return 'error'; 
  if (type === 'result') return 'warning';  
  return 'info';                            
};

export default function App() {
  const { notifications, loading } = useNotifications();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Top 10 most important unread notifications
      </Typography>

      {/* show loader while fetching */}
      {loading && <CircularProgress />}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
        {/* map out the top notifs into cards */}
        {notifications.map((notif, index) => (
          <Card key={notif.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">{notif.title}</Typography>
                <Chip 
                  label={notif.type.toUpperCase()} 
                  color={getCategoryColor(notif.type)} 
                  size="small" 
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {notif.message}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Rank: #{index + 1}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Score: {notif.score.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* edge case: no notifs */}
        {notifications.length === 0 && !loading && (
          <Typography>No notifications found.</Typography>
        )}
      </Box>
    </Container>
  );
}