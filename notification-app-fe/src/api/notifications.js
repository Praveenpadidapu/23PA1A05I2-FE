import { generateSampleNotifications } from '../data/notifications.js';

export function fetchNotifications({ page = 1, limit = 10, notification_type = 'all' } = {}) {
  let data = generateSampleNotifications();

  // Filter by notification type
  if (notification_type && notification_type !== 'all') {
    data = data.filter(n => n.type === notification_type);
  }

  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);

  return Promise.resolve({
    notifications: paginatedData,
    total: data.length,
    page,
    limit,
    totalPages: Math.ceil(data.length / limit)
  });
}
