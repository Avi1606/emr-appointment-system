# EMR Appointment Management System

A modern appointment management system for Electronic Medical Records (EMR), built as part of the SDE Intern Assignment.

## 🏗️ Architecture

This project simulates a full-stack application with:

### Backend (Python)
- **`appointment_service.py`** - Backend service simulating Aurora PostgreSQL + AppSync
  - `get_appointments(date, status)` - Fetch appointments with optional filters
  - `update_appointment_status(id, status)` - Update appointment status with real-time sync simulation

### Frontend (React + Vite + Tailwind)
- **`src/EMR_Frontend_Assignment.jsx`** - Main appointment management UI
  - Sidebar navigation
  - Stats cards (Today's, Confirmed, Upcoming, Virtual appointments)
  - Interactive calendar with date selection
  - Appointment cards with patient details
  - Filters (tabs, search, status, doctor dropdowns)
  - Status update actions (Confirm/Cancel)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Avi1606/emr-appointment-system.git
cd emr-appointment-system

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## ✨ Features

- **Dashboard View** - Overview stats cards showing appointment counts
- **Calendar Widget** - Interactive calendar for date-based filtering
- **Appointment List** - Detailed cards with patient info, doctor, time, mode
- **Filtering** - By date, status, doctor
- **Search** - Search appointments by patient or doctor name
- **Tab Navigation** - Upcoming, Today, Past, All views
- **Status Actions** - Confirm or cancel appointments

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend Simulation**: Python (simulating Aurora PostgreSQL + AWS AppSync)

---

Built with ❤️ for the SDE Intern Assignment