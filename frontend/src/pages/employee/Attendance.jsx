import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function Attendance() {
  const summary = [
    {
      title: "Present",
      value: "18",
      icon: CheckCircle2,
      type: "success",
    },
    {
      title: "Absent",
      value: "2",
      icon: XCircle,
      type: "danger",
    },
    {
      title: "Late",
      value: "3",
      icon: AlertCircle,
      type: "warning",
    },
    {
      title: "Working Days",
      value: "23",
      icon: CalendarDays,
      type: "primary",
    },
  ];

  const attendanceData = [
    {
      date: "22 Aug 2026",
      day: "Friday",
      checkIn: "09:12 AM",
      checkOut: "--:--",
      hours: "07h 42m",
      status: "Present",
    },
    {
      date: "21 Aug 2026",
      day: "Thursday",
      checkIn: "09:04 AM",
      checkOut: "06:08 PM",
      hours: "09h 04m",
      status: "Present",
    },
    {
      date: "20 Aug 2026",
      day: "Wednesday",
      checkIn: "09:27 AM",
      checkOut: "06:02 PM",
      hours: "08h 35m",
      status: "Late",
    },
    {
      date: "19 Aug 2026",
      day: "Tuesday",
      checkIn: "09:01 AM",
      checkOut: "06:12 PM",
      hours: "09h 11m",
      status: "Present",
    },
    {
      date: "18 Aug 2026",
      day: "Monday",
      checkIn: "--:--",
      checkOut: "--:--",
      hours: "--",
      status: "Absent",
    },
    {
      date: "17 Aug 2026",
      day: "Sunday",
      checkIn: "--:--",
      checkOut: "--:--",
      hours: "--",
      status: "Weekend",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="attendance-page">
        {/* Header */}
        <section className="attendance-header">
          <div>
            <p className="dashboard-eyebrow">Attendance</p>

            <h1>Attendance Overview</h1>

            <p>
              Track your attendance, working hours and daily status.
            </p>
          </div>

          <div className="attendance-month">
            <CalendarDays size={17} />
            <span>August 2026</span>
          </div>
        </section>

        {/* Summary cards */}
        <section className="attendance-stats">
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`attendance-stat-card ${item.type}`}
              >
                <div className="attendance-stat-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <span>{item.title}</span>
                  <strong>{item.value}</strong>
                </div>
              </div>
            );
          })}
        </section>

        {/* Today's status */}
        <section className="attendance-today card">
          <div className="attendance-today-header">
            <div>
              <h2>Today's Attendance</h2>
              <p>Friday, 22 August 2026</p>
            </div>

            <span className="attendance-status present">
              <span />
              Present
            </span>
          </div>

          <div className="attendance-today-details">
            <div>
              <Clock3 size={18} />
              <span>Check In</span>
              <strong>09:12 AM</strong>
            </div>

            <div>
              <Clock3 size={18} />
              <span>Check Out</span>
              <strong>--:--</strong>
            </div>

            <div>
              <Clock3 size={18} />
              <span>Working Hours</span>
              <strong>07h 42m</strong>
            </div>

            <button className="btn btn-primary">
              Check Out
            </button>
          </div>
        </section>

        {/* Attendance history */}
        <section className="attendance-history card">
          <div className="attendance-history-header">
            <div>
              <h2>Attendance History</h2>
              <p>Your attendance records for August 2026.</p>
            </div>
          </div>

          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Working Hours</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.date}>
                    <td>
                      <strong>{record.date}</strong>
                    </td>

                    <td>{record.day}</td>

                    <td>{record.checkIn}</td>

                    <td>{record.checkOut}</td>

                    <td>{record.hours}</td>

                    <td>
                      <span
                        className={`attendance-status ${record.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <span />
                        {record.status}
                      </span>
                    </td>
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

export default Attendance;