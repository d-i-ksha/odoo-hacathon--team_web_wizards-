import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  Search,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function AttendanceManagement() {
  const attendanceData = [
    {
      name: "Aarav Sharma",
      id: "EMP-1024",
      department: "Engineering",
      status: "Present",
      checkIn: "09:12 AM",
      checkOut: "--:--",
      hours: "07h 42m",
    },
    {
      name: "Priya Mehta",
      id: "EMP-1025",
      department: "Product",
      status: "Present",
      checkIn: "08:58 AM",
      checkOut: "05:42 PM",
      hours: "08h 44m",
    },
    {
      name: "Rohan Verma",
      id: "EMP-1026",
      department: "Design",
      status: "Late",
      checkIn: "10:21 AM",
      checkOut: "06:05 PM",
      hours: "07h 44m",
    },
    {
      name: "Ananya Singh",
      id: "EMP-1027",
      department: "Human Resources",
      status: "Present",
      checkIn: "09:05 AM",
      checkOut: "05:30 PM",
      hours: "08h 25m",
    },
    {
      name: "Vikram Patel",
      id: "EMP-1028",
      department: "Engineering",
      status: "Absent",
      checkIn: "--:--",
      checkOut: "--:--",
      hours: "--",
    },
    {
      name: "Neha Kapoor",
      id: "EMP-1029",
      department: "Finance",
      status: "On Leave",
      checkIn: "--:--",
      checkOut: "--:--",
      hours: "--",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "attendance-status present";
      case "Absent":
        return "attendance-status absent";
      case "Late":
        return "attendance-status late";
      case "On Leave":
        return "attendance-status leave";
      default:
        return "attendance-status";
    }
  };

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Page Header */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">ATTENDANCE</p>

            <h1>Attendance Management</h1>

            <p>
              Monitor employee attendance, working hours and daily status.
            </p>
          </div>

          <button className="date-selector">
            <CalendarDays size={19} />
            August 2026
          </button>
        </section>

        {/* Summary Cards */}
        <section className="dashboard-stats">
          <div className="dashboard-stat-card success">
            <div className="dashboard-stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Present</span>
              <strong>42</strong>
              <small>Employees today</small>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <XCircle size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Absent</span>
              <strong>3</strong>
              <small>Not checked in</small>
            </div>
          </div>

          <div className="dashboard-stat-card warning">
            <div className="dashboard-stat-icon">
              <Clock3 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Late</span>
              <strong>3</strong>
              <small>Late arrivals</small>
            </div>
          </div>

          <div className="dashboard-stat-card primary">
            <div className="dashboard-stat-icon">
              <CalendarDays size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>On Leave</span>
              <strong>2</strong>
              <small>Employees on leave</small>
            </div>
          </div>
        </section>

        {/* Attendance Table */}
        <section className="dashboard-panel admin-table-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Today's Attendance</h2>
              <p>Friday, 22 August 2026</p>
            </div>

            <span className="dashboard-present-badge">
              <span />
              42 Present
            </span>
          </div>

          {/* Search */}
          <div className="admin-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search employees..."
            />
          </div>

          {/* Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Working Hours</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-table-name">
                        <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div>

                        <strong>{employee.name}</strong>
                      </div>
                    </td>

                    <td>{employee.id}</td>

                    <td>{employee.department}</td>

                    <td>
                      <span className={getStatusClass(employee.status)}>
                        {employee.status}
                      </span>
                    </td>

                    <td>{employee.checkIn}</td>

                    <td>{employee.checkOut}</td>

                    <td>{employee.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AttendanceManagement;