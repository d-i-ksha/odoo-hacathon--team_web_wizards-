import {
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock3,
  Download,
  Search,
  CalendarDays,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function PayrollManagement() {
  const payrollData = [
    {
      name: "Aarav Sharma",
      id: "EMP-1024",
      department: "Engineering",
      salary: "₹45,000",
      bonus: "₹5,000",
      deductions: "₹2,000",
      netSalary: "₹48,000",
      status: "Processed",
    },
    {
      name: "Priya Mehta",
      id: "EMP-1025",
      department: "Product",
      salary: "₹52,000",
      bonus: "₹4,000",
      deductions: "₹2,500",
      netSalary: "₹53,500",
      status: "Processed",
    },
    {
      name: "Rohan Verma",
      id: "EMP-1026",
      department: "Design",
      salary: "₹42,000",
      bonus: "₹3,000",
      deductions: "₹1,800",
      netSalary: "₹43,200",
      status: "Processed",
    },
    {
      name: "Ananya Singh",
      id: "EMP-1027",
      department: "Human Resources",
      salary: "₹48,000",
      bonus: "₹4,500",
      deductions: "₹2,200",
      netSalary: "₹50,300",
      status: "Pending",
    },
    {
      name: "Vikram Patel",
      id: "EMP-1028",
      department: "Engineering",
      salary: "₹55,000",
      bonus: "₹5,500",
      deductions: "₹2,800",
      netSalary: "₹57,700",
      status: "Processed",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Header */}
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">PAYROLL</p>

            <h1>Payroll Management</h1>

            <p>
              Manage employee salaries, earnings and payroll processing.
            </p>
          </div>

          <button className="date-selector">
            <CalendarDays size={19} />
            August 2026
          </button>
        </section>

        {/* Summary Cards */}
        <section className="dashboard-stats">
          <div className="dashboard-stat-card primary">
            <div className="dashboard-stat-icon">
              <Wallet size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Total Payroll</span>
              <strong>₹24.8L</strong>
              <small>Monthly payroll</small>
            </div>
          </div>

          <div className="dashboard-stat-card success">
            <div className="dashboard-stat-icon">
              <TrendingUp size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Average Salary</span>
              <strong>₹49,600</strong>
              <small>Per employee</small>
            </div>
          </div>

          <div className="dashboard-stat-card success">
            <div className="dashboard-stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Processed</span>
              <strong>47</strong>
              <small>Employees processed</small>
            </div>
          </div>

          <div className="dashboard-stat-card warning">
            <div className="dashboard-stat-icon">
              <Clock3 size={20} />
            </div>

            <div className="dashboard-stat-content">
              <span>Pending</span>
              <strong>3</strong>
              <small>Awaiting processing</small>
            </div>
          </div>
        </section>

        {/* Payroll Table */}
        <section className="dashboard-panel admin-table-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Employee Payroll</h2>
              <p>August 2026 payroll details.</p>
            </div>

            <button className="btn btn-primary">
              <Download size={17} />
              Export Payroll
            </button>
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
            <table className="admin-table payroll-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Base Salary</th>
                  <th>Bonus</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {payrollData.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-table-name">
                        <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>
                          <small>{employee.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>{employee.department}</td>

                    <td>{employee.salary}</td>

                    <td>{employee.bonus}</td>

                    <td>{employee.deductions}</td>

                    <td>
                      <strong>{employee.netSalary}</strong>
                    </td>

                    <td>
                      <span
                        className={
                          employee.status === "Processed"
                            ? "payroll-status processed"
                            : "payroll-status pending"
                        }
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-download"
                        title="Download payslip"
                      >
                        <Download size={16} />
                      </button>
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

export default PayrollManagement;