# WaitWise Frontend

This is the **frontend** for the WaitWise virtual queue management system.  
It provides a responsive interface for users and admins to interact with queues in realtime.

The backend for WaitWise is a separate repository: [WaitWise backend](https://github.com/ruatahmar/WaitWise)

## Features

- Join and manage queues
- View queue status and position
- Admin dashboard to manage queues and users
- Realtime updates via WebSockets
- Integrated with WaitWise backend and Redis caching

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Realtime:** WebSockets
- **API:** Axios

## Installation

```bash
git clone git@github.com:<your-username>/WaitWise-frontend.git
cd waitwise-frontend
npm install
npm run dev
```

The frontend will run at http://localhost:5173 by default.

## Configuration

Create a .env file with the backend API URL:

```
VITE_API_URL=https://your-backend-url.com
```
