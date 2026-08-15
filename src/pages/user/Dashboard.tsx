import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronRight,
  CircleCheck,
  Clock3,
  CloudRain,
  Flame,
  History,
  Home,
  LocateFixed,
  Map,
  Menu,
  Navigation,
  Route,
  Search,
  Settings,
  ShieldAlert,
  Siren,
  Thermometer,
  Wind,
} from "lucide-react";

import {
  alerts,
  dashboardStats,
  environmentalData,
  recentActivity,
  shelters,
} from "../../features/dashboard/dashboard.data";

import "../../styles/dashboard.css";

const iconMap = {
  warning: AlertTriangle,
  route: Route,
  shelter: Home,
  timer: Clock3,

  earthquake: Activity,
  flood: CloudRain,
  fire: Flame,

  wind: Wind,
  rain: CloudRain,
  temperature: Thermometer,
  hazard: ShieldAlert,
};

type IconName = keyof typeof iconMap;

function DashboardIcon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const Icon = iconMap[name];

  return <Icon size={size} strokeWidth={1.8} />;
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      {/* ==================================================
          TOP BAR
      ================================================== */}

      <header className="dashboard-topbar">

        <div className="dashboard-mobile-brand">
          <button
            className="mobile-menu-button"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <span>ResQRoute</span>
        </div>

        <div className="topbar-actions">

          <div className="dashboard-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search..."
            />
          </div>

          <button
            className="topbar-icon-button notification-button"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="notification-dot" />
          </button>

          <button
            className="topbar-icon-button"
            aria-label="Profile"
          >
            <CircleCheck size={21} />
          </button>

        </div>
      </header>


      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <Route size={19} />
          </div>

          <div>
            <h1>ResQRoute</h1>

            <p>
              Precision Disaster Management
            </p>
          </div>

        </div>


        <nav className="sidebar-navigation">

          <button
            className="sidebar-link sidebar-link-active"
            onClick={() => navigate("/dashboard")}
          >
            <Activity size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/map")}
          >
            <Map size={19} />
            <span>Live Map</span>
          </button>

          <button
            className="sidebar-link sidebar-link-sos"
            onClick={() => navigate("/sos")}
          >
            <Siren size={19} />
            <span>Send SOS</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/shelters")}
          >
            <Home size={19} />
            <span>Shelters</span>
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/alerts")}
          >
            <Bell size={19} />
            <span>Alerts</span>

            <span className="sidebar-alert-count">
              3
            </span>
          </button>

          <button
            className="sidebar-link"
            onClick={() => navigate("/settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>


        <div className="sidebar-status">

          <span className="system-status-dot" />

          <span>
            System Status: Active
          </span>

          <CircleCheck size={17} />

        </div>

      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="dashboard-main">

        {/* Page Header */}

        <header className="dashboard-header">

          <h1>Dashboard</h1>

          <p>
            Real-time disaster monitoring and response
            coordination.
          </p>

        </header>


        {/* ==================================================
            KPI CARDS
        ================================================== */}

        <section className="dashboard-kpi-grid">

          {dashboardStats.map((stat) => (

            <div
              key={stat.title}
              className={`kpi-card kpi-${stat.variant}`}
            >

              <div className="kpi-top">

                <DashboardIcon
                  name={stat.icon as IconName}
                  size={24}
                />

                {stat.status && (
                  <span className="kpi-status">
                    {stat.status}
                  </span>
                )}

              </div>

              <div>

                <h3>
                  {stat.title}
                </h3>

                <p className="kpi-value">

                  {stat.value}

                  {stat.unit && (
                    <span>
                      {stat.unit}
                    </span>
                  )}

                </p>

              </div>

            </div>

          ))}

        </section>


        {/* ==================================================
            MAIN BENTO GRID
        ================================================== */}

        <section className="dashboard-bento">

          {/* LEFT COLUMN */}

          <div className="dashboard-left-column">


            {/* ==================================================
                ACTIVE ALERTS
            ================================================== */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <h2>

                  <AlertTriangle size={20} />

                  Active Disaster Alerts

                </h2>

                <button
                  className="panel-action"
                  onClick={() => navigate("/alerts")}
                >
                  VIEW ALL
                </button>

              </div>


              <div className="alerts-list">

                {alerts.map((alert) => (

                  <div
                    key={alert.id}
                    className={`alert-item alert-${alert.variant}`}
                  >

                    <div className="alert-content">

                      <div className="alert-icon">

                        <DashboardIcon
                          name={alert.icon as IconName}
                          size={21}
                        />

                      </div>


                      <div>

                        <div className="alert-title-row">

                          <h3>
                            {alert.title}
                          </h3>

                          <span className="severity-badge">
                            {alert.severity}
                          </span>

                        </div>


                        <p className="alert-meta">

                          <LocateFixed size={14} />

                          {alert.location}

                          {alert.distance && (
                            <>
                              <span className="meta-dot" />
                              {alert.distance}
                            </>
                          )}

                          {alert.magnitude && (
                            <>
                              <span className="meta-dot" />

                              <strong>
                                {alert.magnitude}
                              </strong>
                            </>
                          )}

                        </p>

                      </div>

                    </div>


                    <button
                      className="alert-arrow"
                      aria-label={`View ${alert.title}`}
                    >
                      <ChevronRight size={19} />
                    </button>

                  </div>

                ))}

              </div>

            </section>


            {/* ==================================================
                NEARBY SHELTERS
            ================================================== */}

            <section className="dashboard-panel">

              <div className="panel-header">

                <h2>

                  <Home size={20} />

                  Nearby Shelters

                </h2>

              </div>


              <div className="shelter-grid">

                {shelters.map((shelter) => {

                  const occupancyPercentage =
                    (shelter.occupancy /
                      shelter.capacity) *
                    100;

                  return (

                    <div
                      key={shelter.id}
                      className="shelter-card"
                    >

                      <div className="shelter-card-header">

                        <div>

                          <h3>
                            {shelter.name}
                          </h3>

                          <p>
                            {shelter.distance}
                          </p>

                        </div>

                        <span
                          className={`shelter-status shelter-status-${shelter.variant}`}
                        >
                          {shelter.status}
                        </span>

                      </div>


                      <div className="occupancy">

                        <div className="occupancy-label">

                          <span>
                            Occupancy
                          </span>

                          <span>
                            {shelter.occupancy} /{" "}
                            {shelter.capacity}
                          </span>

                        </div>


                        <div className="progress-track">

                          <div
                            className={`progress-fill progress-${shelter.variant}`}
                            style={{
                              width: `${occupancyPercentage}%`,
                            }}
                          />

                        </div>

                      </div>


                      <button
                        className="directions-button"
                        onClick={() =>
                          navigate("/map")
                        }
                      >
                        <Navigation size={17} />

                        Get Directions

                      </button>

                    </div>

                  );

                })}

              </div>

            </section>

          </div>


          {/* ==================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="dashboard-right-column">


            {/* ==================================================
                EMERGENCY ASSISTANCE
            ================================================== */}

            <section className="emergency-panel">

              <div className="sos-icon">

                <Siren size={30} />

              </div>

              <div>

                <h2>
                  Emergency Assistance
                </h2>

                <p>
                  Broadcast immediate distress signal
                  to all nearby responders.
                </p>

              </div>

              <button
                className="send-sos-button"
                onClick={() => navigate("/sos")}
              >
                SEND SOS SIGNAL
              </button>

            </section>


            {/* ==================================================
                ENVIRONMENTAL DATA
            ================================================== */}

            <section className="dashboard-panel environmental-panel">

              <div className="panel-header">

                <h2>

                  <Activity size={20} />

                  Environmental Data

                </h2>

              </div>


              <div className="environment-grid">

                {environmentalData.map((data) => (

                  <div
                    key={data.label}
                    className={`environment-card environment-${data.variant}`}
                  >

                    <div className="environment-label">

                      <DashboardIcon
                        name={data.icon as IconName}
                        size={16}
                      />

                      <span>
                        {data.label}
                      </span>

                    </div>


                    <p className="environment-value">

                      {data.value}

                      <span>
                        {data.unit}
                      </span>

                    </p>


                    <span className="environment-status">
                      {data.status}
                    </span>

                  </div>

                ))}

              </div>

            </section>


            {/* ==================================================
                RECENT ACTIVITY
            ================================================== */}

            <section className="dashboard-panel activity-panel">

              <div className="panel-header">

                <h2>

                  <History size={20} />

                  Recent Activity

                </h2>

              </div>


              <div className="activity-timeline">

                {recentActivity.map((activity) => (

                  <div
                    key={activity.id}
                    className="timeline-item"
                  >

                    <span
                      className={`timeline-dot timeline-${activity.variant}`}
                    />

                    <div>

                      <p className="timeline-time">
                        {activity.time}
                      </p>

                      <p className="timeline-message">
                        {activity.message}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>

          </div>

        </section>

      </main>

    </div>
  );
}