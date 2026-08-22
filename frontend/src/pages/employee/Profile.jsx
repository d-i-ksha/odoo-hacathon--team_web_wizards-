import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CalendarDays,
  MapPin,
  Edit3,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function Profile() {
  const employee = {
    name: "Aarav Sharma",
    employeeId: "EMP-1024",
    email: "aarav.sharma@dayflow.com",
    phone: "+91 98765 43210",
    department: "Engineering",
    role: "Software Engineer",
    joiningDate: "15 January 2024",
    location: "Bangalore, India",
    manager: "Rahul Mehta",
  };

  return (
    <div className="app">
      <Navbar />

      <main className="profile-page">
        {/* Header */}
        <section className="profile-header">
          <div>
            <p className="profile-eyebrow">MY PROFILE</p>
            <h1>My Profile</h1>
            <p>View and manage your personal and employment information.</p>
          </div>

          <button className="btn btn-primary">
            <Edit3 size={17} />
            Edit Profile
          </button>
        </section>

        {/* Profile overview */}
        <section className="profile-overview card">
          <div className="profile-avatar">
            {employee.name.charAt(0)}
          </div>

          <div className="profile-main-info">
            <h2>{employee.name}</h2>
            <p>{employee.role}</p>

            <div className="profile-meta">
              <span>
                <Building2 size={15} />
                {employee.department}
              </span>

              <span>
                <Briefcase size={15} />
                {employee.employeeId}
              </span>
            </div>
          </div>

          <div className="profile-status">
            <span />
            Active Employee
          </div>
        </section>

        {/* Personal Information */}
        <section className="profile-panel card">
          <div className="profile-panel-header">
            <div>
              <h2>Personal Information</h2>
              <p>Your basic personal details.</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <div className="profile-field-icon">
                <User size={18} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{employee.name}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{employee.email}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>Phone Number</span>
                <strong>{employee.phone}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>Location</span>
                <strong>{employee.location}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Employment Information */}
        <section className="profile-panel card">
          <div className="profile-panel-header">
            <div>
              <h2>Employment Information</h2>
              <p>Your current role and organization details.</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <div className="profile-field-icon">
                <Briefcase size={18} />
              </div>

              <div>
                <span>Job Title</span>
                <strong>{employee.role}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <Building2 size={18} />
              </div>

              <div>
                <span>Department</span>
                <strong>{employee.department}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>Joining Date</span>
                <strong>{employee.joiningDate}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="profile-field-icon">
                <User size={18} />
              </div>

              <div>
                <span>Reporting Manager</span>
                <strong>{employee.manager}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;