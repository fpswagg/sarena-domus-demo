import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prototype",
};

/**
 * Proto layout — hides the root layout Navbar & Footer so prototype
 * pages can own the entire viewport.
 */
export default function ProtoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body > nav { display: none !important; }
            body > footer { display: none !important; }
            body > main {
              padding-top: 0 !important;
              min-height: 100vh !important;
              background: white !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
