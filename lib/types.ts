export type RoomType = "studio" | "ensuite" | "shared";

export interface Property {
  id: string;
  name: string;
  city: string;
  university: string;
  pricePerWeek: number;
  distanceKm: number;
  roomType: RoomType;
  socialScore: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  lat: number;
  lng: number;
  availability: "available" | "limited" | "sold_out";
}

export interface SearchFilters {
  city?: string;
  university?: string;
  maxPrice?: number;
  maxDistanceKm?: number;
  roomType?: RoomType;
  socialImportance?: number;
  budgetImportance?: number;
  distanceImportance?: number;
}

export interface RankedProperty extends Property {
  score: number;
  insights: string[];
  explanation: string;
}
