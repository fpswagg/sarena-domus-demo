/**
 * Health check — GET /health returns plain text "OK".
 */

import { apiUrl } from "./client";
import { ApiError } from "./errors";

/**
 * Calls GET /health and returns the response text (expect "OK").
 * @throws ApiError on non-2xx or network error
 */
export async function healthCheck(): Promise<string> {
  const url = apiUrl("/health");
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : undefined;
    } catch {
      body = { message: text || res.statusText };
    }
    throw ApiError.fromResponse(res.status, res.statusText, body);
  }
  return res.text();
}
