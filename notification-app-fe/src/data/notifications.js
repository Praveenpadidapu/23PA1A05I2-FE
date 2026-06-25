export const generateSampleNotifications = () => {
  const now = Date.now();
  
  return [
    {
      id: '1',
      type: 'event',
      title: 'Annual Tech Symposium',
      message: 'Join us for the annual tech symposium next week.',
      receivedAt: now - 1000 * 60 * 60 * 2, // 2 hours ago
      read: false
    },
    {
      id: '2',
      type: 'placement',
      title: 'Google Campus Drive',
      message: 'Google is visiting our campus for software engineer roles.',
      receivedAt: now - 1000 * 60 * 30, // 30 mins ago
      read: false
    },
    {
      id: '3',
      type: 'result',
      title: 'Semester 6 Results Declared',
      message: 'Your results for the 6th semester are now available on the portal.',
      receivedAt: now - 1000 * 60 * 60 * 24, // 1 day ago
      read: true // Should be filtered out
    },
    {
      id: '4',
      type: 'result',
      title: 'Mid-term Scores Updated',
      message: 'Scores for CS301 are updated.',
      receivedAt: now - 1000 * 60 * 45, // 45 mins ago
      read: false
    },
    {
      id: '5',
      type: 'placement',
      title: 'Microsoft Internship',
      message: 'Last day to apply for Microsoft summer internship.',
      receivedAt: now - 1000 * 60 * 60 * 5, // 5 hours ago
      read: false
    },
    {
      id: '6',
      type: 'event',
      title: 'Hackathon 2026',
      message: 'Register for the 48-hour coding hackathon.',
      receivedAt: now - 1000 * 60 * 10, // 10 mins ago
      read: false
    },
    {
      id: '7',
      type: 'event',
      title: 'Guest Lecture on AI',
      message: 'Guest lecture by industry experts in Hall A.',
      receivedAt: now - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      read: false
    },
    {
      id: '8',
      type: 'placement',
      title: 'Amazon Interview Shortlist',
      message: 'Check if you are shortlisted for the Amazon interviews tomorrow.',
      receivedAt: now - 1000 * 60 * 5, // 5 mins ago
      read: false
    },
    {
      id: '9',
      type: 'result',
      title: 'Practical Exam Grades',
      message: 'Grades for the lab exams have been posted.',
      receivedAt: now - 1000 * 60 * 60 * 12, // 12 hours ago
      read: false
    },
    {
      id: '10',
      type: 'placement',
      title: 'Startup Fair',
      message: '15 startups are hiring for immediate roles.',
      receivedAt: now - 1000 * 60 * 60 * 48, // 48 hours ago
      read: false
    },
    {
      id: '11',
      type: 'event',
      title: 'Alumni Meet',
      message: 'Annual alumni networking event this weekend.',
      receivedAt: now - 1000 * 60 * 60 * 1.5, // 1.5 hours ago
      read: false
    },
    {
      id: '12',
      type: 'result',
      title: 'Re-evaluation Results',
      message: 'Re-evaluation results for last semester are out.',
      receivedAt: now - 1000 * 60 * 2, // 2 mins ago
      read: false
    }
  ];
};
