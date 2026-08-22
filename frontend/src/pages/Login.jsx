import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { saveUser } from "../utils/helpers";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const data = await login(
      formData.email,
      formData.password
    );

    saveUser(data);

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  } catch (error) {
    setError(
      error.message || "Unable to connect to the server."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <div className="auth-logo">
          <img src={logo} alt="Dayflow logo" />
        </div>

        <h1>Dayflow</h1>
        <p>Human Resource Management System</p>
      </div>

      <section className="auth-card">
        <div className="auth-card-header">
          <h2>Welcome back</h2>
          <p>Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Login ID / Email</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-signup">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </section>

      <p className="auth-footer">
        Secure employee management powered by Dayflow
      </p>
    </main>
  );
}

export default Login;