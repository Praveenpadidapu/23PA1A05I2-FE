import { generateSampleNotifications } from '../data/notifications.js';

export function fetchNotifications() {
  return Promise.resolve({
    notifications: generateSampleNotifications()
  });
}
