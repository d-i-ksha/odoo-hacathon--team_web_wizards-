import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  Check,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function LeaveApprovals() {
  const leaveRequests = [
    {
      name: "Aarav Sharma",
      id: "EMP-1024",
      type: "Casual Leave",
      from: "26 Aug 2026",
      to: "27 Aug 2026",
      days: 2,
      reason: "Personal work",
      status: "Pending",
    },
    {
      name: "Priya Mehta",
      id: "EMP-1025",
      type: "Sick Leave",
      from: "25 Aug 2026",
      to: "25 Aug 2026",
      days: 1,
      reason: "Medical appointment",
      status: "Pending",
    },
    {
      name: "Rohan Verma",
      id: "EMP-1026",
      type: "Annual Leave",
      from: "01 Sep 2026",
      to: "05 Sep 2026",
      days: 5,
      reason: "Family vacation",
      status: "Approved",
    },
    {
      name: "Ananya Singh",
      id: "EMP-1027",
      type: "Casual Leave",
      from: "29 Aug 2026",
      to: "29 Aug 2026",
      days: 1,
      reason: "Personal work",
      status: "Rejected",
    },
    {
      name: "Vikram Patel",
      id: "EMP-1028",
      type: "Sick Leave",
      from: "22 Aug 2026",
      to: "23 Aug 2026",
      days: 2,
      reason: "Not feeling well",
      status: "Pending",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Approved") return "leave-status approved";
    if (status === "Rejected") return "leave-status rejected";
    return "leave-status pending";
  };

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Header */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">LEAVE MANAGEMENT</p>

            <h1>Leave Approvals</h1>

            <p>
              Review and manage employee leave requests.
            </p>
          </div>

          <button className="date-selector">
            <CalendarDays size={19} />
            August 2026
          </button>
        </section>

        {/* Summary */}
        <section className="dashboard-stats">
          <div className="dashboard-stat-card warning">
            <div className="dashboard-stat-icon">
              <Clock3 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Pending</span>
              <strong>3</strong>
              <small>Awaiting approval</small>
            </div>
          </div>

          <div className="dashboard-stat-card success">
            <div className="dashboard-stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Approved</span>
              <strong>6</strong>
              <small>This month</small>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <XCircle size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Rejected</span>
              <strong>2</strong>
              <small>This month</small>
            </div>
          </div>

          <div className="dashboard-stat-card primary">
            <div className="dashboard-stat-icon">
              <CalendarDays size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Total Requests</span>
              <strong>11</strong>
              <small>This month</small>
            </div>
          </div>
        </section>

        {/* Requests */}
        <section className="dashboard-panel admin-table-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Leave Requests</h2>
              <p>Review employee leave applications.</p>
            </div>
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
            <table className="admin-table leave-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <div className="employee-table-name">
                        <div className="employee-avatar">
                          {request.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{request.name}</strong>
                          <small>{request.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>{request.type}</td>

                    <td>{request.from}</td>

                    <td>{request.to}</td>

                    <td>
                      <strong>{request.days}</strong>
                    </td>

                    <td>{request.reason}</td>

                    <td>
                      <span className={getStatusClass(request.status)}>
                        {request.status}
                      </span>
                    </td>

                    <td>
                      {request.status === "Pending" ? (
                        <div className="leave-actions">
                          <button
                            className="leave-approve"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>

                          <button
                            className="leave-reject"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="action-disabled">
                          Completed
                        </span>
                      )}
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

export default LeaveApprovals;