import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <p className="text-6xl sm:text-8xl font-semibold text-gray-300 select-none">
          404
        </p>
        <h1 className="mt-4 text-xl sm:text-2xl font-medium text-gray-800">
          Page not found
        </h1>
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
