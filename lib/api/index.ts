/**
 * Sarena Domus API — types, client, errors, and method modules.
 * Base URL from NEXT_PUBLIC_API_URL.
 *
 * @example
 * import { getProperty, listProperties, ApiError, NotFoundError } from "@/lib/api";
 *
 * try {
 *   const res = await getProperty("prop-id");
 *   console.log(res.data);
 * } catch (e) {
 *   if (e instanceof NotFoundError) console.log("Not found");
 *   if (e instanceof ApiError) console.log(e.status, e.message);
 * }
 */

// Client & config
export {
  getApiBaseUrl,
  apiUrl,
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
} from "./client";
export type { RequestConfig } from "./client";

// Errors
export {
  ApiError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from "./errors";

// Health
export { healthCheck } from "./health";

// Auth
export { register, login, refreshToken } from "./auth";

// Users
export {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar,
  deleteUser,
} from "./users";
export type { AuthConfig as UsersAuthConfig } from "./users";

// Properties
export {
  listProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
  deletePropertyImage,
  publishProperty,
  unpublishProperty,
} from "./properties";
export type { AuthConfig as PropertiesAuthConfig } from "./properties";

// Types (re-export for consumers)
export type {
  RegisterType,
  RegisterBody,
  RegisterResponse,
  LoginBody,
  LoginResponse,
  RefreshBody,
  RefreshResponse,
  User,
  GetProfileResponse,
  UpdateProfileBody,
  UpdateProfileResponse,
  UpdateAvatarResponse,
  PropertyType,
  ListingType,
  PropertyStatus,
  PropertiesSortBy,
  SortOrder,
  PropertiesQuery,
  Property,
  PropertyImage,
  PropertyWithImages,
  ListPropertiesResponse,
  GetPropertyResponse,
  CreatePropertyBody,
  UpdatePropertyBody,
  CreatePropertyResponse,
  SinglePropertyResponse,
  PropertyImagesResponse,
  ValidationErrorResponse,
  MessageErrorResponse,
  SuccessFalseMessageResponse,
} from "./types";
