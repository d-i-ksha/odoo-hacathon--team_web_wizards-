import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function Leave() {
  const [showModal, setShowModal] = useState(false);

  const leaveStats = [
    {
      title: "Available Leave",
      value: "12 Days",
      subtitle: "Remaining balance",
      icon: CalendarDays,
      type: "primary",
    },
    {
      title: "Used Leave",
      value: "8 Days",
      subtitle: "This year",
      icon: Clock3,
      type: "warning",
    },
    {
      title: "Approved",
      value: "6",
      subtitle: "Leave requests",
      icon: CheckCircle2,
      type: "success",
    },
    {
      title: "Pending",
      value: "2",
      subtitle: "Awaiting approval",
      icon: Clock3,
      type: "warning",
    },
  ];

  const leaveRequests = [
    {
      type: "Casual Leave",
      from: "26 Aug 2026",
      to: "27 Aug 2026",
      days: "2 Days",
      reason: "Personal work",
      status: "Approved",
    },
    {
      type: "Sick Leave",
      from: "18 Aug 2026",
      to: "18 Aug 2026",
      days: "1 Day",
      reason: "Not feeling well",
      status: "Approved",
    },
    {
      type: "Casual Leave",
      from: "2 Sep 2026",
      to: "3 Sep 2026",
      days: "2 Days",
      reason: "Family function",
      status: "Pending",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Header */}
        <section className="dashboard-welcome leave-header">
          <div>
            <p className="dashboard-eyebrow">TIME OFF</p>

            <h1>Leave Management</h1>

            <p>
              Manage your leave balance and track your leave requests.
            </p>
          </div>

          <button
            className="btn btn-primary leave-request-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Request Leave
          </button>
        </section>

        {/* Statistics */}
        <section className="dashboard-stats">
          {leaveStats.map((stat) => {
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

        {/* Leave Requests */}
        <section className="dashboard-panel leave-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>My Leave Requests</h2>
              <p>View your recent leave applications.</p>
            </div>
          </div>

          <div className="leave-table-wrapper">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {leaveRequests.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>

                    <td>
                      <span
                        className={`leave-status ${leave.status.toLowerCase()}`}
                      >
                        {leave.status === "Approved" ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Clock3 size={15} />
                        )}

                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Leave Policy */}
        <section className="dashboard-panel leave-policy">
          <div className="dashboard-panel-header">
            <div>
              <h2>Leave Information</h2>
              <p>Keep track of your available time off.</p>
            </div>
          </div>

          <div className="leave-policy-grid">
            <div>
              <strong>Casual Leave</strong>
              <span>8 days available</span>
            </div>

            <div>
              <strong>Sick Leave</strong>
              <span>4 days available</span>
            </div>

            <div>
              <strong>Annual Leave</strong>
              <span>10 days available</span>
            </div>
          </div>
        </section>
      </main>

      {/* Request Leave Modal */}
      {showModal && (
        <div
          className="leave-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="leave-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="leave-modal-header">
              <div>
                <h2>Request Leave</h2>
                <p>Submit a new leave request.</p>
              </div>

              <button
                className="leave-modal-close"
                onClick={() => setShowModal(false)}
              >
                <XCircle size={22} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                alert("Leave request submitted!");
              }}
            >
              <div className="leave-form-group">
                <label>Leave Type</label>

                <select required>
                  <option value="">Select leave type</option>
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Annual Leave</option>
                </select>
              </div>

              <div className="leave-form-row">
                <div className="leave-form-group">
                  <label>From</label>
                  <input type="date" required />
                </div>

                <div className="leave-form-group">
                  <label>To</label>
                  <input type="date" required />
                </div>
              </div>

              <div className="leave-form-group">
                <label>Reason</label>

                <textarea
                  rows="4"
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary leave-submit">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leave;