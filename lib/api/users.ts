/**
 * Users API: profile, update profile, avatar, delete account.
 * All methods require Authorization: Bearer <accessToken>.
 */

import { apiGet, apiPut, apiDelete } from "./client";
import type {
  User,
  GetProfileResponse,
  UpdateProfileBody,
  UpdateProfileResponse,
  UpdateAvatarResponse,
} from "./types";

const BASE = "/users/user";

export interface AuthConfig {
  accessToken: string;
}

/**
 * Get current user profile.
 */
export async function getProfile(
  config: AuthConfig
): Promise<GetProfileResponse> {
  return apiGet<GetProfileResponse>(BASE, {
    accessToken: config.accessToken,
  });
}

/**
 * Update profile (full_name, phone).
 */
export async function updateProfile(
  body: UpdateProfileBody,
  config: AuthConfig
): Promise<UpdateProfileResponse> {
  return apiPut<UpdateProfileResponse>(BASE, body, {
    accessToken: config.accessToken,
  });
}

/**
 * Upload profile avatar. Body: FormData with field "image" (File).
 */
export async function updateAvatar(
  formData: FormData,
  config: AuthConfig
): Promise<UpdateAvatarResponse> {
  return apiPut<UpdateAvatarResponse>(`${BASE}/avatar`, formData, {
    accessToken: config.accessToken,
  });
}

/**
 * Remove profile picture.
 */
export async function deleteAvatar(config: AuthConfig): Promise<void> {
  await apiDelete<unknown>(`${BASE}/avatar`, {
    accessToken: config.accessToken,
  });
}

/**
 * Delete current user account.
 */
export async function deleteUser(config: AuthConfig): Promise<void> {
  await apiDelete<unknown>(BASE, {
    accessToken: config.accessToken,
  });
}

// Re-export type for convenience
export type { User };
