import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Pagination } from '@mui/material';
import { fetchNotifications } from '../api/notifications';
import { createLogger } from 'logging-middleware';

const logger = createLogger('AllNotificationsView');

export default function AllNotificationsView() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      logger.info('Fetching all notifications', { page });
      const response = await fetchNotifications({ limit: 5, page, notification_type: 'all' });
      setNotifications(response.notifications);
      setTotalPages(response.totalPages);
    };

    loadData();
  }, [page]);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>All Notifications</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {notifications.map((item) => (
          <Card key={item.id} sx={{ opacity: item.read ? 0.6 : 1 }}>
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
                <Box sx={{ bgcolor: 'text.secondary', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  {item.type}
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
                {item.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
      </Box>
    </Box>
  );
}
