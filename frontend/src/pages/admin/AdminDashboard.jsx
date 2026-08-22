import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Wallet,
  Clock3,
  ArrowRight,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "50",
      subtitle: "Active employees",
      icon: Users,
      type: "primary",
    },
    {
      title: "Present Today",
      value: "42",
      subtitle: "84% attendance",
      icon: UserCheck,
      type: "success",
    },
    {
      title: "On Leave",
      value: "5",
      subtitle: "Employees today",
      icon: CalendarDays,
      type: "warning",
    },
    {
      title: "Absent",
      value: "3",
      subtitle: "Not checked in",
      icon: UserX,
      type: "danger",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Welcome */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">ADMIN DASHBOARD</p>

            <h1>Welcome back, Admin!</h1>

            <p>
              Here's an overview of your organization's workforce today.
            </p>
          </div>

          <div className="dashboard-profile-summary">
            <div className="dashboard-avatar">A</div>

            <div>
              <strong>Admin</strong>
              <span>HR Administrator</span>
              <small>Human Resources</small>
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

        {/* Main Content */}
        <section className="dashboard-content">
          {/* Attendance Overview */}
          <div className="dashboard-panel">
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

            <div className="admin-attendance-summary">
              <div>
                <span>Present</span>
                <strong>42</strong>
              </div>

              <div>
                <span>Absent</span>
                <strong>3</strong>
              </div>

              <div>
                <span>On Leave</span>
                <strong>5</strong>
              </div>
            </div>

            <button className="btn btn-primary dashboard-action">
              View Attendance
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Manage your organization quickly.</p>
              </div>
            </div>

            <div className="quick-actions">
              <button className="quick-action">
                <Users size={19} />

                <span>
                  <strong>Manage Employees</strong>
                  <small>View and manage employees</small>
                </span>

                <ArrowRight size={16} />
              </button>

              <button className="quick-action">
                <CalendarDays size={19} />

                <span>
                  <strong>Leave Approvals</strong>
                  <small>Review pending leave requests</small>
                </span>

                <ArrowRight size={16} />
              </button>

              <button className="quick-action">
                <Wallet size={19} />

                <span>
                  <strong>Payroll Management</strong>
                  <small>Manage employee payroll</small>
                </span>

                <ArrowRight size={16} />
              </button>

              <button className="quick-action">
                <Clock3 size={19} />

                <span>
                  <strong>Attendance Management</strong>
                  <small>Track employee attendance</small>
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

export default AdminDashboard;