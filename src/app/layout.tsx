import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sarena Domus - Trouvez votre hébergement au Cameroun',
  description: 'Plateforme de mise en relation pour trouver l\'hébergement idéal au Cameroun. Appartements, maisons, résidences et hôtels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
