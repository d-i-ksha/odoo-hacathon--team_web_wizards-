import {
  Clock3,
  CalendarDays,
  Wallet,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function EmployeeDashboard() {
  const employee = {
    name: "Aarav Sharma",
    role: "Software Engineer",
    department: "Engineering",
  };

  const stats = [
    {
      title: "Attendance",
      value: "Present",
      subtitle: "Today",
      icon: CheckCircle2,
      type: "success",
    },
    {
      title: "Working Hours",
      value: "07h 42m",
      subtitle: "Today's hours",
      icon: Clock3,
      type: "primary",
    },
    {
      title: "Time Off",
      value: "12 Days",
      subtitle: "Available balance",
      icon: CalendarDays,
      type: "warning",
    },
    {
      title: "Salary",
      value: "₹45,000",
      subtitle: "Monthly salary",
      icon: Wallet,
      type: "primary",
    },
  ];

  return (
    <div className="app">

      <Navbar />

      <main className="dashboard-page">

        {/* Welcome */}
        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-eyebrow">
              Employee Dashboard
            </p>

            <h1>
              Welcome back, {employee.name.split(" ")[0]}!
            </h1>

            <p>
              Here's what's happening with your work today.
            </p>
          </div>

          <div className="dashboard-profile-summary">
            <div className="dashboard-avatar">
              {employee.name.charAt(0)}
            </div>

            <div>
              <strong>{employee.name}</strong>
              <span>{employee.role}</span>
              <small>{employee.department}</small>
            </div>
          </div>

        </section>

        {/* Statistics */}
        <section className="dashboard-stats">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`dashboard-stat-card ${stat.type}`}
              >
                <div className="dashboard-stat-icon">
                  <Icon size={20} />
                </div>

                <div className="dashboard-stat-content">
                  <span>{stat.title}</span>

                  <strong>{stat.value}</strong>

                  <small>{stat.subtitle}</small>
                </div>
              </div>
            );
          })}

        </section>

        {/* Main content */}
        <section className="dashboard-content">

          {/* Attendance */}
          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <h2>Today's Attendance</h2>
                <p>Friday, 22 August 2026</p>
              </div>

              <span className="dashboard-present-badge">
                <span />
                Present
              </span>

            </div>

            <div className="attendance-summary">

              <div>
                <span>Check In</span>
                <strong>09:12 AM</strong>
              </div>

              <div>
                <span>Check Out</span>
                <strong>--:--</strong>
              </div>

              <div>
                <span>Working Hours</span>
                <strong>07h 42m</strong>
              </div>

            </div>

            <button className="btn btn-primary dashboard-action">
              Check Out
              <ArrowRight size={16} />
            </button>

          </div>

          {/* Quick Actions */}
          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>
                <h2>Quick Actions</h2>
                <p>Access your frequently used options.</p>
              </div>

            </div>

            <div className="quick-actions">

              <button className="quick-action">
                <CalendarDays size={19} />

                <span>
                  <strong>Request Time Off</strong>
                  <small>Submit a leave request</small>
                </span>

                <ArrowRight size={16} />
              </button>

              <button className="quick-action">
                <Clock3 size={19} />

                <span>
                  <strong>View Attendance</strong>
                  <small>Check your attendance history</small>
                </span>

                <ArrowRight size={16} />
              </button>

              <button className="quick-action">
                <Wallet size={19} />

                <span>
                  <strong>View Payroll</strong>
                  <small>Check your salary information</small>
                </span>

                <ArrowRight size={16} />
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EmployeeDashboard;