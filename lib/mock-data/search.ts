/**
 * Mock search/list methods that simulate the API listProperties endpoint.
 * Use the same query shape as the API so you can swap to real API later.
 */

import type {
  PropertiesQuery,
  PropertyType,
  ListingType,
  PropertyStatus,
  PropertiesSortBy,
  SortOrder,
  PropertyWithImages,
} from "@/lib/api";
import { PROPERTIES } from "./properties";

export type MockSearchQuery = PropertiesQuery & {
  /** Text search in title, city, neighborhood, description */
  q?: string;
};

/** Mock list response: data includes images (from PROPERTIES). API list returns Property[]; use this for mock-only UI. */
export interface MockListPropertiesResponse {
  success: true;
  data: PropertyWithImages[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

/**
 * Filters and sorts mock PROPERTIES using a query aligned with the API.
 * Use this on the search page with mock data; later replace with listProperties() from @/lib/api.
 */
export function mockListProperties(
  query: MockSearchQuery = {}
): MockListPropertiesResponse {
  const {
    property_type,
    listing_type,
    status,
    city,
    region,
    min_price,
    max_price,
    bedrooms,
    min_bedrooms,
    max_bedrooms,
    page = 1,
    limit = 20,
    sort_by = "created_at",
    sort_order = "desc",
    q,
  } = query;

  let list = [...PROPERTIES];

  // Text search (mock: title, city, neighborhood, description)
  if (q?.trim()) {
    const term = q.trim().toLowerCase();
    list = list.filter((p) => {
      const title = (p.title ?? "").toLowerCase();
      const cityStr = (p.city ?? "").toLowerCase();
      const neighborhood = (p.neighborhood ?? "").toLowerCase();
      const description = (p.description ?? "").toLowerCase();
      return (
        title.includes(term) ||
        cityStr.includes(term) ||
        neighborhood.includes(term) ||
        description.includes(term)
      );
    });
  }

  if (property_type) {
    list = list.filter((p) => p.property_type === property_type);
  }
  if (listing_type) {
    list = list.filter((p) => p.listing_type === listing_type);
  }
  if (status) {
    list = list.filter((p) => p.status === status);
  }
  if (city?.trim()) {
    const c = city.trim().toLowerCase();
    list = list.filter((p) => (p.city ?? "").toLowerCase() === c || (p.city ?? "").toLowerCase().includes(c));
  }
  if (region?.trim()) {
    const r = region.trim().toLowerCase();
    list = list.filter((p) => (p.region ?? "").toLowerCase().includes(r));
  }
  if (min_price != null) {
    list = list.filter((p) => p.price >= min_price);
  }
  if (max_price != null) {
    list = list.filter((p) => p.price <= max_price);
  }
  if (bedrooms != null) {
    list = list.filter((p) => p.bedrooms === bedrooms);
  }
  if (min_bedrooms != null) {
    list = list.filter((p) => (p.bedrooms ?? 0) >= min_bedrooms);
  }
  if (max_bedrooms != null) {
    list = list.filter((p) => (p.bedrooms ?? 0) <= max_bedrooms);
  }

  // Sort
  const order = sort_order === "asc" ? 1 : -1;
  list.sort((a, b) => {
    let aVal: number | string | null;
    let bVal: number | string | null;
    switch (sort_by) {
      case "price":
        aVal = a.price;
        bVal = b.price;
        return ((aVal as number) - (bVal as number)) * order;
      case "bedrooms":
        aVal = a.bedrooms ?? 0;
        bVal = b.bedrooms ?? 0;
        return ((aVal as number) - (bVal as number)) * order;
      case "area_sqm":
        aVal = a.area_sqm ?? 0;
        bVal = b.area_sqm ?? 0;
        return ((aVal as number) - (bVal as number)) * order;
      case "created_at":
      default:
        aVal = a.created_at ?? "";
        bVal = b.created_at ?? "";
        return String(aVal).localeCompare(String(bVal)) * order;
    }
  });

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageIndex = Math.max(1, Math.min(page, totalPages));
  const start = (pageIndex - 1) * limit;
  const data = list.slice(start, start + limit);

  return {
    success: true,
    data,
    pagination: {
      page: pageIndex,
      limit,
      total,
      totalPages,
    },
  };
}

/**
 * Async wrapper for mock list (same shape as real API).
 * Use this in hooks so the same code path works when you switch to the API.
 */
export async function fetchListProperties(
  query: MockSearchQuery = {}
): Promise<MockListPropertiesResponse> {
  return Promise.resolve(mockListProperties(query));
}

/**
 * Parse URL search params into API-style query + text q.
 * Aligns with API query params so the same keys can be used when you switch to the API.
 */
export function searchParamsToQuery(
  params: URLSearchParams
): MockSearchQuery {
  const q = params.get("q") ?? undefined;
  const listing_type = params.get("listing_type") as ListingType | null;
  const property_type = params.get("property_type") as PropertyType | null;
  const status = params.get("status") as PropertyStatus | null;
  const city = params.get("city") ?? undefined;
  const region = params.get("region") ?? undefined;
  const min_price = params.get("min_price");
  const max_price = params.get("max_price");
  const bedrooms = params.get("bedrooms");
  const min_bedrooms = params.get("min_bedrooms");
  const max_bedrooms = params.get("max_bedrooms");
  const page = params.get("page");
  const limit = params.get("limit");
  const sort_by = params.get("sort_by") as PropertiesSortBy | null;
  const sort_order = params.get("sort_order") as SortOrder | null;

  const query: MockSearchQuery = {};
  if (q) query.q = q;
  if (listing_type === "sale" || listing_type === "rent") query.listing_type = listing_type;
  if (property_type) query.property_type = property_type;
  if (status) query.status = status;
  if (city) query.city = city;
  if (region) query.region = region;
  if (min_price != null && min_price !== "") query.min_price = Number(min_price);
  if (max_price != null && max_price !== "") query.max_price = Number(max_price);
  if (bedrooms != null && bedrooms !== "") query.bedrooms = Number(bedrooms);
  if (min_bedrooms != null && min_bedrooms !== "") query.min_bedrooms = Number(min_bedrooms);
  if (max_bedrooms != null && max_bedrooms !== "") query.max_bedrooms = Number(max_bedrooms);
  if (page != null && page !== "") query.page = Math.max(1, Number(page));
  if (limit != null && limit !== "") query.limit = Math.min(100, Math.max(1, Number(limit)));
  if (sort_by) query.sort_by = sort_by;
  if (sort_order === "asc" || sort_order === "desc") query.sort_order = sort_order;
  return query;
}

/**
 * Build URL search params from an API-style query (for updating the URL).
 */
export function queryToSearchParams(query: MockSearchQuery): URLSearchParams {
  const p = new URLSearchParams();
  if (query.q?.trim()) p.set("q", query.q.trim());
  if (query.listing_type) p.set("listing_type", query.listing_type);
  if (query.property_type) p.set("property_type", query.property_type);
  if (query.status) p.set("status", query.status);
  if (query.city?.trim()) p.set("city", query.city.trim());
  if (query.region?.trim()) p.set("region", query.region.trim());
  if (query.min_price != null) p.set("min_price", String(query.min_price));
  if (query.max_price != null) p.set("max_price", String(query.max_price));
  if (query.bedrooms != null) p.set("bedrooms", String(query.bedrooms));
  if (query.min_bedrooms != null) p.set("min_bedrooms", String(query.min_bedrooms));
  if (query.max_bedrooms != null) p.set("max_bedrooms", String(query.max_bedrooms));
  if (query.page != null && query.page > 1) p.set("page", String(query.page));
  if (query.limit != null && query.limit !== 20) p.set("limit", String(query.limit));
  if (query.sort_by) p.set("sort_by", query.sort_by);
  if (query.sort_order) p.set("sort_order", query.sort_order);
  return p;
}
