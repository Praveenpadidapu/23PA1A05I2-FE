# Campus Notification System - Frontend

This repository contains the Priority Inbox feature for the Campus Notification System.

## Setup Instructions

1. Ensure you have Node.js installed.
2. Install dependencies:
   ```bash
   cd notification-app-fe
   npm install
   ```
3. Start the application:
   ```bash
   cd notification-app-fe
   npm run dev
   ```

*(Work in progress...)*

## Stage 1 Features
- **Priority Scoring:** placement > result > event, combined with a decay-based recency score.
- **Custom Logging Middleware:** Extensively used across scoring handling.

- **Top 10 Array Ranking:** Efficient top 10 bounds maintenance without heavy full heap logic.

- **Streaming Updates:** Dynamic continuous fetch logic integrated directly with React Hooks.
- **User Interface:** Material UI implemented for a clean, deterministic Priority Inbox view.

## Screenshots & Documentation
- Please refer to the `screenshots/` directory for visual output of the application prioritizing the notifications correctly.
- Check out `Notification_System_Design.md` for a complete system design breakdown detailing Time and Space complexity, assumption checks, and data structure choices.

## Stage 2 Features
- **Port Constraints:** The React application has been securely configured to run exclusively on `http://localhost:3000`.
- **Dual Views & Routing:** Migrated the UI to use Material UI Tabs, allowing users to seamlessly toggle between the Priority Inbox and the All Notifications history view.
- **Frontend API Simulation:** Upgraded the simulated frontend API layer to support robust query parameters (`limit`, `page`, and `notification_type`) which the frontend now leverages.
- **Dynamic Filtering:** Added a Dropdown Filter to the Priority Inbox, enabling dynamic filtering by event category (Placement, Result, Event).
- **Read vs. Unread States:** Fully integrated visual distinctions for new vs. read notifications. Unread notifications appear strongly bolded with a prominent `NEW` tag, while read notifications have a reduced opacity and are algorithmically down-ranked to ensure priority items always appear first.
