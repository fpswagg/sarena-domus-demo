import type { Metadata } from "next";
import Hero from "@/components/hero";
import ListingGrid from "@/components/listing/ListingGrid";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <main className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <Hero />
        <ListingGrid title="Flats" />
        <ListingGrid title="Office" />
      </main>
    </div>
  );
}
