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
