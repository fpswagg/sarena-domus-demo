/**
 * Mock "my listings" — uses API PropertyWithImages type.
 * Subset of properties for the current user's listings.
 */

import type { PropertyWithImages } from "@/lib/api";
import { PROPERTIES } from "./properties";

export const MY_LISTINGS: PropertyWithImages[] = PROPERTIES.slice(0, 6);
