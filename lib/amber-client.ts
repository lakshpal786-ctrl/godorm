import { Property, SearchFilters } from "@/lib/types";

const MOCK_PROPERTIES: Property[] = [
  {
    id: "gdm-1",
    name: "Coral Court Residences",
    city: "London",
    university: "King's College London",
    pricePerWeek: 280,
    distanceKm: 1.2,
    roomType: "studio",
    socialScore: 72,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
    description: "Modern studios with fast Wi-Fi, gym, and weekly social mixers.",
    amenities: ["Gym", "Study rooms", "Cinema"],
    lat: 51.5074,
    lng: -0.1278,
    availability: "available"
  },
  {
    id: "gdm-2",
    name: "Union Yard Student Living",
    city: "Manchester",
    university: "University of Manchester",
    pricePerWeek: 220,
    distanceKm: 2.1,
    roomType: "ensuite",
    socialScore: 88,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
    description: "Community-first halls close to nightlife and student clubs.",
    amenities: ["Games room", "Bike storage", "Laundry"],
    lat: 53.4808,
    lng: -2.2426,
    availability: "limited"
  },
  {
    id: "gdm-3",
    name: "North Park Rooms",
    city: "Birmingham",
    university: "University of Birmingham",
    pricePerWeek: 180,
    distanceKm: 0.9,
    roomType: "shared",
    socialScore: 64,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
    description: "Budget-friendly shared apartments with managed support.",
    amenities: ["All bills included", "24/7 support", "Common lounge"],
    lat: 52.4862,
    lng: -1.8904,
    availability: "available"
  }
];

export async function searchAmberProperties(filters: SearchFilters): Promise<Property[]> {
  void process.env.AMBER_API_KEY;
  void process.env.AMBER_API_BASE_URL;

  return MOCK_PROPERTIES.filter((property) => {
    if (filters.city && !property.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (
      filters.university &&
      !property.university.toLowerCase().includes(filters.university.toLowerCase())
    ) {
      return false;
    }
    if (filters.maxPrice && property.pricePerWeek > filters.maxPrice) return false;
    if (filters.maxDistanceKm && property.distanceKm > filters.maxDistanceKm) return false;
    if (filters.roomType && property.roomType !== filters.roomType) return false;
    return property.availability !== "sold_out";
  });
}

export async function getAmberPropertyById(id: string): Promise<Property | null> {
  return MOCK_PROPERTIES.find((property) => property.id === id) ?? null;
}

export async function submitAmberApplication(input: {
  propertyId: string;
  fullName: string;
  email: string;
  phone: string;
  moveInDate: string;
}) {
  return {
    providerReference: `APP-${input.propertyId}-${Date.now()}`,
    status: "submitted" as const
  };
}
