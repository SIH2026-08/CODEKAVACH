export type MapFilter =
  | "all"
  | "shelters"
  | "danger"
  | "floods"
  | "fires"
  | "responders";

export interface MapFilterOption {
  id: MapFilter;
  label: string;
}

export const mapFilters: MapFilterOption[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "shelters",
    label: "Shelters",
  },
  {
    id: "danger",
    label: "Danger Zones",
  },
  {
    id: "floods",
    label: "Floods",
  },
  {
    id: "fires",
    label: "Fires",
  },
  {
    id: "responders",
    label: "Responders",
  },
];

export const mapLegend = [
  {
    id: "high-risk",
    label: "High Risk Zone",
    type: "high-risk",
  },
  {
    id: "medium-risk",
    label: "Medium Risk",
    type: "medium-risk",
  },
  {
    id: "safe-zone",
    label: "Safe Zone",
    type: "safe-zone",
  },
  {
    id: "safe-route",
    label: "Safe Route",
    type: "safe-route",
  },
];

export const routeData = {
  status: "Active",
  dangerZonesAvoided: 3,
  distance: "12.4 km",
  estimatedTime: "18 min",
  safetyLevel: "High",
};