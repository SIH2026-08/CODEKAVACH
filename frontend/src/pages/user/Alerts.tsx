import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  CloudRain,
  Home,
  Map,
  MapPin,
  Menu,
  MoreVertical,
  Settings,
  Siren,
  TrafficCone,
  Waves,
} from "lucide-react";

import {
  alerts,
  alertSummary,
  activityTimeline,
  type AlertType,
  type DisasterAlert,
} from "../../features/alerts/alert.data";

import "../../styles/alerts.css";


type AlertFilter =
  | "all"
  | "critical"
  | "warning"
  | "info"
  | "unread";


export default function Alerts() {

  const navigate = useNavigate();


  /* =====================================================
     STATE
     ===================================================== */

  const [activeFilter, setActiveFilter] =
    useState<AlertFilter>("all");

  const [alertList, setAlertList] =
    useState<DisasterAlert[]>(alerts);

  const [criticalEnabled, setCriticalEnabled] =
    useState(true);

  const [warningEnabled, setWarningEnabled] =
    useState(true);

  const [infoEnabled, setInfoEnabled] =
    useState(true);

  const [pushEnabled, setPushEnabled] =
    useState(true);

  const [muted, setMuted] =
    useState(false);


  /* =====================================================
     FILTERED ALERTS
     ===================================================== */

  const filteredAlerts = useMemo(() => {

    switch (activeFilter) {

      case "critical":
        return alertList.filter(
          (alert) =>
            alert.type === "critical"
        );

      case "warning":
        return alertList.filter(
          (alert) =>
            alert.type === "warning"
        );

      case "info":
        return alertList.filter(
          (alert) =>
            alert.type === "info"
        );

      case "unread":
        return alertList.filter(
          (alert) =>
            !alert.read
        );

      default:
        return alertList;

    }

  }, [
    activeFilter,
    alertList,
  ]);


  /* =====================================================
     COUNTS
     ===================================================== */

  const unreadCount =
    alertList.filter(
      (alert) =>
        !alert.read
    ).length;


  /* =====================================================
     MARK ALL READ
     ===================================================== */

  const markAllAsRead = () => {

    setAlertList((current) =>
      current.map((alert) => ({
        ...alert,
        read: true,
      }))
    );

  };


  /* =====================================================
     DISMISS
     ===================================================== */

  const dismissAlert = (
    id: string
  ) => {

    setAlertList((current) =>
      current.filter(
        (alert) =>
          alert.id !== id
      )
    );

  };


  /* =====================================================
     VIEW MAP
     ===================================================== */

  const viewMap = () => {

    navigate("/map");

  };


  /* =====================================================
     ALERT ICON
     ===================================================== */

  const getAlertIcon = (
    alert: DisasterAlert
  ) => {

    if (alert.icon === "tsunami") {
      return <Waves size={21} />;
    }

    if (alert.icon === "storm") {
      return <CloudRain size={21} />;
    }

    if (alert.icon === "traffic") {
      return <TrafficCone size={21} />;
    }

    return <AlertTriangle size={21} />;

  };


  return (

    <div className="alerts-page">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="alerts-sidebar">


        <div className="alerts-sidebar-brand">

          <h1>
            ResQRoute
          </h1>

          <p>
            Precision Disaster Management
          </p>

        </div>


        <nav className="alerts-navigation">


          <button
            className="alerts-nav-link"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            <Activity size={19} />

            Dashboard

          </button>


          <button
            className="alerts-nav-link"
            onClick={() =>
              navigate("/map")
            }
          >

            <Map size={19} />

            Live Map

          </button>


          <button
            className="alerts-nav-link alerts-nav-sos"
            onClick={() =>
              navigate("/sos")
            }
          >

            <Siren size={19} />

            Send SOS

          </button>


          <button
            className="alerts-nav-link"
            onClick={() =>
              navigate("/shelters")
            }
          >

            <Home size={19} />

            Shelters

          </button>


          <button
            className="alerts-nav-link alerts-nav-active"
            onClick={() =>
              navigate("/alerts")
            }
          >

            <Bell size={19} />

            Alerts

          </button>


          <button
            className="alerts-nav-link"
            onClick={() =>
              navigate("/settings")
            }
          >

            <Settings size={19} />

            Settings

          </button>

        </nav>


        <div className="alerts-system-status">

          <CheckCircle size={17} />

          System Status: Active

        </div>

      </aside>


      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="alerts-topbar">


        <div className="alerts-mobile-brand">

          <button
            className="mobile-menu-button"
            aria-label="Open menu"
          >

            <Menu size={21} />

          </button>

          <span>
            ResQRoute
          </span>

        </div>


        <div className="alerts-topbar-actions">


          <button
            className="topbar-notification-button"
            aria-label="Notifications"
          >

            <Bell size={21} />

            <span />

          </button>


          <button className="alerts-profile">

            <div className="alerts-profile-avatar">

              <Activity size={15} />

            </div>

            <span>
              Alex M.
            </span>

          </button>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="alerts-main">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="alerts-page-header">

          <div>

            <h1>
              Notifications & Alerts
            </h1>

            <p>
              Stay updated with real-time disaster
              alerts and important updates
            </p>

          </div>


          <div className="alerts-header-actions">


            <button
              className={`mute-button ${
                muted
                  ? "mute-active"
                  : ""
              }`}
              onClick={() =>
                setMuted((value) =>
                  !value
                )
              }
            >

              {muted
                ? "Unmute All"
                : "Mute All"}

            </button>


            <button
              className="mark-read-button"
              onClick={
                markAllAsRead
              }
            >

              <CheckCircle
                size={16}
              />

              Mark All as Read

            </button>

          </div>

        </section>


        {/* =================================================
            CONTENT GRID
        ================================================= */}

        <div className="alerts-content-grid">


          {/* =================================================
              ALERT LIST
          ================================================= */}

          <section className="alerts-list-section">


            {/* Filters */}

            <div className="alert-filters">


              <FilterButton
                label={`All (${alertList.length})`}
                active={
                  activeFilter === "all"
                }
                onClick={() =>
                  setActiveFilter(
                    "all"
                  )
                }
              />


              <FilterButton
                label={`Critical (${alertSummary.critical})`}
                active={
                  activeFilter ===
                  "critical"
                }
                onClick={() =>
                  setActiveFilter(
                    "critical"
                  )
                }
              />


              <FilterButton
                label={`Warning (${alertSummary.warning})`}
                active={
                  activeFilter ===
                  "warning"
                }
                onClick={() =>
                  setActiveFilter(
                    "warning"
                  )
                }
              />


              <FilterButton
                label={`Info (${alertSummary.info})`}
                active={
                  activeFilter ===
                  "info"
                }
                onClick={() =>
                  setActiveFilter(
                    "info"
                  )
                }
              />


              <FilterButton
                label={`Unread (${unreadCount})`}
                active={
                  activeFilter ===
                  "unread"
                }
                onClick={() =>
                  setActiveFilter(
                    "unread"
                  )
                }
              />

            </div>


            {/* Alert Cards */}

            <div className="alert-list">


              {filteredAlerts.length === 0 ? (

                <div className="alerts-empty">

                  <CheckCircle size={32} />

                  <h3>
                    No alerts found
                  </h3>

                  <p>
                    There are no alerts matching
                    this filter.
                  </p>

                </div>

              ) : (

                filteredAlerts.map(
                  (alert) => (

                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onDismiss={
                        dismissAlert
                      }
                      onViewMap={
                        viewMap
                      }
                      getIcon={
                        getAlertIcon
                      }
                    />

                  )
                )

              )}

            </div>

          </section>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="alerts-right-column">


            {/* Alert Summary */}

            <AlertSummary />


            {/* Preferences */}

            <NotificationPreferences
              criticalEnabled={
                criticalEnabled
              }
              warningEnabled={
                warningEnabled
              }
              infoEnabled={
                infoEnabled
              }
              pushEnabled={
                pushEnabled
              }
              setCriticalEnabled={
                setCriticalEnabled
              }
              setWarningEnabled={
                setWarningEnabled
              }
              setInfoEnabled={
                setInfoEnabled
              }
              setPushEnabled={
                setPushEnabled
              }
            />


            {/* Timeline */}

            <ActivityTimeline />

          </aside>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   FILTER BUTTON
   ========================================================= */

interface FilterButtonProps {

  label: string;

  active: boolean;

  onClick: () => void;
}


function FilterButton({
  label,
  active,
  onClick,
}: FilterButtonProps) {

  return (

    <button
      className={`alert-filter ${
        active
          ? "alert-filter-active"
          : ""
      }`}
      onClick={onClick}
    >

      {label}

    </button>

  );
}


/* =========================================================
   ALERT CARD
   ========================================================= */

interface AlertCardProps {

  alert: DisasterAlert;

  onDismiss: (
    id: string
  ) => void;

  onViewMap: () => void;

  getIcon: (
    alert: DisasterAlert
  ) => React.ReactNode;
}


function AlertCard({
  alert,
  onDismiss,
  onViewMap,
  getIcon,
}: AlertCardProps) {

  return (

    <article
      className={`alert-card alert-${alert.type} ${
        alert.read
          ? "alert-read"
          : ""
      }`}
    >


      <div className="alert-color-bar" />


      <div className="alert-icon">

        {getIcon(alert)}

      </div>


      <div className="alert-card-content">


        <div className="alert-meta-row">

          <div className="alert-meta-left">

            <span className="alert-type-badge">

              {alert.type}

            </span>

            <span className="alert-time">
              {alert.time}
            </span>

          </div>


          <button
            className="alert-more-button"
            aria-label="More options"
          >

            <MoreVertical size={19} />

          </button>

        </div>


        <h3>
          {alert.title}
        </h3>


        <p className="alert-description">
          {alert.description}
        </p>


        {alert.location && (

          <div className="alert-location">

            <MapPin size={16} />

            {alert.location}

          </div>

        )}


        {alert.actionLabel && (

          <div className="alert-actions">


            <button
              className="alert-map-button"
              onClick={onViewMap}
            >

              <Map size={16} />

              {alert.actionLabel}

            </button>


            {alert.type ===
              "critical" && (

              <button
                className="alert-dismiss-button"
                onClick={() =>
                  onDismiss(
                    alert.id
                  )
                }
              >
                Dismiss
              </button>

            )}

          </div>

        )}

      </div>

    </article>

  );
}


/* =========================================================
   SUMMARY
   ========================================================= */

function AlertSummary() {

  return (

    <section className="alert-panel">

      <h2>
        Alert Summary
      </h2>


      <div className="summary-list">


        <SummaryRow
          type="critical"
          label="Critical"
          description="Immediate action"
          count={
            alertSummary.critical
          }
        />


        <SummaryRow
          type="warning"
          label="Warning"
          description="Attention needed"
          count={
            alertSummary.warning
          }
        />


        <SummaryRow
          type="info"
          label="Info"
          description="General updates"
          count={
            alertSummary.info
          }
        />

      </div>

    </section>
  );
}


/* =========================================================
   SUMMARY ROW
   ========================================================= */

interface SummaryRowProps {

  type: AlertType;

  label: string;

  description: string;

  count: number;
}


function SummaryRow({
  type,
  label,
  description,
  count,
}: SummaryRowProps) {

  return (

    <div
      className={`summary-row summary-${type}`}
    >

      <div className="summary-label">

        <span />

        {label}

      </div>


      <div className="summary-value">

        <small>
          {description}
        </small>

        <strong>
          {count}
        </strong>

      </div>

    </div>
  );
}


/* =========================================================
   PREFERENCES
   ========================================================= */

interface NotificationPreferencesProps {

  criticalEnabled: boolean;

  warningEnabled: boolean;

  infoEnabled: boolean;

  pushEnabled: boolean;

  setCriticalEnabled: (
    value: boolean
  ) => void;

  setWarningEnabled: (
    value: boolean
  ) => void;

  setInfoEnabled: (
    value: boolean
  ) => void;

  setPushEnabled: (
    value: boolean
  ) => void;
}


function NotificationPreferences({
  criticalEnabled,
  warningEnabled,
  infoEnabled,
  pushEnabled,
  setCriticalEnabled,
  setWarningEnabled,
  setInfoEnabled,
  setPushEnabled,
}: NotificationPreferencesProps) {

  return (

    <section className="alert-panel">

      <h2>
        Preferences
      </h2>


      <div className="preferences-list">


        <PreferenceToggle
          label="Critical Alerts"
          enabled={
            criticalEnabled
          }
          disabled
          danger
          onChange={
            setCriticalEnabled
          }
        />


        <PreferenceToggle
          label="Warning Alerts"
          enabled={
            warningEnabled
          }
          onChange={
            setWarningEnabled
          }
        />


        <PreferenceToggle
          label="Info Alerts"
          enabled={
            infoEnabled
          }
          onChange={
            setInfoEnabled
          }
        />


        <PreferenceToggle
          label="Push Notifications"
          enabled={
            pushEnabled
          }
          separated
          onChange={
            setPushEnabled
          }
        />

      </div>

    </section>
  );
}


/* =========================================================
   TOGGLE
   ========================================================= */

interface PreferenceToggleProps {

  label: string;

  enabled: boolean;

  onChange: (
    value: boolean
  ) => void;

  disabled?: boolean;

  danger?: boolean;

  separated?: boolean;
}


function PreferenceToggle({
  label,
  enabled,
  onChange,
  disabled = false,
  danger = false,
  separated = false,
}: PreferenceToggleProps) {

  return (

    <label
      className={`preference-row ${
        separated
          ? "preference-separated"
          : ""
      }`}
    >

      <span>
        {label}
      </span>


      <button
        type="button"
        disabled={disabled}
        className={`toggle ${
          enabled
            ? "toggle-on"
            : ""
        } ${
          danger
            ? "toggle-danger"
            : ""
        }`}
        onClick={() =>
          onChange(!enabled)
        }
        aria-pressed={enabled}
      >

        <span />

      </button>

    </label>
  );
}


/* =========================================================
   TIMELINE
   ========================================================= */

function ActivityTimeline() {

  return (

    <section className="alert-panel timeline-panel">

      <h2>
        Activity Timeline
      </h2>


      <div className="timeline">


        {activityTimeline.map(
          (activity) => (

            <div
              key={activity.id}
              className="timeline-item"
            >

              <span
                className={`timeline-dot ${
                  activity.type ===
                  "critical"
                    ? "timeline-critical"
                    : ""
                }`}
              />


              <div>

                <span className="timeline-title">
                  {activity.title}
                </span>

                <span className="timeline-time">
                  {activity.time}
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </section>
  );
}