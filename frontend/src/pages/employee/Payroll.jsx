import {
  Wallet,
  Download,
  CalendarDays,
  TrendingUp,
  FileText,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function Payroll() {
  const salary = {
    monthly: "₹45,000",
    annual: "₹5,40,000",
    basic: "₹27,000",
    hra: "₹10,800",
    allowances: "₹7,200",
    deductions: "₹0",
    net: "₹45,000",
  };

  const payslips = [
    {
      month: "August 2026",
      date: "31 Aug 2026",
      amount: "₹45,000",
      status: "Paid",
    },
    {
      month: "July 2026",
      date: "31 Jul 2026",
      amount: "₹45,000",
      status: "Paid",
    },
    {
      month: "June 2026",
      date: "30 Jun 2026",
      amount: "₹45,000",
      status: "Paid",
    },
    {
      month: "May 2026",
      date: "31 May 2026",
      amount: "₹45,000",
      status: "Paid",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="payroll-page">
        {/* Header */}
        <section className="payroll-header">
          <div>
            <p className="payroll-eyebrow">PAYROLL</p>
            <h1>My Payroll</h1>
            <p>
              View your salary details, earnings and payslip history.
            </p>
          </div>

          <button className="btn btn-primary">
            <Download size={17} />
            Download Payslip
          </button>
        </section>

        {/* Salary Overview */}
        <section className="payroll-stats">
          <div className="payroll-stat-card primary">
            <div className="payroll-stat-icon">
              <Wallet size={21} />
            </div>

            <div>
              <span>Monthly Salary</span>
              <strong>{salary.monthly}</strong>
              <small>Current monthly pay</small>
            </div>
          </div>

          <div className="payroll-stat-card">
            <div className="payroll-stat-icon green">
              <TrendingUp size={21} />
            </div>

            <div>
              <span>Annual Salary</span>
              <strong>{salary.annual}</strong>
              <small>Estimated yearly salary</small>
            </div>
          </div>

          <div className="payroll-stat-card">
            <div className="payroll-stat-icon orange">
              <CalendarDays size={21} />
            </div>

            <div>
              <span>Next Payday</span>
              <strong>31 Aug</strong>
              <small>Salary payment date</small>
            </div>
          </div>
        </section>

        {/* Current Salary */}
        <section className="payroll-panel">
          <div className="payroll-panel-header">
            <div>
              <h2>Salary Breakdown</h2>
              <p>August 2026 salary details</p>
            </div>

            <span className="payroll-paid-badge">
              <span />
              Paid
            </span>
          </div>

          <div className="salary-breakdown">
            <div className="salary-row">
              <span>Basic Salary</span>
              <strong>{salary.basic}</strong>
            </div>

            <div className="salary-row">
              <span>House Rent Allowance</span>
              <strong>{salary.hra}</strong>
            </div>

            <div className="salary-row">
              <span>Other Allowances</span>
              <strong>{salary.allowances}</strong>
            </div>

            <div className="salary-row deduction">
              <span>Deductions</span>
              <strong>- {salary.deductions}</strong>
            </div>

            <div className="salary-total">
              <span>Net Salary</span>
              <strong>{salary.net}</strong>
            </div>
          </div>
        </section>

        {/* Payslip History */}
        <section className="payroll-panel">
          <div className="payroll-panel-header">
            <div>
              <h2>Payslip History</h2>
              <p>View and download your previous payslips.</p>
            </div>
          </div>

          <div className="payslip-list">
            {payslips.map((payslip) => (
              <div className="payslip-row" key={payslip.month}>
                <div className="payslip-icon">
                  <FileText size={20} />
                </div>

                <div className="payslip-info">
                  <strong>{payslip.month}</strong>
                  <span>Paid on {payslip.date}</span>
                </div>

                <div className="payslip-amount">
                  <strong>{payslip.amount}</strong>
                  <span>{payslip.status}</span>
                </div>

                <button className="payslip-download">
                  <Download size={17} />
                  <span>Download</span>
                </button>

                <ChevronRight
                  size={18}
                  className="payslip-arrow"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Payroll;