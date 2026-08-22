import {
  Users,
  CalendarCheck,
  CalendarDays,
  Wallet,
  Download,
  TrendingUp,
  Clock3,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function Reports() {
  const reports = [
    {
      title: "Employee Report",
      description: "Employee count, departments and workforce details.",
      icon: Users,
      value: "50 Employees",
      type: "primary",
    },
    {
      title: "Attendance Report",
      description: "Daily attendance, absences and working hours.",
      icon: CalendarCheck,
      value: "84% Attendance",
      type: "success",
    },
    {
      title: "Leave Report",
      description: "Leave usage, approvals and pending requests.",
      icon: CalendarDays,
      value: "11 Requests",
      type: "warning",
    },
    {
      title: "Payroll Report",
      description: "Salary, bonuses, deductions and payroll status.",
      icon: Wallet,
      value: "₹24.8L Payroll",
      type: "primary",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Header */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">REPORTS</p>

            <h1>HR Reports</h1>

            <p>
              View workforce insights and generate HR reports.
            </p>
          </div>

          <button className="btn btn-primary">
            <Download size={17} />
            Export All Reports
          </button>
        </section>

        {/* Overview */}
        <section className="dashboard-stats">
          <div className="dashboard-stat-card primary">
            <div className="dashboard-stat-icon">
              <Users size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Total Employees</span>
              <strong>50</strong>
              <small>Active employees</small>
            </div>
          </div>

          <div className="dashboard-stat-card success">
            <div className="dashboard-stat-icon">
              <TrendingUp size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Attendance Rate</span>
              <strong>84%</strong>
              <small>This month</small>
            </div>
          </div>

          <div className="dashboard-stat-card warning">
            <div className="dashboard-stat-icon">
              <Clock3 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Pending Requests</span>
              <strong>3</strong>
              <small>Awaiting approval</small>
            </div>
          </div>

          <div className="dashboard-stat-card primary">
            <div className="dashboard-stat-icon">
              <Wallet size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Monthly Payroll</span>
              <strong>₹24.8L</strong>
              <small>August 2026</small>
            </div>
          </div>
        </section>

        {/* Report Cards */}
        <section className="dashboard-content">
          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <div className="dashboard-panel report-card" key={report.title}>
                <div className="dashboard-panel-header">
                  <div className="report-title">
                    <div className={`dashboard-stat-icon ${report.type}`}>
                      <Icon size={21} />
                    </div>

                    <div>
                      <h2>{report.title}</h2>
                      <p>{report.description}</p>
                    </div>
                  </div>
                </div>

                <div className="report-summary">
                  <strong>{report.value}</strong>

                  <button className="btn btn-primary">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Department Overview */}
        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Department Overview</h2>
              <p>Employee distribution across departments.</p>
            </div>
          </div>

          <div className="report-departments">
            <div>
              <span>Engineering</span>
              <strong>18</strong>
            </div>

            <div>
              <span>Product</span>
              <strong>10</strong>
            </div>

            <div>
              <span>Design</span>
              <strong>7</strong>
            </div>

            <div>
              <span>Human Resources</span>
              <strong>5</strong>
            </div>

            <div>
              <span>Sales</span>
              <strong>6</strong>
            </div>

            <div>
              <span>Finance</span>
              <strong>4</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Reports;