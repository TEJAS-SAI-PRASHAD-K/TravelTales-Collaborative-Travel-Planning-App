# TravelTales-Collaborative-Travel-Planning-App

TravelTales is a full-stack web application that enables users to collaboratively plan trips, manage itineraries, track expenses, share journals, and make group decisions through polls. The platform is designed for groups of friends or families who want to organize and enjoy their travels together.

## Features

- **User Authentication:** Sign up, log in, password reset via email OTP, and secure JWT-based authentication.
- **Trip Management:** Create, update, and delete trips. Invite friends and manage participants.
- **Itinerary Planning:** Add, update, and remove daily activities for each trip, assign activities to users, and track activity status.
- **Expense Tracking:** Record expenses, split costs among participants, and view trip expense summaries.
- **Journals:** Share travel experiences, photos, and moods with trip journals. Option to keep entries private.
- **Polls:** Create polls for group decisions (e.g., where to go, what to do) and allow participants to vote.
- **Friends System:** Send and remove friend requests to connect with other users.

## Tech Stack

- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT, bcryptjs
- **Email:** Nodemailer (for password reset OTPs)

## Project Structure

```
TravelTales-Collaborative-Travel-Planning-App/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Overview

- **Authentication:** `/api/auth`
- **Trips:** `/api/trips`
- **Expenses:** `/api/trips/:id/expenses`
- **Itinerary:** `/api/trips/:id/itinerary`
- **Journals:** `/api/trips/:id/journal`
- **Polls:** `/api/trips/:id/polls`
- **Users:** `/api/users`

Refer to the backend route files for detailed endpoints and request formats.

## License

This project is licensed under the [MIT License](LICENSE).

---

*TravelTales: Plan together, travel better!*