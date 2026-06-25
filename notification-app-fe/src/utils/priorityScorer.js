import { createLogger } from 'logging-middleware';

const logger = createLogger('PriorityScorer');

// weights for different types of notifs
const CATEGORY_WEIGHTS = {
  placement: 100, 
  result: 50,     
  event: 10       
};

export const calculatePriorityScore = (notification) => {
  const baseWeight = CATEGORY_WEIGHTS[notification.type] || 0;
  
  // figure out age in hours
  const ageInMs = Date.now() - notification.receivedAt;
  const ageInHours = Math.max(0, ageInMs / (1000 * 60 * 60));
  
  // recency decays over time. add 1 so we don't divide by zero
  const recencyScore = 100 / (ageInHours + 1);
  
  // combine them. category is the main driver, recency is just the tiebreaker
  const totalScore = baseWeight + recencyScore;
  
  logger.debug('Calculated priority score', { id: notification.id, totalScore });
  
  return totalScore;
};
