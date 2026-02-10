import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyOverview from "@/components/product/PropertyOverview";
import PropertySpecifications from "@/components/product/PropertySpecifications";
import PropertyMap from "@/components/product/PropertyMap";
import ReviewsSection from "@/components/product/ReviewsSection";
import SimilarProperties from "@/components/product/SimilarProperties";
import { PROPERTIES } from "@/lib/mock-data/properties";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description ?? undefined,
    openGraph: {
      title: property.title,
      description: property.description ?? undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const property = PROPERTIES.find((p) => p.id === id);

    if (!property) {
        notFound();
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex justify-center">
            <main className="w-full px-4 sm:px-6 lg:px-8 pb-16">
                <PropertyOverview property={property} />
                <PropertySpecifications property={property} />
                <PropertyMap property={property} />
                <ReviewsSection />
                <SimilarProperties title="Similar Properties" currentPropertyId={id} />
                <SimilarProperties title="You Might Like" currentPropertyId={id} />
            </main>
        </div>
    );
}
