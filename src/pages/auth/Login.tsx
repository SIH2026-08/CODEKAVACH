import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Badge,
  Eye,
  EyeOff,
  KeyRound,
  LogIn,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";

import "../../styles/login.css";

type UserRole = "user" | "responder" | "admin";

const roleConfig = [
  {
    id: "user" as UserRole,
    title: "Civilian",
    description: "Access personal safety & alerts",
    icon: User,
  },
  {
    id: "responder" as UserRole,
    title: "Responder",
    description: "Manage incidents & rescue",
    icon: Activity,
  },
  {
    id: "admin" as UserRole,
    title: "Command",
    description: "System-wide tactical control",
    icon: UserCog,
  },
];

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>("user");
  const [email, setEmail] = useState("alex.morgan@resqroute.gov");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsLoading(true);

    // Temporary frontend-only authentication.
    // Replace this later with your backend authentication API.

    setTimeout(() => {
      setIsLoading(false);

      if (role === "user") {
        navigate("/dashboard");
      } else if (role === "responder") {
        navigate("/volunteer");
      } else {
        navigate("/admin");
      }
    }, 700);
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-background" aria-hidden="true">
        <div className="background-glow background-glow-primary" />
        <div className="background-glow background-glow-secondary" />
        <div className="background-grid" />
      </div>

      <main className="login-main">
        <div className="login-wrapper">
          {/* Login Card */}
          <section className="login-card">
            <div className="login-card-highlight" />

            {/* Header */}
            <header className="login-header">
              <div className="logo-container">
                <ShieldCheck size={42} strokeWidth={1.7} />
              </div>

              <h1>ResQRoute</h1>

              <p>
                Precision Disaster Management &amp; Response
              </p>
            </header>

            {/* Role Selection */}
            <section className="role-section">
              <p className="section-label">
                Select Operating Role
              </p>

              <div className="role-grid">
                {roleConfig.map((item) => {
                  const Icon = item.icon;
                  const selected = role === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`role-card ${selected ? "role-card-selected" : ""
                        }`}
                      onClick={() => setRole(item.id)}
                      aria-pressed={selected}
                    >
                      <Icon
                        className="role-icon"
                        size={24}
                        strokeWidth={1.7}
                      />

                      <span className="role-title">
                        {item.title}
                      </span>

                      <span className="role-description">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="login-divider" />

            {/* Login Form */}
            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Operator ID / Email
                </label>

                <div className="input-wrapper">
                  <Badge className="input-icon" size={19} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter credentials"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">
                    Authentication Key
                  </label>

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() => {
                      // TODO: Implement forgot-password flow
                      console.log("Forgot key clicked");
                    }}
                  >
                    Forgot key?
                  </button>
                </div>

                <div className="input-wrapper">
                  <KeyRound
                    className="input-icon"
                    size={19}
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter secure key"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="remember-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Maintain secure session</span>
              </label>

              {/* Login Button */}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                <LogIn size={19} />

                <span>
                  {isLoading
                    ? "Authenticating..."
                    : "Access Command Center"}
                </span>
              </button>
            </form>

            {/* Registration Link */}
            <div className="register-link">
              <p>
                New to ResQRoute?
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  Create an account
                </button>
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="login-footer">
            <p>
              Access restricted to authorized personnel.
              <br className="desktop-break" />

              <button
                type="button"
                className="clearance-link"
                onClick={() =>
                  console.log("Request clearance clicked")
                }
              >
                Request clearance
              </button>{" "}
              from central command.
            </p>

            <div className="network-status">
              <span className="status-dot" />

              <span>Net: Operational</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}