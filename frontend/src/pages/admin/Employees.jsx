import {
  Search,
  UserPlus,
  Users,
  Mail,
  Briefcase,
  MoreVertical,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function Employees() {
  const employees = [
    {
      id: "EMP-1024",
      name: "Aarav Sharma",
      email: "aarav.sharma@dayflow.com",
      role: "Software Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "EMP-1025",
      name: "Priya Mehta",
      email: "priya.mehta@dayflow.com",
      role: "Product Manager",
      department: "Product",
      status: "Active",
    },
    {
      id: "EMP-1026",
      name: "Rohan Verma",
      email: "rohan.verma@dayflow.com",
      role: "UI/UX Designer",
      department: "Design",
      status: "Active",
    },
    {
      id: "EMP-1027",
      name: "Ananya Singh",
      email: "ananya.singh@dayflow.com",
      role: "HR Executive",
      department: "Human Resources",
      status: "Active",
    },
    {
      id: "EMP-1028",
      name: "Vikram Patel",
      email: "vikram.patel@dayflow.com",
      role: "Backend Developer",
      department: "Engineering",
      status: "On Leave",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard-page">
        {/* Page Header */}
        <section className="employees-header">
          <div>
            <p className="dashboard-eyebrow">EMPLOYEES</p>

            <h1>Employee Management</h1>

            <p>
              View, manage and organize your organization's employees.
            </p>
          </div>

          <button className="btn btn-primary">
            <UserPlus size={18} />
            Add Employee
          </button>
        </section>

        {/* Summary */}
        <section className="employee-summary">
          <div className="employee-summary-card">
            <div className="employee-summary-icon">
              <Users size={21} />
            </div>

            <div>
              <span>Total Employees</span>
              <strong>50</strong>
            </div>
          </div>

          <div className="employee-summary-card">
            <div className="employee-summary-icon success">
              <Users size={21} />
            </div>

            <div>
              <span>Active Employees</span>
              <strong>47</strong>
            </div>
          </div>

          <div className="employee-summary-card">
            <div className="employee-summary-icon warning">
              <Users size={21} />
            </div>

            <div>
              <span>On Leave</span>
              <strong>3</strong>
            </div>
          </div>
        </section>

        {/* Employee Table */}
        <section className="dashboard-panel employees-panel">
          <div className="employees-toolbar">
            <div>
              <h2>All Employees</h2>
              <p>Manage employee information and status.</p>
            </div>

            <div className="employee-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search employees..."
              />
            </div>
          </div>

          <div className="employee-table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-name-cell">
                        <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{employee.name}</strong>

                          <span>
                            <Mail size={13} />
                            {employee.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>{employee.id}</td>

                    <td>
                      <span className="employee-department">
                        <Briefcase size={14} />
                        {employee.department}
                      </span>
                    </td>

                    <td>{employee.role}</td>

                    <td>
                      <span
                        className={`employee-status ${
                          employee.status === "Active"
                            ? "active"
                            : "leave"
                        }`}
                      >
                        <span />
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="employee-action"
                        title="More options"
                      >
                        <MoreVertical size={18} />
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

export default Employees;