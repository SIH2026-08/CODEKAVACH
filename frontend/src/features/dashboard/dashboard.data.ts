export const dashboardStats = [
  {
    title: "Active Alerts",
    value: "12",
    icon: "warning",
    status: "CRITICAL",
    variant: "critical",
  },
  {
    title: "Safe Routes",
    value: "8",
    icon: "route",
    variant: "active",
  },
  {
    title: "Open Shelters",
    value: "24",
    icon: "shelter",
    variant: "normal",
  },
  {
    title: "Response Time",
    value: "4.2",
    unit: "m",
    icon: "timer",
    variant: "warning",
  },
];

export const alerts = [
  {
    id: 1,
    title: "Earthquake",
    location: "Delhi NCR",
    distance: "2.3km away",
    severity: "CRITICAL",
    magnitude: "7.2 MAG",
    icon: "earthquake",
    variant: "critical",
  },
  {
    id: 2,
    title: "Flood Warning",
    location: "Patna",
    distance: "",
    severity: "HIGH",
    icon: "flood",
    variant: "high",
  },
  {
    id: 3,
    title: "Wildfire",
    location: "Uttarakhand",
    distance: "",
    severity: "MEDIUM",
    icon: "fire",
    variant: "medium",
  },
];

export const shelters = [
  {
    id: 1,
    name: "Noida Community Shelter",
    distance: "1.2km away",
    occupancy: 45,
    capacity: 80,
    status: "AVAILABLE",
    variant: "available",
  },
  {
    id: 2,
    name: "Jaypee Greens Sports Complex",
    distance: "3.5km away",
    occupancy: 120,
    capacity: 150,
    status: "LIMITED",
    variant: "limited",
  },
];

export const environmentalData = [
  {
    label: "WIND SPEED",
    value: "45",
    unit: "km/h",
    status: "HIGH",
    icon: "wind",
    variant: "warning",
  },
  {
    label: "RAINFALL",
    value: "78",
    unit: "mm/h",
    status: "CRITICAL",
    icon: "rain",
    variant: "critical",
  },
  {
    label: "TEMP",
    value: "32",
    unit: "°C",
    status: "NORMAL",
    icon: "temperature",
    variant: "normal",
  },
  {
    label: "HAZARD IDX",
    value: "8.4",
    unit: "/10",
    status: "HIGH RISK",
    icon: "hazard",
    variant: "warning",
  },
];

export const recentActivity = [
  {
    id: 1,
    time: "JUST NOW",
    message:
      "New CRITICAL alert: Earthquake detected in Delhi NCR region.",
    variant: "critical",
  },
  {
    id: 2,
    time: "12 MINS AGO",
    message:
      "Safe evacuation route updated for Greater Noida.",
  },
  {
    id: 3,
    time: "45 MINS AGO",
    message:
      "Sports Complex shelter occupancy reaching capacity (80%).",
    variant: "warning",
  },
];