/**
 * Typed API errors for Sarena Domus API.
 * Aligned with docs error responses: 400 validation, 401, 403, 404, etc.
 */

import type {
  ValidationErrorResponse,
  MessageErrorResponse,
  SuccessFalseMessageResponse,
} from "./types";

/** Base API error with status and optional parsed body */
export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;

  constructor(
    message: string,
    status: number,
    statusText: string,
    body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromResponse(status: number, statusText: string, body: unknown): ApiError {
    const parsed = parseErrorBody(body);
    if (status === 400 && parsed.type === "validation") {
      return new ValidationError(
        parsed.message,
        status,
        statusText,
        parsed.errors
      );
    }
    if (status === 401) {
      return new UnauthorizedError(parsed.message, status, statusText, body);
    }
    if (status === 403) {
      return new ForbiddenError(parsed.message, status, statusText, body);
    }
    if (status === 404) {
      return new NotFoundError(parsed.message, status, statusText, body);
    }
    return new ApiError(parsed.message, status, statusText, body);
  }
}

/** 400 — validation errors with field-level messages */
export class ValidationError extends ApiError {
  readonly errors: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    statusText: string,
    errors: Record<string, string[]>,
    body?: unknown
  ) {
    super(message, status, statusText, body);
    this.name = "ValidationError";
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  /** First error message for a field, or first overall */
  getFirstError(field?: string): string | undefined {
    if (field && this.errors[field]?.length) return this.errors[field][0];
    const firstKey = Object.keys(this.errors)[0];
    return firstKey ? this.errors[firstKey]?.[0] : undefined;
  }
}

/** 401 — missing or invalid token */
export class UnauthorizedError extends ApiError {
  constructor(
    message: string = "Unauthorized",
    status: number = 401,
    statusText: string = "Unauthorized",
    body?: unknown
  ) {
    super(message, status, statusText, body);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/** 403 — authenticated but not allowed */
export class ForbiddenError extends ApiError {
  constructor(
    message: string = "Forbidden",
    status: number = 403,
    statusText: string = "Forbidden",
    body?: unknown
  ) {
    super(message, status, statusText, body);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/** 404 — resource not found */
export class NotFoundError extends ApiError {
  constructor(
    message: string = "Not found",
    status: number = 404,
    statusText: string = "Not Found",
    body?: unknown
  ) {
    super(message, status, statusText, body);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

type ParsedError =
  | { type: "validation"; message: string; errors: Record<string, string[]> }
  | { type: "message"; message: string };

function parseErrorBody(body: unknown): ParsedError {
  if (body == null || typeof body !== "object") {
    return { type: "message", message: "Request failed" };
  }

  const obj = body as Record<string, unknown>;

  // Validation: { success: false, errors: Record<string, string[]> }
  if (
    obj.success === false &&
    obj.errors != null &&
    typeof obj.errors === "object" &&
    !Array.isArray(obj.errors)
  ) {
    const errors: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(obj.errors)) {
      errors[k] = Array.isArray(v) ? (v as string[]) : [String(v)];
    }
    const message =
      typeof (obj as unknown as ValidationErrorResponse & { message?: string }).message === "string"
        ? (obj as unknown as ValidationErrorResponse & { message: string }).message
        : "Validation failed";
    return { type: "validation", message: String(message), errors };
  }

  // { success: false, message: string }
  if (obj.success === false && typeof obj.message === "string") {
    return { type: "message", message: (obj as unknown as SuccessFalseMessageResponse).message };
  }

  // { message: string }
  if (typeof obj.message === "string") {
    return { type: "message", message: (obj as unknown as MessageErrorResponse).message };
  }

  return { type: "message", message: "Request failed" };
}
