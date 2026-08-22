# DayFlow – HR Management System

> A modern Human Resource Management System built for the Odoo × NMIT Hackathon 2026.

DayFlow is a full-stack HR management platform designed to simplify employee management, attendance tracking, leave management, payroll management, and HR administration through a centralized web application.

---

## 🚀 Features

### 👤 Authentication
- Employee and administrator login
- User registration
- Role-based navigation
- Secure communication between frontend and backend
- Authentication through REST APIs

### 👨‍💼 Employee Management
- Add employees
- View employee information
- Update employee details
- Manage employee department and designation
- Track joining date and employment status

### 🕐 Attendance Management
- Record employee attendance
- Check-in and check-out tracking
- Attendance status management
- View attendance records

### 🌴 Leave Management
- Submit leave requests
- View leave records
- Leave approval/rejection workflow
- Employee and administrator leave views

### 💰 Payroll Management
- Payroll information management
- Employee payroll records
- Administrator payroll management

### 📊 Reports & Administration
- Admin dashboard
- Employee management dashboard
- Attendance management
- Leave approvals
- Payroll management
- Reports section

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios / Fetch API
- Lucide React
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PyMySQL
- Uvicorn

### Database
- MySQL

### Development Tools
- Git
- GitHub
- VS Code
- Swagger / OpenAPI

---

## 📁 Project Structure

```text
odoo-hacathon--team_web_wizards-
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   ├── connection.py
│   │   │   └── models.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── employees.py
│   │   │   ├── attendance.py
│   │   │   ├── leaves.py
│   │   │   └── payroll.py
│   │   │
│   │   └── main.py
│   │
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── employee/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
