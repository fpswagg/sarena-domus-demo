/**
 * Auth API: register, login, refresh-token.
 */

import { apiPost } from "./client";
import type {
  RegisterBody,
  RegisterResponse,
  RegisterType,
  LoginBody,
  LoginResponse,
  RefreshBody,
  RefreshResponse,
} from "./types";

const BASE = "/auth";

/**
 * Register a new user.
 * @param body - email, password, full_name
 * @param type - "user" (default) or "agent"
 */
export async function register(
  body: RegisterBody,
  type: RegisterType = "user"
): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>(`${BASE}/register`, body, {
    params: { type },
  });
}

/**
 * Sign in with email and password. Returns session with access_token and refresh_token.
 */
export async function login(body: LoginBody): Promise<LoginResponse> {
  return apiPost<LoginResponse>(`${BASE}/login`, body);
}

/**
 * Exchange refresh token for new access and refresh tokens.
 */
export async function refreshToken(body: RefreshBody): Promise<RefreshResponse> {
  return apiPost<RefreshResponse>(`${BASE}/refresh-token`, body);
}
