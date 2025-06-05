import { 
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useNotificationList } from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Notifications() {
  const { data: notifications = [] } = useNotificationList();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    
    setTabValue(newValue);
  };

  const handleNotificationClick = (orderId: string | number) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" />
          {/* Add more tabs here if needed */}
        </Tabs>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <List>
          {notifications.map((notification: any) => (
            <Box key={notification?.id}>
              <ListItem 
                alignItems="flex-start" 
                onClick={() => handleNotificationClick(notification?.orderId)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div">
                      Order received - #{notification?.orderId}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification?.userName}
                      </Typography>
                      {" — " + (notification?.createdAt ? new Date(notification.createdAt).toLocaleString() : '')}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default Notifications;