import { createLogger } from 'logging-middleware';
import { calculatePriorityScore } from './priorityScorer.js';

const logger = createLogger('PriorityInbox');

export class PriorityInbox {
  constructor(maxSize = 10) {
    this.maxSize = maxSize;
    this.notifications = [];
  }

  addNotification(notification) {
    if (notification.read) {
      // skip read notifications since we only care about unread
      logger.debug('Skipping read notification', { id: notification.id });
      return;
    }

    const score = calculatePriorityScore(notification);
    const item = { ...notification, score };

    this.notifications.push(item);

    // sort descending so the highest priority stays at the top
    this.notifications.sort((a, b) => b.score - a.score);

    // slice off anything beyond max size
    if (this.notifications.length > this.maxSize) {
      this.notifications = this.notifications.slice(0, this.maxSize);
    }

    logger.info('Added notification and updated top 10', { id: notification.id, score });
  }

  getTopNotifications() {
    logger.info('Retrieved top notifications', { count: this.notifications.length });
    return this.notifications;
  }
}
