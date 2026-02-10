/**
 * API types for Sarena Domus — aligned with docs/api-docs.html
 */

// —— Auth ——
export type RegisterType = "user" | "agent";

export interface RegisterBody {
  email: string;
  password: string;
  full_name: string;
}

export interface RegisterResponse {
  success: true;
  data: { user: object; session: object };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  data: { user: object; session: object };
}

export interface RefreshBody {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// —— User ——
export interface User {
  id: string;
  full_name: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetProfileResponse {
  success: true;
  data: User;
}

export interface UpdateProfileBody {
  full_name?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  success: true;
  data: User;
}

export interface UpdateAvatarResponse {
  message: string;
  url: string;
}

// —— Properties ——
export type PropertyType =
  | "apartment"
  | "house"
  | "land"
  | "commercial"
  | "villa"
  | "duplex"
  | "studio";

export type ListingType = "sale" | "rent";

export type PropertyStatus =
  | "active"
  | "pending"
  | "sold"
  | "rented"
  | "expired"
  | "draft";

export type PropertiesSortBy =
  | "price"
  | "created_at"
  | "bedrooms"
  | "area_sqm";

export type SortOrder = "asc" | "desc";

export interface PropertiesQuery {
  property_type?: PropertyType;
  listing_type?: ListingType;
  status?: PropertyStatus;
  city?: string;
  region?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  page?: number;
  limit?: number;
  sort_by?: PropertiesSortBy;
  sort_order?: SortOrder;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  property_type: string;
  listing_type: string;
  status: string;
  price: number;
  currency: string;
  price_negotiable: boolean;
  country: string;
  region: string | null;
  city: string;
  neighborhood: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  land_area_sqm: number | null;
  year_built: number | null;
  features: string[] | null;
  main_image_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  expires_at: string | null;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  created_at: string;
}

export interface PropertyWithImages extends Property {
  images: PropertyImage[];
}

export interface ListPropertiesResponse {
  success: true;
  data: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetPropertyResponse {
  success: true;
  data: PropertyWithImages;
}

export interface CreatePropertyBody {
  title: string;
  description?: string;
  property_type: PropertyType;
  listing_type: ListingType;
  price: number;
  currency?: string;
  price_negotiable?: boolean;
  country?: string;
  region?: string;
  city: string;
  neighborhood?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  land_area_sqm?: number;
  year_built?: number;
  features?: string[];
}

export interface UpdatePropertyBody {
  title?: string;
  description?: string;
  property_type?: PropertyType;
  listing_type?: ListingType;
  price?: number;
  currency?: string;
  price_negotiable?: boolean;
  country?: string;
  region?: string;
  city?: string;
  neighborhood?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  land_area_sqm?: number;
  year_built?: number;
  features?: string[];
}

export interface CreatePropertyResponse {
  success: true;
  data: Property;
}

export interface SinglePropertyResponse {
  success: true;
  data: Property;
}

export interface PropertyImagesResponse {
  success: true;
  data: PropertyImage[];
}

// —— Error response shapes (from API) ——
export interface ValidationErrorResponse {
  success: false;
  errors: Record<string, string[]>;
}

export interface MessageErrorResponse {
  message: string;
}

export interface SuccessFalseMessageResponse {
  success: false;
  message: string;
}
