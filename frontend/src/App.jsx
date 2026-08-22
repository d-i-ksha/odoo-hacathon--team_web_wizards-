import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";


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
  path="/employee/attendance"
  element={<Attendance />}
  />
        <Route path="/employee/leave" element={<Leave />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;