import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  Bed,
  Bell,
  CheckCircle,
  Droplets,
  Fullscreen,
  Gauge,
  HeartPulse,
  Home,
  Map,
  MapPin,
  Navigation,
  Phone,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Siren,
  Utensils,
  Users,
} from "lucide-react";

import {
  shelters,
  type Shelter,
  type ShelterStatus,
} from "../../features/shelters/shelter.data";

import "../../styles/shelters.css";


type ShelterFilter =
  | "all"
  | ShelterStatus;


export default function Shelters() {

  const navigate = useNavigate();


  /* =====================================================
     STATE
     ===================================================== */

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState<ShelterFilter>("all");


  /* =====================================================
     FILTER SHELTERS
     ===================================================== */

  const filteredShelters = useMemo(() => {

    const query =
      searchQuery
        .trim()
        .toLowerCase();


    return shelters.filter((shelter) => {

      const matchesSearch =
        !query ||
        shelter.name
          .toLowerCase()
          .includes(query) ||
        shelter.address
          .toLowerCase()
          .includes(query) ||
        shelter.id
          .toLowerCase()
          .includes(query);


      const matchesStatus =
        activeFilter === "all" ||
        shelter.status === activeFilter;


      return (
        matchesSearch &&
        matchesStatus
      );

    });

  }, [
    searchQuery,
    activeFilter,
  ]);


  /* =====================================================
     STATISTICS
     ===================================================== */

  const totalCapacity =
    shelters.reduce(
      (total, shelter) =>
        total + shelter.capacity,
      0
    );

  const totalOccupied =
    shelters.reduce(
      (total, shelter) =>
        total + shelter.occupied,
      0
    );

  const occupancyPercentage =
    totalCapacity === 0
      ? 0
      : Math.round(
          (totalOccupied /
            totalCapacity) *
            100
        );


  /* =====================================================
     HELPERS
     ===================================================== */

  const getStatusLabel = (
    status: ShelterStatus
  ) => {

    switch (status) {
      case "available":
        return "Available";

      case "limited":
        return "Limited";

      case "full":
        return "Full";

      default:
        return status;
    }

  };


  const getStatusClass = (
    status: ShelterStatus
  ) => {

    switch (status) {

      case "available":
        return "status-available";

      case "limited":
        return "status-limited";

      case "full":
        return "status-full";

      default:
        return "";

    }

  };


  const getResourceIcon = (
    icon: string
  ) => {

    switch (icon) {

      case "medical":
        return <HeartPulse size={15} />;

      case "food":
        return <Utensils size={15} />;

      case "water":
        return <Droplets size={15} />;

      case "cots":
        return <Bed size={15} />;

      default:
        return null;

    }

  };


  const handleDirections = (
    shelter: Shelter
  ) => {

    /*
     * Later this can be connected to:
     *
     * - Google Maps
     * - OpenStreetMap
     * - Mapbox
     * - Your own safe-route engine
     */

    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };


  const handleCall = (
    shelter: Shelter
  ) => {

    window.location.href =
      `tel:${shelter.phone}`;

  };


  return (

    <div className="shelters-page">


      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="shelters-topbar">


        <div className="shelters-topbar-left">

          <span className="shelters-brand">
            ResQRoute
          </span>


          <div className="topbar-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search coordinates, personnel, shelters..."
            />

          </div>

        </div>


        <div className="topbar-actions">

          <button
            className="topbar-icon-button"
            aria-label="Notifications"
          >

            <Bell size={20} />

          </button>


          <div className="topbar-divider" />


          <button className="profile-button">

            <div className="profile-avatar">

              <Activity size={15} />

            </div>

            <span className="profile-name">
              Alex Morgan
            </span>

            <Users size={17} />

          </button>

        </div>

      </header>


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="shelters-sidebar">


        <div className="sidebar-brand">

          <div className="sidebar-logo">

            <Route size={19} />

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


        <nav className="sidebar-navigation">


          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            <Activity size={19} />

            Dashboard

          </button>


          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/map")
            }
          >

            <Map size={19} />

            Live Map

          </button>


          <button
            className="sidebar-link sidebar-sos"
            onClick={() =>
              navigate("/sos")
            }
          >

            <Siren size={19} />

            Send SOS

          </button>


          <button
            className="sidebar-link sidebar-active"
            onClick={() =>
              navigate("/shelters")
            }
          >

            <Home size={19} />

            Shelters

          </button>


          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/alerts")
            }
          >

            <Bell size={19} />

            Alerts

          </button>


          <button
            className="sidebar-link"
            onClick={() =>
              navigate("/settings")
            }
          >

            <Settings size={19} />

            Settings

          </button>

        </nav>


        <div className="system-status">

          <div className="system-status-left">

            <span className="status-pulse" />

            <span>
              System Status
            </span>

          </div>

          <CheckCircle size={17} />

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="shelters-main">


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="shelters-header">

          <h2>
            Emergency Shelters
          </h2>

          <p>
            Find safe shelters with available
            capacity in your area. Real-time
            updates based on local reporting
            and sensor data.
          </p>

        </section>


        <div className="shelters-layout">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <section className="shelters-list-column">


            {/* Search + Filters */}

            <div className="shelter-filter-bar">


              <div className="shelter-search">

                <Search size={17} />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search by name, region, or ID..."
                />

              </div>


              <div className="filter-divider" />


              <div className="shelter-filters">


                <button
                  className={
                    activeFilter === "all"
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  onClick={() =>
                    setActiveFilter("all")
                  }
                >
                  All
                </button>


                <button
                  className={
                    activeFilter === "available"
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  onClick={() =>
                    setActiveFilter(
                      "available"
                    )
                  }
                >

                  <span className="filter-dot available-dot" />

                  Available

                </button>


                <button
                  className={
                    activeFilter === "limited"
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  onClick={() =>
                    setActiveFilter(
                      "limited"
                    )
                  }
                >

                  <span className="filter-dot limited-dot" />

                  Limited

                </button>


                <button
                  className={
                    activeFilter === "full"
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  onClick={() =>
                    setActiveFilter("full")
                  }
                >

                  <span className="filter-dot full-dot" />

                  Full

                </button>

              </div>

            </div>


            {/* Shelter Cards */}

            <div className="shelter-cards">


              {filteredShelters.length === 0 ? (

                <div className="empty-shelters">

                  <Home size={32} />

                  <h3>
                    No shelters found
                  </h3>

                  <p>
                    Try changing your search
                    or availability filter.
                  </p>

                </div>

              ) : (

                filteredShelters.map(
                  (shelter) => (

                    <ShelterCard
                      key={shelter.id}
                      shelter={shelter}
                      onDirections={
                        handleDirections
                      }
                      onCall={
                        handleCall
                      }
                      getResourceIcon={
                        getResourceIcon
                      }
                      getStatusClass={
                        getStatusClass
                      }
                      getStatusLabel={
                        getStatusLabel
                      }
                    />

                  )
                )

              )}

            </div>

          </section>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside className="shelters-right-column">


            {/* Nearby Map */}

            <div className="nearby-map-card">


              <div className="map-card-header">

                <h3>

                  <Map size={19} />

                  Nearby Shelters Map

                </h3>


                <button
                  className="fullscreen-button"
                  aria-label="Fullscreen map"
                >

                  <Fullscreen size={18} />

                </button>

              </div>


              <div className="nearby-map">


                {/* Grid */}

                <div className="nearby-map-grid" />


                {/* Roads */}

                <div className="map-road road-one" />

                <div className="map-road road-two" />

                <div className="map-road road-three" />


                {/* Shelter marker */}

                <div className="nearby-marker north-marker">

                  <div className="marker-label">
                    North Comm. Ctr
                  </div>

                  <div className="marker-dot cyan" />

                </div>


                {/* Second shelter */}

                <div className="nearby-marker east-marker">

                  <div className="marker-dot yellow" />

                </div>


                {/* User location */}

                <div className="user-location-marker">

                  <div className="user-location-ring">

                    <div className="user-location-dot" />

                  </div>

                </div>


                {/* Map controls */}

                <div className="map-location-label">

                  <MapPin size={13} />

                  Current Location

                </div>

              </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="sector-statistics">


              <h3>

                <Gauge size={19} />

                Sector Statistics

              </h3>


              <div className="statistics-grid">


                <div className="stat-card">

                  <span>
                    Active Shelters
                  </span>

                  <div className="stat-value-row">

                    <strong>
                      5
                    </strong>

                    <ShieldCheck
                      size={18}
                    />

                  </div>

                </div>


                <div className="stat-card">

                  <span>
                    Total Capacity
                  </span>

                  <div className="stat-value-row">

                    <strong>
                      590
                    </strong>

                    <Users size={18} />

                  </div>

                </div>

              </div>


              <div className="occupancy-stat">

                <div className="occupancy-header">

                  <span>
                    Current Sector Occupancy
                  </span>

                  <strong>
                    {totalOccupied} / {totalCapacity}
                  </strong>

                </div>


                <div className="occupancy-progress">

                  <div
                    className="occupancy-progress-value"
                    style={{
                      width: `${occupancyPercentage}%`,
                    }}
                  />

                </div>


                <p>
                  {occupancyPercentage}% System Load
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   SHELTER CARD
   ========================================================= */

interface ShelterCardProps {

  shelter: Shelter;

  onDirections: (
    shelter: Shelter
  ) => void;

  onCall: (
    shelter: Shelter
  ) => void;

  getResourceIcon: (
    icon: string
  ) => React.ReactNode;

  getStatusClass: (
    status: ShelterStatus
  ) => string;

  getStatusLabel: (
    status: ShelterStatus
  ) => string;
}


function ShelterCard({
  shelter,
  onDirections,
  onCall,
  getResourceIcon,
  getStatusClass,
  getStatusLabel,
}: ShelterCardProps) {


  const occupancy =
    Math.round(
      (shelter.occupied /
        shelter.capacity) *
        100
    );


  return (

    <article
      className={`shelter-card ${getStatusClass(
        shelter.status
      )}`}
    >


      <div className="shelter-status-bar" />


      <div className="shelter-card-content">


        {/* Card Header */}

        <div className="shelter-card-header">

          <div>

            <div className="shelter-name-row">

              <h3>
                {shelter.name}
              </h3>


              <span
                className={`shelter-status-badge ${getStatusClass(
                  shelter.status
                )}`}
              >

                <span />

                {getStatusLabel(
                  shelter.status
                )}

              </span>

            </div>


            <p className="shelter-address">

              <MapPin size={15} />

              {shelter.address}

            </p>

          </div>


          <div className="shelter-distance">

            <span>
              Distance
            </span>

            <strong>
              {shelter.distance}
            </strong>

          </div>

        </div>


        {/* Occupancy */}

        <div className="shelter-occupancy">

          <div className="occupancy-header">

            <span>
              Current Occupancy
            </span>

            <strong>

              <span
                className={getStatusClass(
                  shelter.status
                )}
              >
                {shelter.occupied}
              </span>

              {" / "}

              {shelter.capacity}

            </strong>

          </div>


          <div className="shelter-progress">

            <div
              className="shelter-progress-value"
              style={{
                width: `${occupancy}%`,
              }}
            />

          </div>

        </div>


        {/* Resources */}

        <div className="resources-row">

          <span className="resources-label">
            Resources:
          </span>


          {shelter.resources.map(
            (resource) => (

              <div
                key={resource.name}
                className={`resource-chip ${
                  resource.available
                    ? ""
                    : "resource-unavailable"
                }`}
              >

                {getResourceIcon(
                  resource.icon
                )}

                {resource.name}

              </div>

            )
          )}

        </div>

      </div>


      {/* Actions */}

      <div className="shelter-actions">


        <button
          className="directions-button"
          onClick={() =>
            onDirections(shelter)
          }
        >

          <Navigation size={18} />

          Get Directions

        </button>


        <button
          className="contact-button"
          onClick={() =>
            onCall(shelter)
          }
        >

          <Phone size={17} />

          Contact

        </button>

      </div>

    </article>

  );
}