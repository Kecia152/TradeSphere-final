# TradeSphere

### Investment Portfolio & Market Analysis Platform

TradeSphere is a full-stack investment platform I built to bring portfolio tracking, market exploration, stock simulation, and AI-assisted analysis into a single web application.

The project was developed to implement a complete application workflow — from **user authentication and user-specific data management to REST APIs, database operations, external market-data integration, interactive charts, and AI-powered features**.

The application includes secure authentication with Supabase, portfolio and transaction management using MongoDB, live market data through Yahoo Finance, personalized watchlists, financial news, notifications, and an AI-powered portfolio assistant and insights system using Groq.

---

## Key Features

- Secure authentication with Supabase
- Email verification, login, logout, and password reset
- User-specific portfolio and transaction management
- Simulated stock buy and sell transactions
- Portfolio value and profit/loss tracking
- Live stock market data and stock search
- Historical market data with line and candlestick charts
- Personal stock watchlist
- AI-powered portfolio insights
- AI investment assistant with user-specific chat history
- Financial news and portfolio notifications

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | Supabase Auth |
| Market Data | Yahoo Finance |
| AI | Groq API |
| Development | Git, GitHub, VS Code |

---

## Architecture

```text
React + Vite
     │
     ▼
Supabase Authentication
     │
     ▼
Express REST API
     │
 ┌───┴───────────────┐
 ▼                   ▼
MongoDB Atlas    External Services
                 ├── Yahoo Finance
                 └── Groq AI
```

The backend follows a modular structure separating routes, controllers, services, middleware, and database models.

---

## Project Structure

```text
TradeSphere/
├── client/          # React + Vite frontend
├── server/          # Node.js + Express backend
├── docs/            # Project documentation
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas
- Supabase project
- Groq API key

### Clone the repository

```bash
git clone https://github.com/Kecia152/TradeSphere-final.git
cd TradeSphere-final
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:8000`.

---

## Environment Variables

Create the required `.env` files locally for:

- Supabase configuration
- MongoDB connection
- Groq API key
- Backend API configuration

Environment files and secrets are excluded from version control.

---

## Security

- Supabase manages authentication and user sessions.
- Protected API routes validate authenticated users.
- User-specific portfolio, transaction, watchlist, and AI data is isolated.
- Sensitive API keys and database credentials remain server-side.
- Environment files are excluded from Git.

---

## Disclaimer

TradeSphere is an educational software engineering project.

It simulates investment activity and does **not** execute real stock trades, provide brokerage services, or constitute financial advice.