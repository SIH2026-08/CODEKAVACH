import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  Bell,
  CheckCircle,
  CircleAlert,
  Home,
  Map,
  Navigation,
  Radio,
  Route,
  Search,
  Settings,
  Siren,
} from "lucide-react";

import {
  mapFilters,
  routeData,
  type MapFilter,
} from "../../features/map/map.data";

import "../../styles/live-map.css";


export default function LiveMap() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] =
    useState<MapFilter>("all");

  const [navigationStarted, setNavigationStarted] =
    useState(false);


  /* =====================================================
     NAVIGATION
     ===================================================== */

  const handleStartNavigation = () => {
    setNavigationStarted(true);

    /*
     * TODO:
     * Connect this to your actual navigation/map service.
     *
     * For example, later we can:
     *
     * - get user's current GPS coordinates
     * - calculate a safe route
     * - avoid active danger zones
     * - open turn-by-turn navigation
     */
  };


  /* =====================================================
     NAVIGATION HELPER
     * ==================================================== */

  const goTo = (path: string) => {
    navigate(path);
  };


  return (
    <div className="live-map-page">


      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="map-topbar">


        {/* Search */}

        <div className="map-topbar-left">

          <div className="map-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search coordinates, shelters..."
            />

          </div>

        </div>


        {/* Brand */}

        <div className="map-topbar-brand">

          ResQRoute

        </div>


        {/* Actions */}

        <div className="map-topbar-actions">

          <button
            className="map-topbar-button"
            aria-label="Notifications"
          >

            <Bell size={20} />

            <span className="map-notification-dot" />

          </button>


          <button
            className="map-profile-button"
            aria-label="Profile"
          >

            <div className="map-profile-placeholder">

              <Activity size={16} />

            </div>

          </button>

        </div>

      </header>


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="map-sidebar">


        {/* Brand */}

        <div className="map-sidebar-brand">

          <div className="map-sidebar-logo">

            <Siren size={18} />

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

        <nav className="map-sidebar-nav">


          <button
            className="map-nav-link"
            onClick={() =>
              goTo("/dashboard")
            }
          >

            <Activity size={19} />

            Dashboard

          </button>


          <button
            className="map-nav-link map-nav-active"
            onClick={() =>
              goTo("/map")
            }
          >

            <Map size={19} />

            Live Map

          </button>


          <button
            className="map-nav-link map-nav-sos"
            onClick={() =>
              goTo("/sos")
            }
          >

            <Siren size={19} />

            Send SOS

          </button>


          <button
            className="map-nav-link"
            onClick={() =>
              goTo("/shelters")
            }
          >

            <Home size={19} />

            Shelters

          </button>


          <button
            className="map-nav-link"
            onClick={() =>
              goTo("/alerts")
            }
          >

            <Bell size={19} />

            Alerts

          </button>


          <button
            className="map-nav-link"
            onClick={() =>
              goTo("/settings")
            }
          >

            <Settings size={19} />

            Settings

          </button>

        </nav>


        {/* System Status */}

        <div className="map-system-status">

          <CheckCircle size={17} />

          <span>
            System Status: Active
          </span>

        </div>

      </aside>


      {/* =================================================
          MAP AREA
      ================================================= */}

      <main className="live-map-main">


        {/* =================================================
            MAP BACKGROUND
        ================================================= */}

        <div className="map-background">


          {/* Tactical grid */}

          <div className="map-grid" />

          <div className="map-overlay-dark" />


          {/* =================================================
              SAFE ROUTE
          ================================================= */}

          <svg
            className="safe-route-svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            <path
              d="M 300,700 Q 400,600 500,650 T 800,300"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="4"
              strokeDasharray="10 10"
              className="safe-route-line"
            />

          </svg>


          {/* =================================================
              HIGH RISK ZONE
          ================================================= */}

          {(activeFilter === "all" ||
            activeFilter === "danger") && (

            <div className="map-marker high-risk-marker">

              <div className="high-risk-ring">

                <div className="risk-center danger" />

              </div>

            </div>

          )}


          {/* =================================================
              MEDIUM RISK ZONE
          ================================================= */}

          {(activeFilter === "all" ||
            activeFilter === "danger" ||
            activeFilter === "floods") && (

            <div className="map-marker medium-risk-marker">

              <div className="medium-risk-ring">

                <div className="risk-center warning" />

              </div>

            </div>

          )}


          {/* =================================================
              SAFE SHELTER
          ================================================= */}

          {(activeFilter === "all" ||
            activeFilter === "shelters") && (

            <div className="map-marker shelter-marker">

              <div className="shelter-marker-circle">

                <Home size={21} />

              </div>

            </div>

          )}


          {/* =================================================
              DESTINATION
          ================================================= */}

          {(activeFilter === "all" ||
            activeFilter === "responders") && (

            <div className="map-marker destination-marker">

              <div className="destination-marker-circle">

                <Navigation size={19} />

              </div>

            </div>

          )}


          {/* =================================================
              MAP UI
          ================================================= */}

          <div className="map-ui-container">


            {/* =================================================
                HEADER PANEL
            ================================================= */}

            <div className="map-header-row">


              <div className="map-glass-panel map-title-panel">

                <h2>
                  Live Disaster Map
                </h2>

                <p>
                  Real-time visualization of active
                  disasters, safe zones, and emergency
                  resources.
                </p>

              </div>


              {/* Filters */}

              <div className="map-glass-panel map-filter-panel">

                {mapFilters.map(
                  (filter) => {

                    const isActive =
                      activeFilter === filter.id;

                    return (

                      <button
                        key={filter.id}
                        className={`map-filter-button ${
                          isActive
                            ? "map-filter-active"
                            : ""
                        }`}
                        onClick={() =>
                          setActiveFilter(
                            filter.id
                          )
                        }
                      >

                        {filter.id ===
                          "danger" && (

                          <span className="danger-filter-dot" />

                        )}

                        {filter.label}

                      </button>

                    );

                  }
                )}

              </div>

            </div>


            {/* =================================================
                BOTTOM PANELS
            ================================================= */}

            <div className="map-bottom-row">


              {/* =================================================
                  LEGEND
              ================================================= */}

              <div className="map-glass-panel map-legend">


                <h3>
                  MAP LEGEND
                </h3>


                <div className="legend-item">

                  <span className="legend-symbol legend-high-risk" />

                  <span>
                    High Risk Zone
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-symbol legend-medium-risk" />

                  <span>
                    Medium Risk
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-symbol legend-safe-zone" />

                  <span>
                    Safe Zone
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-route" />

                  <span>
                    Safe Route
                  </span>

                </div>

              </div>


              {/* =================================================
                  SAFE ROUTE PANEL
              ================================================= */}

              <div className="map-glass-panel safe-route-panel">


                <div className="safe-route-glow" />


                <div className="safe-route-header">

                  <div className="safe-route-title">

                    <Route
                      size={20}
                      className="route-pulse"
                    />

                    <h3>
                      Safe Route Active
                    </h3>

                  </div>

                </div>


                <p className="route-warning">

                  <CircleAlert
                    size={15}
                  />

                  Avoiding{" "}
                  {routeData.dangerZonesAvoided}{" "}
                  danger zones

                </p>


                {/* Route Statistics */}

                <div className="route-stats">


                  <div className="route-stat">

                    <p>
                      DISTANCE
                    </p>

                    <strong>
                      {routeData.distance}
                    </strong>

                  </div>


                  <div className="route-stat">

                    <p>
                      EST. TIME
                    </p>

                    <strong>
                      {routeData.estimatedTime}
                    </strong>

                  </div>


                </div>


                {/* Safety Level */}

                <div className="safety-level">

                  <span>
                    Safety Level
                  </span>

                  <strong>
                    {routeData.safetyLevel}
                  </strong>

                </div>


                {/* Navigation Button */}

                <button
                  className={`start-navigation ${
                    navigationStarted
                      ? "navigation-active"
                      : ""
                  }`}
                  onClick={
                    handleStartNavigation
                  }
                >

                  {navigationStarted ? (
                    <>
                      <Radio size={19} />

                      Navigation Active

                    </>
                  ) : (
                    <>
                      <Navigation size={19} />

                      Start Navigation

                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}