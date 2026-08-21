export type AlertType = "critical" | "warning" | "info";

export interface DisasterAlert {
  id: string;
  type: AlertType;
  icon: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  actionLabel?: string;
  read: boolean;
}

export const alerts: DisasterAlert[] = [
  {
    id: "ALT-001",
    type: "critical",
    icon: "warning",
    time: "2 min ago",
    title: "Earthquake Alert: 7.2 Magnitude Detected",
    description:
      "A major earthquake has been detected in New Delhi. Seek immediate shelter and stay away from windows.",
    location: "New Delhi,India",
    actionLabel: "View on Map",
    read: false,
  },

  {
    id: "ALT-002",
    type: "critical",
    icon: "tsunami",
    time: "15 min ago",
    title: "Tsunami Warning Issued",
    description:
      "Coastal areas are under tsunami warning. Evacuate to higher ground immediately. Follow designated evacuation routes.",
    actionLabel: "View Evac Routes",
    read: false,
  },

  {
    id: "ALT-003",
    type: "warning",
    icon: "storm",
    time: "1 hour ago",
    title: "Heavy Rainfall Warning",
    description:
      "Severe rainfall expected in your area for the next 6 hours. Risk of flash flooding. Avoid low-lying areas.",
    read: false,
  },

  {
    id: "ALT-004",
    type: "info",
    icon: "traffic",
    time: "3 hours ago",
    title: "Road Closure: Highway 101",
    description:
      "Highway 101 is closed due to flooding. Use alternate routes. Expected reopening in 4–6 hours.",
    read: true,
  },
];

export const alertSummary = {
  critical: 2,
  warning: 3,
  info: 3,
};

export const activityTimeline = [
  {
    id: "ACT-001",
    title: "3 new critical alerts",
    time: "Last hour",
    type: "critical",
  },
  {
    id: "ACT-002",
    title: "12 alerts resolved",
    time: "Today",
    type: "normal",
  },
  {
    id: "ACT-003",
    title: "45 total notifications",
    time: "This week",
    type: "normal",
  },
];