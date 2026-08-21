export type EmergencyType =
  | "flood"
  | "earthquake"
  | "fire"
  | "medical"
  | "trapped"
  | "other";

export interface EmergencyOption {
  id: EmergencyType;
  label: string;
  icon: string;
  color: "cyan" | "red" | "blue";
}

export const emergencyTypes: EmergencyOption[] = [
  {
    id: "flood",
    label: "Flood",
    icon: "waves",
    color: "blue",
  },
  {
    id: "earthquake",
    label: "Earthquake",
    icon: "activity",
    color: "cyan",
  },
  {
    id: "fire",
    label: "Fire",
    icon: "flame",
    color: "red",
  },
  {
    id: "medical",
    label: "Medical",
    icon: "heart-pulse",
    color: "blue",
  },
  {
    id: "trapped",
    label: "Trapped",
    icon: "accessibility",
    color: "blue",
  },
  {
    id: "other",
    label: "Other",
    icon: "more-horizontal",
    color: "blue",
  },
];

export const emergencyContacts = [
  {
    id: 1,
    type: "PRIMARY",
    name: "Family Emergency Contact",
    phone: "+91 XXXXX XXXXX",
    action: "call",
  },
  {
    id: 2,
    type: "SECONDARY",
    name: "Emergency Services",
    phone: "112",
    action: "dispatch",
  },
];

export const waitingTips = [
  "Stay calm and remain in a safe location if possible.",
  "Keep your phone accessible and ringtone volume up.",
  "Do not hang up if dispatch calls you back.",
];