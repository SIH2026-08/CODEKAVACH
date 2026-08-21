import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Accessibility,
  Activity,
  Bell,
  CircleCheck,
  Flame,
  HeartPulse,
  Info,
  LocateFixed,
  MapPin,
  Menu,
  MoreHorizontal,
  Phone,
  Search,
  Send,
  Siren,
  Waves,
} from "lucide-react";

import {
  emergencyContacts,
  emergencyTypes,
  waitingTips,
  type EmergencyType,
} from "../../features/sos/sos.data";

import "../../styles/sos.css";

const emergencyIconMap = {
  waves: Waves,
  activity: Activity,
  flame: Flame,
  "heart-pulse": HeartPulse,
  accessibility: Accessibility,
  "more-horizontal": MoreHorizontal,
};

type EmergencyIconName = keyof typeof emergencyIconMap;

function EmergencyIcon({
  name,
  size = 28,
}: {
  name: EmergencyIconName;
  size?: number;
}) {
  const Icon = emergencyIconMap[name];

  return <Icon size={size} strokeWidth={1.8} />;
}

export default function SendSOS() {
  const navigate = useNavigate();

  const [selectedEmergency, setSelectedEmergency] =
    useState<EmergencyType>("earthquake");

  const [description, setDescription] = useState("");

  const [locationStatus, setLocationStatus] =
    useState("VERIFIED");

  const [isSending, setIsSending] =
    useState(false);

  const [sosSent, setSosSent] =
    useState(false);


  /* =====================================================
     GET CURRENT LOCATION
     ===================================================== */

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("UNAVAILABLE");
      return;
    }

    setLocationStatus("LOCATING...");

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus("VERIFIED");
      },
      () => {
        setLocationStatus("LOCATION ERROR");
      }
    );
  };


  /* =====================================================
     SEND SOS
     ===================================================== */

  const handleSendSOS = async () => {
    if (isSending || sosSent) {
      return;
    }

    setIsSending(true);

    /*
     * TODO:
     * Connect this function to your backend API.
     *
     * Example:
     *
     * await fetch("/api/sos", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     emergencyType: selectedEmergency,
     *     description,
     *     location: {
     *       latitude: 37.7749,
     *       longitude: -122.4194,
     *     },
     *   }),
     * });
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setIsSending(false);
    setSosSent(true);
  };


  /* =====================================================
     CALL CONTACT
     ===================================================== */

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };


  return (
    <div className="sos-page">


      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="sos-topbar">

        <div className="sos-mobile-brand">

          <button
            className="sos-menu-button"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <span>
            ResQRoute
          </span>

        </div>


        <div className="sos-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search resources..."
          />

        </div>


        <div className="sos-topbar-actions">

          <button
            className="sos-topbar-icon"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="sos-notification-dot" />
          </button>

          <button
            className="sos-topbar-icon"
            aria-label="Profile"
          >
            <CircleCheck size={21} />
          </button>

        </div>

      </header>


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sos-sidebar">

        <div className="sos-sidebar-brand">

          <div className="sos-logo">
            <Siren size={19} />
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


        <nav className="sos-navigation">

          <button
            className="sos-nav-link"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <Activity size={19} />

            <span>
              Dashboard
            </span>
          </button>


          <button
            className="sos-nav-link"
            onClick={() =>
              navigate("/map")
            }
          >
            <MapPin size={19} />

            <span>
              Live Map
            </span>
          </button>


          <button
            className="sos-nav-link sos-nav-active"
            onClick={() =>
              navigate("/sos")
            }
          >
            <Siren size={19} />

            <span>
              Send SOS
            </span>
          </button>


          <button
            className="sos-nav-link"
            onClick={() =>
              navigate("/shelters")
            }
          >
            <LocateFixed size={19} />

            <span>
              Shelters
            </span>
          </button>


          <button
            className="sos-nav-link"
            onClick={() =>
              navigate("/alerts")
            }
          >
            <Bell size={19} />

            <span>
              Alerts
            </span>
          </button>


          <button
            className="sos-nav-link"
            onClick={() =>
              navigate("/settings")
            }
          >
            <Activity size={19} />

            <span>
              Settings
            </span>
          </button>

        </nav>


        <div className="sos-system-status">

          <CircleCheck size={18} />

          <span>
            System Status: Active
          </span>

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="sos-main">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="sos-page-header">

          <div className="sos-warning-icon">

            <Siren size={56} />

          </div>

          <h1>
            Emergency SOS
          </h1>

          <p>
            send an immediate emergency alert to nearby rescue teams.
            Share your location and essential details for faster assistance.
          </p>

        </section>


        {/* =================================================
            CONTENT GRID
        ================================================= */}

        <section className="sos-content-grid">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="sos-left-column">


            {/* ===============================================
                LIVE LOCATION
            =============================================== */}

            <section className="sos-card location-card">

              <div className="sos-card-header">

                <h2>

                  <LocateFixed size={19} />

                  Live Location

                </h2>

                <span className="location-verified">

                  <span />

                  {locationStatus}

                </span>

              </div>


              {/* Map */}

              <div className="location-map">

                <div className="fake-map-grid">

                  <div className="map-road map-road-one" />
                  <div className="map-road map-road-two" />
                  <div className="map-road map-road-three" />

                  <div className="map-location-marker">

                    <span />

                  </div>

                </div>


                <div className="map-gradient" />

                <div className="gps-lock">

                  <LocateFixed size={14} />

                  GPS LOCK

                </div>

              </div>


              <button
                className="refresh-location"
                onClick={handleGetLocation}
              >

                <LocateFixed size={15} />

                Refresh Location

              </button>


              <div className="coordinates">

                <span>
                  COORD:
                </span>

               28.6139° N, 77.2090° E

              </div>


              <div className="location-name">

                Delhi NCR, India

              </div>


              <p className="location-accuracy">

                Accuracy: ± 4 meters

              </p>

            </section>


            {/* ===============================================
                EMERGENCY CONTACTS
            =============================================== */}

            <section className="sos-card">

              <div className="sos-card-header">

                <h2>

                  <Phone size={19} />

                  Emergency Contacts

                </h2>

              </div>


              <div className="contacts-list">

                {emergencyContacts.map(
                  (contact) => (

                    <div
                      key={contact.id}
                      className="contact-card"
                    >

                      <div>

                        <span
                          className={`contact-type ${contact.action ===
                              "dispatch"
                              ? "contact-secondary"
                              : ""
                            }`}
                        >
                          {contact.type}
                        </span>

                        <h3>
                          {contact.name}
                        </h3>

                        <p>
                          {contact.phone}
                        </p>

                      </div>


                      <button
                        className={`call-button ${contact.action ===
                            "dispatch"
                            ? "dispatch-call"
                            : ""
                          }`}
                        onClick={() =>
                          handleCall(
                            contact.phone
                          )
                        }
                        aria-label={`Call ${contact.name}`}
                      >

                        <Phone size={18} />

                      </button>

                    </div>

                  )
                )}

              </div>

            </section>

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="sos-right-column">


            <section className="sos-card situation-card">

              <h2 className="situation-title">
                Situation Details
              </h2>


              {/* =============================================
                  EMERGENCY TYPE
              ============================================= */}

              <div className="emergency-selection">

                <label>
                  SELECT EMERGENCY TYPE
                </label>


                <div className="emergency-type-grid">

                  {emergencyTypes.map(
                    (emergency) => {

                      const isSelected =
                        selectedEmergency ===
                        emergency.id;

                      return (

                        <button
                          key={emergency.id}
                          type="button"
                          className={`emergency-type-button ${isSelected
                              ? "emergency-type-selected"
                              : ""
                            }`}
                          onClick={() =>
                            setSelectedEmergency(
                              emergency.id
                            )
                          }
                        >

                          <EmergencyIcon
                            name={
                              emergency.icon as EmergencyIconName
                            }
                            size={27}
                          />

                          <span>
                            {emergency.label}
                          </span>

                        </button>

                      );
                    }
                  )}

                </div>

              </div>


              {/* =============================================
                  DESCRIPTION
              ============================================= */}

              <div className="description-section">

                <label>

                  <span>
                    ADDITIONAL DETAILS
                  </span>

                  <span>
                    Optional
                  </span>

                </label>


                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe your situation, injuries, or hazards nearby..."
                />

                <div className="character-count">
                  {description.length}/500
                </div>

              </div>


              {/* =============================================
                  WAITING TIPS
              ============================================= */}

              <div className="waiting-card">

                <Info size={28} />

                <div>

                  <h3>
                    While Waiting for Help
                  </h3>

                  <ul>

                    {waitingTips.map(
                      (tip) => (

                        <li key={tip}>
                          {tip}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>


              {/* =============================================
                  SEND SOS
              ============================================= */}

              <button
                className={`send-sos-button ${isSending
                    ? "sending"
                    : ""
                  } ${sosSent
                    ? "sos-success"
                    : ""
                  }`}
                onClick={handleSendSOS}
                disabled={isSending || sosSent}
              >

                {sosSent ? (
                  <>
                    <CircleCheck size={28} />

                    SOS SIGNAL SENT

                  </>
                ) : isSending ? (
                  <>
                    <Send
                      size={27}
                      className="send-icon-spin"
                    />

                    SENDING SOS...

                  </>
                ) : (
                  <>
                    <Send size={28} />

                    SEND SOS SIGNAL

                  </>
                )}

              </button>


              <p className="sos-disclaimer">

                By sending, your location and details
                will be transmitted to local emergency
                responders.

              </p>

            </section>

          </div>

        </section>

      </main>

    </div>
  );
}