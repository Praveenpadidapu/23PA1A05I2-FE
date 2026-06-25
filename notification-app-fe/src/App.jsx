import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import PriorityView from './components/PriorityView';
import AllNotificationsView from './components/AllNotificationsView';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Priority Notifications" />
          <Tab label="All Notifications" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <PriorityView />}
      {tabIndex === 1 && <AllNotificationsView />}
    </Container>
  );
}

export default App;