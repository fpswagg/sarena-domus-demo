/**
 * Mock properties matching API types from docs/api-docs.html.
 * Uses PropertyWithImages from @/lib/api for list and get-by-id usage.
 */

import type {
  PropertyWithImages,
  PropertyType,
  PropertyImage,
} from "@/lib/api";

const NOW = "2025-02-03T12:00:00.000Z";
const OWNER_ID = "mock-owner-1";

function mockProperty(opts: {
  id: number;
  title: string;
  neighborhood: string;
  city: string;
  region?: string | null;
  country?: string;
  price: number;
  area_sqm: number;
  property_type: PropertyType;
  listing_type: "sale" | "rent";
  bedrooms?: number | null;
  bathrooms?: number | null;
  description?: string | null;
  imageUrls: string[];
  status?: "active" | "draft" | "pending" | "sold" | "rented" | "expired";
}): PropertyWithImages {
  const id = String(opts.id);
  const created_at = NOW;
  const images: PropertyImage[] = opts.imageUrls.map((image_url, i) => ({
    id: `img-${id}-${i}`,
    property_id: id,
    image_url,
    created_at,
  }));
  const main_image_url = opts.imageUrls[0] ?? null;
  return {
    id,
    owner_id: OWNER_ID,
    title: opts.title,
    description: opts.description ?? null,
    property_type: opts.property_type,
    listing_type: opts.listing_type,
    status: opts.status ?? "active",
    price: opts.price,
    currency: "XAF",
    price_negotiable: false,
    country: opts.country ?? "Cameroon",
    region: opts.region ?? null,
    city: opts.city,
    neighborhood: opts.neighborhood,
    address: null,
    latitude: null,
    longitude: null,
    bedrooms: opts.bedrooms ?? null,
    bathrooms: opts.bathrooms ?? null,
    area_sqm: opts.area_sqm,
    land_area_sqm: null,
    year_built: null,
    features: null,
    main_image_url,
    created_at,
    updated_at: NOW,
    published_at: NOW,
    expires_at: null,
    images,
  };
}

export type { PropertyWithImages, PropertyImage };
export type { Property } from "@/lib/api";

export const PROPERTIES: PropertyWithImages[] = [
  mockProperty({
    id: 1,
    title: "Luxury Penthouse with City Views",
    neighborhood: "Downtown",
    city: "Yaoundé",
    price: 125000,
    area_sqm: 297,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 2,
    title: "Modern 3-Bedroom Apartment",
    neighborhood: "Bastos",
    city: "Yaoundé",
    price: 45000,
    area_sqm: 172,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 3,
    title: "Cozy Studio Apartment",
    neighborhood: "Etoa-Meki",
    city: "Yaoundé",
    price: 18000,
    area_sqm: 42,
    property_type: "studio",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 4,
    title: "Spacious Family Villa",
    neighborhood: "Nlongkak",
    city: "Yaoundé",
    price: 95000,
    area_sqm: 390,
    property_type: "villa",
    listing_type: "sale",
    bedrooms: 5,
    bathrooms: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 5,
    title: "Contemporary Loft Apartment",
    neighborhood: "Bonanjo",
    city: "Douala",
    price: 55000,
    area_sqm: 153,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 6,
    title: "2-Bedroom Condo with Balcony",
    neighborhood: "Akwa",
    city: "Douala",
    price: 38000,
    area_sqm: 111,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 7,
    title: "Elegant 4-Bedroom House",
    neighborhood: "Essos",
    city: "Yaoundé",
    price: 78000,
    area_sqm: 325,
    property_type: "house",
    listing_type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 8,
    title: "Compact 1-Bedroom Flat",
    neighborhood: "Mvog-Ada",
    city: "Yaoundé",
    price: 22000,
    area_sqm: 60,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 9,
    title: "Luxury Duplex Apartment",
    neighborhood: "Bonapriso",
    city: "Douala",
    price: 68000,
    area_sqm: 223,
    property_type: "duplex",
    listing_type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 10,
    title: "Affordable Studio Unit",
    neighborhood: "Mendong",
    city: "Yaoundé",
    price: 15000,
    area_sqm: 35,
    property_type: "studio",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 11,
    title: "Premium 5-Bedroom Mansion",
    neighborhood: "Biyem-Assi",
    city: "Yaoundé",
    price: 145000,
    area_sqm: 538,
    property_type: "villa",
    listing_type: "sale",
    bedrooms: 5,
    bathrooms: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 12,
    title: "Modern 2-Bedroom Apartment",
    neighborhood: "Makepe",
    city: "Douala",
    price: 32000,
    area_sqm: 102,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 13,
    title: "Charming 3-Bedroom Bungalow",
    neighborhood: "Elig-Edzoa",
    city: "Yaoundé",
    price: 52000,
    area_sqm: 204,
    property_type: "house",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 14,
    title: "Executive Studio Apartment",
    neighborhood: "Wouri",
    city: "Douala",
    price: 28000,
    area_sqm: 51,
    property_type: "studio",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 15,
    title: "Spacious 4-Bedroom Villa",
    neighborhood: "Odza",
    city: "Yaoundé",
    price: 88000,
    area_sqm: 381,
    property_type: "villa",
    listing_type: "sale",
    bedrooms: 4,
    bathrooms: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 16,
    title: "Budget-Friendly 1-Bedroom",
    neighborhood: "Nsam",
    city: "Yaoundé",
    price: 19000,
    area_sqm: 54,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 17,
    title: "Luxury 3-Bedroom Condo",
    neighborhood: "Deido",
    city: "Douala",
    price: 62000,
    area_sqm: 195,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 18,
    title: "Cozy 2-Bedroom House",
    neighborhood: "Ekounou",
    city: "Yaoundé",
    price: 41000,
    area_sqm: 135,
    property_type: "house",
    listing_type: "sale",
    bedrooms: 2,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 19,
    title: "Modern Studio Loft",
    neighborhood: "Logpom",
    city: "Douala",
    price: 25000,
    area_sqm: 63,
    property_type: "studio",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 20,
    title: "Premium 6-Bedroom Estate",
    neighborhood: "Mvog-Betsi",
    city: "Yaoundé",
    price: 165000,
    area_sqm: 669,
    property_type: "villa",
    listing_type: "sale",
    bedrooms: 6,
    bathrooms: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 21,
    title: "Affordable 2-Bedroom Flat",
    neighborhood: "Kotto",
    city: "Douala",
    price: 29000,
    area_sqm: 91,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 2,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 22,
    title: "Elegant 3-Bedroom Apartment",
    neighborhood: "Mvog-Mbi",
    city: "Yaoundé",
    price: 48000,
    area_sqm: 163,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 23,
    title: "Compact Studio Unit",
    neighborhood: "Pk8",
    city: "Douala",
    price: 17000,
    area_sqm: 39,
    property_type: "studio",
    listing_type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 24,
    title: "Luxury 4-Bedroom Penthouse",
    neighborhood: "Bali",
    city: "Douala",
    price: 110000,
    area_sqm: 353,
    property_type: "apartment",
    listing_type: "sale",
    bedrooms: 4,
    bathrooms: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
  mockProperty({
    id: 25,
    title: "Family-Friendly 3-Bedroom House",
    neighborhood: "Emana",
    city: "Yaoundé",
    price: 56000,
    area_sqm: 214,
    property_type: "house",
    listing_type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    imageUrls: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
  }),
];

/** Format location from API property for display */
export function formatPropertyLocation(p: {
  neighborhood: string | null;
  city: string;
  region: string | null;
  country: string;
}): string {
  return [p.neighborhood, p.city, p.region, p.country].filter(Boolean).join(", ");
}

/** Format price number for display */
export function formatPropertyPrice(price: number): string {
  return price.toLocaleString();
}

/** Image URLs from PropertyWithImages (main + images) for galleries */
export function getPropertyImageUrls(p: PropertyWithImages): string[] {
  if (p.images?.length) return p.images.map((i) => i.image_url);
  return p.main_image_url ? [p.main_image_url] : [];
}
