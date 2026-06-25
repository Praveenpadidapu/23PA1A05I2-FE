import { useState, useEffect, useRef } from "react";
import { fetchNotifications } from "../api/notifications";
import { PriorityInbox } from "../utils/PriorityInbox";
import { createLogger } from "logging-middleware";

const logger = createLogger('useNotifications');

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // keeping the inbox instance in a ref so it doesn't reset on re-renders
  const inboxRef = useRef(new PriorityInbox(10));

  useEffect(() => {
    let intervalId;

    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchNotifications();
        
        // push initial data into inbox
        data.notifications.forEach(notif => {
          inboxRef.current.addNotification(notif);
        });
        
        // spread array so react picks up the state change
        setNotifications([...inboxRef.current.getTopNotifications()]);
        logger.info('Initial data loaded');

        // mocking a live stream of notifications every 5s
        let counter = 100;
        intervalId = setInterval(() => {
          const newNotification = {
            id: String(counter++),
            type: 'event', 
            title: `New Live Event ${counter}`,
            message: 'This is a new real-time notification.',
            receivedAt: Date.now(),
            read: false
          };
          
          inboxRef.current.addNotification(newNotification);
          
          setNotifications([...inboxRef.current.getTopNotifications()]);
          logger.info('Simulated new notification added');
        }, 5000);

      } catch (error) {
        logger.error('Failed to load notifications', { error: error.message });
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return { notifications, loading, error: false };
}
