export type ShelterStatus = "available" | "limited" | "full";

export interface ShelterResource {
  name: string;
  icon:
    | "medical"
    | "food"
    | "water"
    | "cots";
  available: boolean;
}

export interface Shelter {
  id: string;
  name: string;
  status: ShelterStatus;
  address: string;
  distance: string;
  occupied: number;
  capacity: number;
  resources: ShelterResource[];
  phone: string;
  latitude: number;
  longitude: number;
}

export const shelters: Shelter[] = [
  {
    id: "SHELTER-001",
    name: "Community Center North",
    status: "available",
    address: "1042 Sector B, Northern District",
    distance: "1.2 km",
    occupied: 45,
    capacity: 80,
    resources: [
      {
        name: "Medical",
        icon: "medical",
        available: true,
      },
      {
        name: "Food",
        icon: "food",
        available: true,
      },
      {
        name: "Water",
        icon: "water",
        available: true,
      },
    ],
    phone: "+91 98765 43210",
    latitude: 28.6139,
    longitude: 77.209,
  },

  {
    id: "SHELTER-002",
    name: "Sports Complex East",
    status: "limited",
    address: "88 Stadium Rd, Eastern Ward",
    distance: "3.5 km",
    occupied: 120,
    capacity: 150,
    resources: [
      {
        name: "Medical",
        icon: "medical",
        available: false,
      },
      {
        name: "Food",
        icon: "food",
        available: true,
      },
      {
        name: "Water",
        icon: "water",
        available: true,
      },
      {
        name: "Cots",
        icon: "cots",
        available: true,
      },
    ],
    phone: "+91 98765 43211",
    latitude: 28.621,
    longitude: 77.218,
  },
];