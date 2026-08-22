import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";
import Payroll from "./pages/employee/Payroll";
import Profile from "./pages/employee/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import LeaveApprovals from "./pages/admin/LeaveApprovals";
import PayrollManagement from "./pages/admin/PayrollManagement";
import Reports from "./pages/admin/Reports";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Employee */}
        <Route
          path="/employee"
          element={<EmployeeDashboard />}
        />
        <Route
  path="/admin/reports"
  element={<Reports />}
/>
        <Route
  path="/admin/payroll"
  element={<PayrollManagement />}
/>
        <Route
  path="/admin/leave"
  element={<LeaveApprovals />}
/>
        <Route
  path="/admin/employees"
  element={<Employees />}
/>
        <Route
  path="/admin"
  element={<AdminDashboard />}
/>
        <Route
  path="/employee/attendance"
  element={<Attendance />}
  />

        <Route path="/employee/leave" element={<Leave />} />
        <Route
  path="/admin/attendance"
  element={<AttendanceManagement />}
/>
        <Route path="/employee/payroll" element={<Payroll />} />
        <Route
  path="/employee/profile"
  element={<Profile />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;