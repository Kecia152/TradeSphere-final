# TradeSphere

### Investment Portfolio & Market Analysis Platform

TradeSphere is a full-stack web application for managing simulated investment portfolios, exploring stock market data, tracking watchlists, visualizing performance, and interacting with an AI-powered investment assistant.

Built with **React, Node.js, Express, MongoDB, Supabase, Yahoo Finance, and Groq AI**.

---

## Features

- Secure authentication with Supabase
- Portfolio tracking and P&L monitoring
- Simulated stock buy and sell transactions
- Historical stock charts and market data
- Personal stock watchlist
- AI-powered portfolio insights and assistant
- Financial news
- Portfolio notifications
- User-specific portfolio and AI data

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