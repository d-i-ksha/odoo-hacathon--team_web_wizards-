import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Backend API will be connected here later.
    console.log("Signup data:", formData);
  };

  return (
    <div className="auth-page">

      {/* Branding */}
      <div className="auth-brand">
        <img
          src={logo}
          alt="Dayflow"
          className="auth-logo-image"
        />

        <h1>Dayflow</h1>

        <p>Human Resource Management System</p>
      </div>

      {/* Signup Card */}
      <div className="auth-card signup-card">

        <div className="auth-card-header">
          <h2>Create your account</h2>
          <p>Set up your organization to get started</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>

            <div className="input-wrapper">
              <Building2 size={19} />

              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Name</label>

            <div className="input-wrapper">
              <User size={19} />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <div className="input-wrapper">
              <Mail size={19} />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <div className="input-wrapper">
              <Phone size={19} />

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={19} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>

            <div className="input-wrapper">
              <Lock size={19} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Company Logo */}
          <div className="form-group">
            <label>Company Logo</label>

            <label className="logo-upload">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company logo preview"
                />
              ) : (
                <>
                  <Upload size={20} />
                  <span>Upload company logo</span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                hidden
              />
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="auth-button">
            Sign Up
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Login */}
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>

      </div>

      {/* Footer */}
      <p className="auth-footer">
        Secure employee management powered by Dayflow
      </p>

    </div>
  );
}

export default Signup;