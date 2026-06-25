import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { fetchNotifications } from '../api/notifications';
import { PriorityInbox } from '../utils/PriorityInbox';
import { createLogger } from 'logging-middleware';

const logger = createLogger('PriorityView');

export default function PriorityView() {
  const [inboxItems, setInboxItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState('all');
  const inboxRef = useRef(new PriorityInbox());

  useEffect(() => {
    // Re-initialize inbox when limit changes
    inboxRef.current = new PriorityInbox();
    inboxRef.current.k = limit;
    
    // Fetch and populate based on filterType
    const loadData = async () => {
      logger.info('Fetching priority notifications', { limit, filterType });
      const response = await fetchNotifications({ limit: 100, page: 1, notification_type: filterType });
      
      response.notifications.forEach(notif => {
        inboxRef.current.addNotification(notif);
      });
      setInboxItems(inboxRef.current.getTopNotifications());
    };

    loadData();

    // Mock streaming updates
    const intervalId = setInterval(() => {
      const newNotification = {
        id: String(Date.now() + Math.random()),
        type: ['placement', 'event', 'result'][Math.floor(Math.random() * 3)],
        title: 'New Live Update',
        message: 'This is a simulated incoming notification.',
        receivedAt: Date.now(),
        read: false
      };
      
      if (filterType === 'all' || newNotification.type === filterType) {
        logger.info('Received live notification in PriorityView', { type: newNotification.type });
        inboxRef.current.addNotification(newNotification);
        setInboxItems(inboxRef.current.getTopNotifications());
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [limit, filterType]);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter Type</InputLabel>
          <Select
            value={filterType}
            label="Filter Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="placement">Placement</MenuItem>
            <MenuItem value="result">Result</MenuItem>
            <MenuItem value="event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h5" gutterBottom>Priority Inbox (Top {limit})</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {inboxItems.map((item, index) => (
          <Card key={item.id} sx={{ opacity: item.read ? 0.6 : 1, position: 'relative' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" sx={{ fontWeight: item.read ? 'normal' : 'bold' }}>
                  {item.title}
                  {!item.read && (
                    <Box component="span" sx={{ ml: 1, color: 'white', bgcolor: 'error.main', fontSize: '0.7rem', px: 1, py: 0.5, borderRadius: 1 }}>
                      NEW
                    </Box>
                  )}
                </Typography>
                <Box sx={{ bgcolor: item.type === 'placement' ? '#d32f2f' : item.type === 'result' ? '#ed6c02' : '#2e7d32', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  {item.type}
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 1, mb: 2, color: 'text.secondary' }}>
                {item.message}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.disabled', fontSize: '0.85rem' }}>
                <Typography variant="caption">Rank: #{index + 1}</Typography>
                <Typography variant="caption">Score: {item.score.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
