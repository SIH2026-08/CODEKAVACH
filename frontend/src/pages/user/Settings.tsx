import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  Camera,
  CheckCircle,
  ContactRound,
  Home,
  LockKeyhole,
  Map,
  Menu,
  Palette,
  Save,
  Search,
  Settings as SettingsIcon,
  Siren,
  User,
} from "lucide-react";

import "../../styles/settings.css";


type SettingsTab =
  | "profile"
  | "notifications"
  | "contacts"
  | "appearance"
  | "security";


interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  base: string;
}


export default function Settings() {

  const navigate = useNavigate();


  /* =====================================================
     STATE
     ===================================================== */

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");


  const [profile, setProfile] =
    useState<ProfileData>({
      firstName: "Team",
      lastName: "Titans",
      email: "teamtitans@resqconnect.com",
      phone: "+91 XXXXXXXXXX",
      base: "Delhi NCR Emergency Response Center, Greater Noida, Uttar Pradesh",
    });


  const [saved, setSaved] =
    useState(false);


  const [notifications, setNotifications] =
    useState({
      critical: true,
      warning: true,
      info: true,
      push: true,
    });


  const [darkMode, setDarkMode] =
    useState(true);


  /* =====================================================
     UPDATE PROFILE
     ===================================================== */

  const updateProfile = (
    field: keyof ProfileData,
    value: string
  ) => {

    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);

  };


  /* =====================================================
     SAVE PROFILE
     ===================================================== */

  const handleSave = () => {

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);

  };


  /* =====================================================
     CANCEL
     ===================================================== */

  const handleCancel = () => {

    setProfile({
      firstName: "Tech",
      lastName: "Titans",
      email: "teamtitans@resqconnect.com",
      phone: "+91 XXXXXXXXXX",
      base: "Delhi NCR Emergency Response Center, Greater Noida, Uttar Pradesh",
    });

    setSaved(false);

  };


  /* =====================================================
     SIDEBAR NAVIGATION
     ===================================================== */

  const goTo = (
    path: string
  ) => {

    navigate(path);

  };


  return (

    <div className="settings-page">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="settings-sidebar">


        {/* Brand */}

        <div className="settings-brand">

          <div className="settings-brand-icon">

            <Siren size={22} />

          </div>

          <div>

            <h1>
              ResQRoute
            </h1>

            <p>
              Precision Disaster Management
            </p>

          </div>

        </div>


        {/* Navigation */}

        <nav className="settings-navigation">


          <button
            className="settings-nav-link"
            onClick={() =>
              goTo("/dashboard")
            }
          >

            <Home size={19} />

            <span>
              Dashboard
            </span>

          </button>


          <button
            className="settings-nav-link"
            onClick={() =>
              goTo("/map")
            }
          >

            <Map size={19} />

            <span>
              Live Map
            </span>

          </button>


          <button
            className="settings-nav-link settings-nav-sos"
            onClick={() =>
              goTo("/sos")
            }
          >

            <Siren size={19} />

            <span>
              Send SOS
            </span>

          </button>


          <button
            className="settings-nav-link"
            onClick={() =>
              goTo("/shelters")
            }
          >

            <Home size={19} />

            <span>
              Shelters
            </span>

          </button>


          <button
            className="settings-nav-link"
            onClick={() =>
              goTo("/alerts")
            }
          >

            <Bell size={19} />

            <span>
              Alerts
            </span>

          </button>


          <button
            className="settings-nav-link settings-nav-active"
            onClick={() =>
              goTo("/settings")
            }
          >

            <SettingsIcon size={19} />

            <span>
              Settings
            </span>

          </button>


        </nav>


        {/* System status */}

        <div className="settings-system-status">

          <CheckCircle size={17} />

          <span>
            System Status: Active
          </span>

        </div>

      </aside>


      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="settings-topbar">


        <div className="settings-mobile-brand">

          <button
            className="settings-mobile-menu"
            aria-label="Open menu"
          >

            <Menu size={21} />

          </button>


          <Siren size={22} />

          <span>
            ResQRoute
          </span>

        </div>


        {/* Search */}

        <div className="settings-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search parameters..."
          />

        </div>


        {/* Actions */}

        <div className="settings-top-actions">


          <button
            className="settings-notification-button"
            onClick={() =>
              goTo("/alerts")
            }
            aria-label="Notifications"
          >

            <Bell size={21} />

            <span />

          </button>


          <button className="settings-profile-button">

            <div className="settings-profile-avatar">

              <User size={17} />

            </div>

            <span>
              Alex M.
            </span>

          </button>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="settings-main">


        <div className="settings-container">


          {/* =================================================
              SETTINGS NAVIGATION
          ================================================= */}

          <aside className="settings-tabs">


            <h2>
              Settings
            </h2>


            <SettingsTabButton
              icon={
                <User size={18} />
              }
              label="Profile Information"
              active={
                activeTab === "profile"
              }
              onClick={() =>
                setActiveTab("profile")
              }
            />


            <SettingsTabButton
              icon={
                <Bell size={18} />
              }
              label="Notifications"
              active={
                activeTab ===
                "notifications"
              }
              onClick={() =>
                setActiveTab(
                  "notifications"
                )
              }
            />


            <SettingsTabButton
              icon={
                <ContactRound size={18} />
              }
              label="Emergency Contacts"
              active={
                activeTab === "contacts"
              }
              onClick={() =>
                setActiveTab("contacts")
              }
            />


            <SettingsTabButton
              icon={
                <Palette size={18} />
              }
              label="Appearance"
              active={
                activeTab === "appearance"
              }
              onClick={() =>
                setActiveTab(
                  "appearance"
                )
              }
            />


            <SettingsTabButton
              icon={
                <LockKeyhole size={18} />
              }
              label="Privacy & Security"
              active={
                activeTab === "security"
              }
              onClick={() =>
                setActiveTab("security")
              }
            />

          </aside>


          {/* =================================================
              SETTINGS CONTENT
          ================================================= */}

          <section className="settings-content">


            {activeTab === "profile" && (

              <ProfileSettings
                profile={profile}
                saved={saved}
                onChange={
                  updateProfile
                }
                onSave={
                  handleSave
                }
                onCancel={
                  handleCancel
                }
              />

            )}


            {activeTab === "notifications" && (

              <NotificationSettings
                notifications={
                  notifications
                }
                setNotifications={
                  setNotifications
                }
              />

            )}


            {activeTab === "contacts" && (

              <EmergencyContacts />

            )}


            {activeTab === "appearance" && (

              <AppearanceSettings
                darkMode={darkMode}
                setDarkMode={
                  setDarkMode
                }
              />

            )}


            {activeTab === "security" && (

              <SecuritySettings />

            )}

          </section>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   SETTINGS TAB BUTTON
   ========================================================= */

interface SettingsTabButtonProps {

  icon: React.ReactNode;

  label: string;

  active: boolean;

  onClick: () => void;
}


function SettingsTabButton({
  icon,
  label,
  active,
  onClick,
}: SettingsTabButtonProps) {

  return (

    <button
      className={`settings-tab-button ${
        active
          ? "settings-tab-active"
          : ""
      }`}
      onClick={onClick}
    >

      {icon}

      <span>
        {label}
      </span>

    </button>

  );
}


/* =========================================================
   PROFILE SETTINGS
   ========================================================= */

interface ProfileSettingsProps {

  profile: ProfileData;

  saved: boolean;

  onChange: (
    field: keyof ProfileData,
    value: string
  ) => void;

  onSave: () => void;

  onCancel: () => void;
}


function ProfileSettings({
  profile,
  saved,
  onChange,
  onSave,
  onCancel,
}: ProfileSettingsProps) {

  return (

    <section className="settings-panel">


      {/* Header */}

      <div className="settings-panel-header">

        <h3>
          Profile Information
        </h3>

        <span className="account-badge">
          User Account - Access to all
          user features
        </span>

      </div>


      {/* Avatar */}

      <div className="profile-avatar-section">


        <div className="profile-avatar-wrapper">

          <div className="profile-avatar-large">

            <User size={40} />

          </div>


          <button
            className="avatar-camera-button"
            aria-label="Change avatar"
          >

            <Camera size={18} />

          </button>

        </div>


        <div className="avatar-actions">

          <button className="secondary-button">

            Change profile

          </button>

          <p>
            Recommended size: 256x256px.
            Max 2MB.
          </p>

        </div>

      </div>


      {/* Form */}

      <div className="profile-form">


        <FormField
          label="First Name"
          value={profile.firstName}
          onChange={(value) =>
            onChange(
              "firstName",
              value
            )
          }
        />


        <FormField
          label="Last Name"
          value={profile.lastName}
          onChange={(value) =>
            onChange(
              "lastName",
              value
            )
          }
        />


        <FormField
          label="Email Address"
          type="email"
          value={profile.email}
          onChange={(value) =>
            onChange(
              "email",
              value
            )
          }
        />


        <FormField
          label="Phone Number"
          type="tel"
          value={profile.phone}
          onChange={(value) =>
            onChange(
              "phone",
              value
            )
          }
        />


        <div className="form-field form-field-full">

          <label>
            Primary Operating Address / Base
          </label>

          <input
            type="text"
            value={profile.base}
            onChange={(event) =>
              onChange(
                "base",
                event.target.value
              )
            }
          />

        </div>

      </div>


      {/* Actions */}

      <div className="settings-form-actions">


        {saved && (

          <div className="saved-message">

            <CheckCircle size={16} />

            Changes saved

          </div>

        )}


        <button
          className="secondary-button"
          onClick={onCancel}
        >

          Cancel

        </button>


        <button
          className="primary-button"
          onClick={onSave}
        >

          <Save size={16} />

          Save Changes

        </button>

      </div>

    </section>
  );
}


/* =========================================================
   FORM FIELD
   ========================================================= */

interface FormFieldProps {

  label: string;

  value: string;

  type?: string;

  onChange: (
    value: string
  ) => void;
}


function FormField({
  label,
  value,
  type = "text",
  onChange,
}: FormFieldProps) {

  return (

    <div className="form-field">

      <label>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      />

    </div>
  );
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

interface NotificationSettingsProps {

  notifications: {
    critical: boolean;
    warning: boolean;
    info: boolean;
    push: boolean;
  };

  setNotifications: React.Dispatch<
    React.SetStateAction<{
      critical: boolean;
      warning: boolean;
      info: boolean;
      push: boolean;
    }>
  >;
}


function NotificationSettings({
  notifications,
  setNotifications,
}: NotificationSettingsProps) {

  return (

    <section className="settings-panel">

      <div className="settings-panel-header">

        <div>

          <h3>
            Notifications
          </h3>

          <p>
            Control which emergency notifications
            you receive.
          </p>

        </div>

      </div>


      <div className="settings-options">


        <NotificationToggle
          title="Critical Alerts"
          description="Immediate threat notifications"
          enabled={
            notifications.critical
          }
          onChange={(value) =>
            setNotifications(
              (current) => ({
                ...current,
                critical: value,
              })
            )
          }
          danger
        />


        <NotificationToggle
          title="Warning Alerts"
          description="Potential threats requiring attention"
          enabled={
            notifications.warning
          }
          onChange={(value) =>
            setNotifications(
              (current) => ({
                ...current,
                warning: value,
              })
            )
          }
        />


        <NotificationToggle
          title="Information Alerts"
          description="General emergency and safety updates"
          enabled={
            notifications.info
          }
          onChange={(value) =>
            setNotifications(
              (current) => ({
                ...current,
                info: value,
              })
            )
          }
        />


        <NotificationToggle
          title="Push Notifications"
          description="Receive alerts on your device"
          enabled={
            notifications.push
          }
          onChange={(value) =>
            setNotifications(
              (current) => ({
                ...current,
                push: value,
              })
            )
          }
        />

      </div>

    </section>
  );
}


/* =========================================================
   NOTIFICATION TOGGLE
   ========================================================= */

interface NotificationToggleProps {

  title: string;

  description: string;

  enabled: boolean;

  onChange: (
    value: boolean
  ) => void;

  danger?: boolean;
}


function NotificationToggle({
  title,
  description,
  enabled,
  onChange,
  danger = false,
}: NotificationToggleProps) {

  return (

    <div className="notification-setting">

      <div>

        <h4>
          {title}
        </h4>

        <p>
          {description}
        </p>

      </div>


      <button
        type="button"
        className={`settings-toggle ${
          enabled
            ? danger
              ? "toggle-danger"
              : "toggle-enabled"
            : ""
        }`}
        onClick={() =>
          onChange(!enabled)
        }
        aria-pressed={enabled}
      >

        <span />

      </button>

    </div>
  );
}


/* =========================================================
   EMERGENCY CONTACTS
   ========================================================= */

function EmergencyContacts() {

  return (

    <section className="settings-panel">

      <div className="settings-panel-header">

        <div>

          <h3>
            Emergency Contacts
          </h3>

          <p>
            Contacts who can be notified during
            an emergency.
          </p>

        </div>

      </div>


      <div className="contact-list">


        <div className="contact-card">

          <div className="contact-avatar">

            <ContactRound size={20} />

          </div>


          <div className="contact-information">

            <strong>
              Emergency Operations Center
            </strong>

            <span>
              +91 XXXXXXXXXX
            </span>

          </div>


          <button className="secondary-button">
            Edit
          </button>

        </div>


        <div className="contact-card">

          <div className="contact-avatar">

            <ContactRound size={20} />

          </div>


          <div className="contact-information">

            <strong>
              Family Emergency Contact
            </strong>

            <span>
              +91 XXXXXXXXXX
            </span>

          </div>


          <button className="secondary-button">
            Edit
          </button>

        </div>


        <button className="primary-button add-contact-button">

          + Add Emergency Contact

        </button>

      </div>

    </section>
  );
}


/* =========================================================
   APPEARANCE
   ========================================================= */

interface AppearanceSettingsProps {

  darkMode: boolean;

  setDarkMode: (
    value: boolean
  ) => void;
}


function AppearanceSettings({
  darkMode,
  setDarkMode,
}: AppearanceSettingsProps) {

  return (

    <section className="settings-panel">

      <div className="settings-panel-header">

        <div>

          <h3>
            Appearance
          </h3>

          <p>
           Customize your emergency dashboard appearance and preferences.
          </p>

        </div>

      </div>


      <div className="appearance-options">


        <div className="appearance-card appearance-selected">

          <div className="appearance-preview dark-preview">

            <div />
            <div />
            <div />

          </div>

          <div>

            <strong>
              Dark Mode
            </strong>

            <p>
              Optimized for emergency
              command environments.
            </p>

          </div>

          <button
            className={`settings-toggle ${
              darkMode
                ? "toggle-enabled"
                : ""
            }`}
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            <span />

          </button>

        </div>


        <div className="appearance-card">

          <div className="appearance-preview light-preview">

            <div />
            <div />
            <div />

          </div>

          <div>

            <strong>
              Light Mode
            </strong>

            <p>
              Bright interface for
              well-lit environments.
            </p>

          </div>

          <button
            className="secondary-button"
            onClick={() =>
              setDarkMode(false)
            }
          >
            Use Light
          </button>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SECURITY
   ========================================================= */

function SecuritySettings() {

  return (

    <section className="settings-panel">

      <div className="settings-panel-header">

        <div>

          <h3>
            Privacy & Security
          </h3>

          <p>
            Manage account security and
            privacy controls.
          </p>

        </div>

      </div>


      <div className="security-list">


        <div className="security-row">

          <div>

            <strong>
              Change Password
            </strong>

            <p>
              Update your account password.
            </p>

          </div>

          <button className="secondary-button">
            Change
          </button>

        </div>


        <div className="security-row">

          <div>

            <strong>
              Two-Factor Authentication
            </strong>

            <p>
              Add another layer of account
              protection.
            </p>

          </div>

          <button className="secondary-button">
            Configure
          </button>

        </div>


        <div className="security-row">

          <div>

            <strong>
              Location Privacy
            </strong>

            <p>
              Control how your location is
              shared during emergencies.
            </p>

          </div>

          <button className="secondary-button">
            Manage
          </button>

        </div>

      </div>

    </section>
  );
}