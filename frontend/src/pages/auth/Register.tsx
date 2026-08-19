import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import {
  Activity,
  Badge,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Phone,
  ShieldCheck,
  User,
  UserCog,
  UserPlus,
} from "lucide-react";

import "../../styles/register.css";

type Role = "civilian" | "responder" | "command";

const roles = [
  {
    value: "civilian" as Role,
    label: "Civilian",
    description: "Access personal safety & alerts",
    icon: User,
  },
  {
    value: "responder" as Role,
    label: "Responder",
    description: "Manage incidents & rescue",
    icon: Activity,
  },
  {
    value: "command" as Role,
    label: "Command",
    description: "System-wide tactical control",
    icon: UserCog,
  },
];

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>("civilian");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    authKey: "",
  });

  const [error, setError] = useState("");

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();
  setError("");

  // Backend currently supports STUDENT and ADMIN.
  // Civilian maps to STUDENT.
  if (role !== "civilian") {
    setError(
      "Only Civilian registration is currently available.",
    );
    return;
  }

  if (form.authKey.length < 8) {
    setError(
      "Authentication key must contain at least 8 characters.",
    );
    return;
  }

  try {
    const response = await registerUser({
      name: form.fullName,
      email: form.email,
      password: form.authKey,
    });

    // Store JWT
    localStorage.setItem(
      "accessToken",
      response.token,
    );

    // Store user information
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: response.userId,
        name: response.name,
        email: response.email,
        role: response.role,
      }),
    );

    // Registration successful
    navigate("/dashboard");

  } catch (error: any) {
    if (error.response?.status === 409) {
      setError(
        "An account with this email already exists.",
      );
    } else if (error.response?.status === 400) {
      setError(
        error.response.data?.message ||
          "Please check your registration details.",
      );
    } else {
      setError(
        "Unable to connect to the ResQCampus server.",
      );
    }
  }
};

  return (
    <div className="register-page">
      {/* Background */}
      <div
        className="register-background"
        aria-hidden="true"
      >
        <div className="register-glow register-glow-primary" />
        <div className="register-glow register-glow-secondary" />
        <div className="register-grid" />
      </div>

      {/* Main */}
      <main className="register-main">
        <div className="register-wrapper">
          <section className="register-card">
            <div className="register-card-highlight" />

            {/* Header */}
            <header className="register-header">
              <div className="register-logo">
                <ShieldCheck
                  size={42}
                  strokeWidth={1.7}
                />
              </div>

              <h1>ResQRoute</h1>

              <p>
                Precision Disaster Management &amp; Response
              </p>

              <div className="register-divider" />

              <h2>Create Personnel File</h2>

              <span className="register-subtitle">
                Secure Node Registration
              </span>
            </header>

            {/* Form */}
            <form
              className="register-form"
              onSubmit={handleSubmit}
            >
              {/* Role */}
              <div className="register-field-group">
                <label className="register-label">
                  Designation / Role
                </label>

                <div className="register-role-grid">
                  {roles.map((item) => {
                    const Icon = item.icon;
                    const selected = role === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        className={`register-role-card ${
                          selected
                            ? "register-role-card-selected"
                            : ""
                        }`}
                        onClick={() =>
                          setRole(item.value)
                        }
                        aria-pressed={selected}
                      >
                        <Icon
                          className="register-role-icon"
                          size={24}
                          strokeWidth={1.7}
                        />

                        <span className="register-role-title">
                          {item.label}
                        </span>

                        <span className="register-role-description">
                          {item.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name */}
              <RegisterField
                id="fullName"
                label="Full Legal Name"
                icon={<Badge size={19} />}
                placeholder="e.g. Jane Doe"
                type="text"
                value={form.fullName}
                onChange={(value) =>
                  updateField("fullName", value)
                }
              />

              {/* Email */}
              <RegisterField
                id="email"
                label="Comm Channel (Email)"
                icon={<Mail size={19} />}
                placeholder="node@network.org"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
              />

              {/* Phone */}
              <RegisterField
                id="phone"
                label="Direct Contact (Phone)"
                icon={<Phone size={19} />}
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
              />

              {/* Authentication Key */}
              <div className="register-field">
                <label
                  className="register-label"
                  htmlFor="authKey"
                >
                  Create Authentication Key
                </label>

                <div className="register-input-wrap">
                  <KeyRound
                    className="register-input-icon"
                    size={19}
                  />

                  <input
                    id="authKey"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter secure key"
                    value={form.authKey}
                    onChange={(event) =>
                      updateField(
                        "authKey",
                        event.target.value,
                      )
                    }
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    aria-label={
                      showPassword
                        ? "Hide authentication key"
                        : "Show authentication key"
                    }
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="register-help-text">
                  Key must contain alphanumeric and
                  symbol parameters.
                </p>
              </div>

              {/* Error */}
              {error && (
                <p className="register-error">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="register-submit"
              >
                <UserPlus size={19} />

                <span>Create Account</span>
              </button>
            </form>

            {/* Login */}
            <div className="register-login-footer">
              <p>
                Already have an auth key?

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
                >
                  Log in here
                </button>
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="register-footer">
            <p>
              Access restricted to authorized personnel.
            </p>

            <div className="register-network-status">
              <span className="register-status-dot" />
              <span>Net: Operational</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

interface RegisterFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

function RegisterField({
  id,
  label,
  icon,
  placeholder,
  type,
  value,
  onChange,
}: RegisterFieldProps) {
  return (
    <div className="register-field">
      <label
        className="register-label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="register-input-wrap">
        <span className="register-input-icon">
          {icon}
        </span>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          required
        />
      </div>
    </div>
  );
}