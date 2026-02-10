/**
 * Properties API: list, get, create, update, delete, images, publish/unpublish.
 */

import { apiGet, apiPost, apiPatch, apiDelete } from "./client";
import type {
  Property,
  PropertyImage,
  PropertyWithImages,
  PropertiesQuery,
  ListPropertiesResponse,
  GetPropertyResponse,
  CreatePropertyBody,
  UpdatePropertyBody,
  CreatePropertyResponse,
  SinglePropertyResponse,
  PropertyImagesResponse,
} from "./types";

const BASE = "/properties";

export interface AuthConfig {
  accessToken: string;
}

/**
 * List properties with optional filters and pagination.
 * Public; only published properties by default.
 */
export async function listProperties(
  query?: PropertiesQuery
): Promise<ListPropertiesResponse> {
  const params: Record<string, string | number | boolean | undefined> = {};
  if (query) {
    if (query.property_type) params.property_type = query.property_type;
    if (query.listing_type) params.listing_type = query.listing_type;
    if (query.status) params.status = query.status;
    if (query.city) params.city = query.city;
    if (query.region) params.region = query.region;
    if (query.min_price != null) params.min_price = query.min_price;
    if (query.max_price != null) params.max_price = query.max_price;
    if (query.bedrooms != null) params.bedrooms = query.bedrooms;
    if (query.min_bedrooms != null) params.min_bedrooms = query.min_bedrooms;
    if (query.max_bedrooms != null) params.max_bedrooms = query.max_bedrooms;
    if (query.page != null) params.page = query.page;
    if (query.limit != null) params.limit = query.limit;
    if (query.sort_by) params.sort_by = query.sort_by;
    if (query.sort_order) params.sort_order = query.sort_order;
  }
  return apiGet<ListPropertiesResponse>(BASE, { params });
}

/**
 * Get a single property by ID with its images.
 * Public.
 */
export async function getProperty(id: string): Promise<GetPropertyResponse> {
  return apiGet<GetPropertyResponse>(`${BASE}/${encodeURIComponent(id)}`);
}

/**
 * Create a property (draft). Requires auth.
 */
export async function createProperty(
  body: CreatePropertyBody,
  config: AuthConfig
): Promise<CreatePropertyResponse> {
  return apiPost<CreatePropertyResponse>(BASE, body, {
    accessToken: config.accessToken,
  });
}

/**
 * Update a property. Same shape as create but all fields optional. Owner only.
 */
export async function updateProperty(
  id: string,
  body: UpdatePropertyBody,
  config: AuthConfig
): Promise<SinglePropertyResponse> {
  return apiPatch<SinglePropertyResponse>(
    `${BASE}/${encodeURIComponent(id)}`,
    body,
    { accessToken: config.accessToken }
  );
}

/**
 * Delete a property and its images. Owner only.
 */
export async function deleteProperty(
  id: string,
  config: AuthConfig
): Promise<void> {
  await apiDelete<unknown>(`${BASE}/${encodeURIComponent(id)}`, {
    accessToken: config.accessToken,
  });
}

/**
 * Upload up to 10 images. Body: FormData with field "images" (multiple files). Owner only.
 */
export async function uploadPropertyImages(
  propertyId: string,
  formData: FormData,
  config: AuthConfig
): Promise<PropertyImagesResponse> {
  return apiPost<PropertyImagesResponse>(
    `${BASE}/${encodeURIComponent(propertyId)}/images`,
    formData,
    { accessToken: config.accessToken }
  );
}

/**
 * Delete one property image. Owner only.
 */
export async function deletePropertyImage(
  propertyId: string,
  imageId: string,
  config: AuthConfig
): Promise<void> {
  await apiDelete<unknown>(
    `${BASE}/${encodeURIComponent(propertyId)}/images/${encodeURIComponent(imageId)}`,
    { accessToken: config.accessToken }
  );
}

/**
 * Publish property (status → active, published_at set). Owner only.
 */
export async function publishProperty(
  id: string,
  config: AuthConfig
): Promise<SinglePropertyResponse> {
  return apiPatch<SinglePropertyResponse>(
    `${BASE}/${encodeURIComponent(id)}/publish`,
    {},
    { accessToken: config.accessToken }
  );
}

/**
 * Unpublish property (status → draft, published_at cleared). Owner only.
 */
export async function unpublishProperty(
  id: string,
  config: AuthConfig
): Promise<SinglePropertyResponse> {
  return apiPatch<SinglePropertyResponse>(
    `${BASE}/${encodeURIComponent(id)}/unpublish`,
    {},
    { accessToken: config.accessToken }
  );
}

// Re-exports for consumers
export type {
  Property,
  PropertyImage,
  PropertyWithImages,
  PropertiesQuery,
  ListPropertiesResponse,
  GetPropertyResponse,
  CreatePropertyBody,
  UpdatePropertyBody,
};
