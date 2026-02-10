"use client";

import { useState, useEffect, useRef } from "react";
import { fetchListProperties } from "@/lib/mock-data/search";
import type { MockSearchQuery, MockListPropertiesResponse } from "@/lib/mock-data/search";

/**
 * Async search results for the search page. Fetches when query changes.
 *
 * To use the real API instead of mock data:
 * 1. Replace the import: use fetchSearchResultsFromApi from "@/lib/search-adapter"
 * 2. Replace fetchListProperties with fetchSearchResultsFromApi in the useEffect below
 * The query shape is the same; the API does not support "q" (text search) yet—filter client-side or add backend support.
 */
async function loadSearchResults(
  query: MockSearchQuery
): Promise<MockListPropertiesResponse> {
  return fetchListProperties(query);
  // When ready for API: return fetchSearchResultsFromApi(query);
}

export interface UseSearchResultsResult {
  result: MockListPropertiesResponse | null;
  isLoading: boolean;
  error: Error | null;
}

export function useSearchResults(query: MockSearchQuery): UseSearchResultsResult {
  const [result, setResult] = useState<MockListPropertiesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const lastQueryRef = useRef<string>("");

  useEffect(() => {
    const key = JSON.stringify(query);
    if (key === lastQueryRef.current && result != null) return;
    lastQueryRef.current = key;

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setIsLoading(true);
      setError(null);
    });

    loadSearchResults(query)
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setResult(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { result, isLoading, error };
}
