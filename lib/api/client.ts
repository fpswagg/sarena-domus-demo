/**
 * API client base: base URL from NEXT_PUBLIC_API_URL and fetch wrapper with error handling.
 */

import { ApiError } from "./errors";

const ENV_KEY = "NEXT_PUBLIC_API_URL";

/**
 * Returns the API base URL (no trailing slash).
 * @throws Error if NEXT_PUBLIC_API_URL is not set
 */
export function getApiBaseUrl(): string {
  const url = process.env[ENV_KEY];
  if (!url || typeof url !== "string" || url.trim() === "") {
    throw new Error(
      `Missing or invalid ${ENV_KEY}. Set it in .env to your API base URL (e.g. https://api.example.com).`
    );
  }
  return url.replace(/\/+$/, "");
}

/**
 * Builds full URL for an path (path should start with /).
 */
export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export interface RequestConfig {
  /** Auth token for Bearer header */
  accessToken?: string | null;
  /** Query params (object or URLSearchParams) */
  params?: Record<string, string | number | boolean | undefined> | URLSearchParams;
  /** Request init (method, headers, body, etc.). Headers are merged; Authorization and Content-Type can be overridden. */
  init?: RequestInit;
}

function buildUrl(path: string, params?: RequestConfig["params"]): string {
  const url = apiUrl(path);
  if (!params) return url;
  const search =
    params instanceof URLSearchParams
      ? params
      : new URLSearchParams();
  if (!(params instanceof URLSearchParams)) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") search.set(k, String(v));
    }
  }
  const qs = search.toString();
  return qs ? `${url}?${qs}` : url;
}

function buildHeaders(
  accessToken?: string | null,
  contentType?: string | null,
  custom?: HeadersInit
): Headers {
  const headers = new Headers(custom);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (contentType !== undefined && contentType !== null)
    headers.set("Content-Type", contentType);
  return headers;
}

/**
 * Performs a fetch and returns JSON. Throws ApiError (or subclass) on non-2xx.
 * For non-JSON responses (e.g. health text), use raw fetch or a dedicated method.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestConfig & {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string | FormData;
    contentType?: string | null;
  } = {}
): Promise<T> {
  const {
    accessToken,
    params,
    method = "GET",
    body,
    contentType = "application/json",
    init = {},
  } = options;

  const url = buildUrl(path, params);
  const headers = buildHeaders(
    accessToken,
    body instanceof FormData ? null : contentType,
    init.headers
  );

  const res = await fetch(url, {
    ...init,
    method,
    headers,
    body:
      body !== undefined
        ? body instanceof FormData
          ? body
          : body
        : undefined,
  });

  if (!res.ok) {
    let parsed: unknown;
    const text = await res.text();
    try {
      parsed = text ? JSON.parse(text) : undefined;
    } catch {
      parsed = { message: text || res.statusText || "Request failed" };
    }
    throw ApiError.fromResponse(res.status, res.statusText, parsed);
  }

  const responseText = await res.text();
  if (!responseText.trim()) return undefined as T;
  try {
    return JSON.parse(responseText) as T;
  } catch {
    throw new ApiError(
      "Invalid JSON response",
      res.status,
      res.statusText,
      responseText
    );
  }
}

/**
 * GET request helper.
 */
export async function apiGet<T>(
  path: string,
  config?: RequestConfig
): Promise<T> {
  return apiRequest<T>(path, { ...config, method: "GET" });
}

/**
 * POST request helper. Body is JSON-serialized unless it's FormData.
 */
export async function apiPost<T>(
  path: string,
  body?: object | FormData,
  config?: RequestConfig
): Promise<T> {
  const payload =
    body instanceof FormData ? body : body ? JSON.stringify(body) : undefined;
  return apiRequest<T>(path, {
    ...config,
    method: "POST",
    body: payload,
  });
}

/**
 * PUT request helper.
 */
export async function apiPut<T>(
  path: string,
  body?: object | FormData,
  config?: RequestConfig
): Promise<T> {
  const payload =
    body instanceof FormData ? body : body ? JSON.stringify(body) : undefined;
  return apiRequest<T>(path, {
    ...config,
    method: "PUT",
    body: payload,
  });
}

/**
 * PATCH request helper.
 */
export async function apiPatch<T>(
  path: string,
  body?: object,
  config?: RequestConfig
): Promise<T> {
  return apiRequest<T>(path, {
    ...config,
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request helper.
 */
export async function apiDelete<T>(
  path: string,
  config?: RequestConfig
): Promise<T> {
  return apiRequest<T>(path, { ...config, method: "DELETE" });
}
