import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { logements } from '@/data/logements';
import ContactButton from './ContactButton';
import styles from './page.module.css';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const logement = logements.find((l) => l.id === params.id);

  if (!logement) {
    return {
      title: 'Logement non trouvé',
    };
  }

  return {
    title: `${logement.title} - Sarena Domus`,
    description: logement.description,
  };
}

export default function LogementDetailPage({ params }: PageProps) {
  const logement = logements.find((l) => l.id === params.id);

  if (!logement) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'meublé': 'Meublé',
      'appartement': 'Appartement',
      'maison': 'Maison',
      'résidence': 'Résidence',
      'hôtel': 'Hôtel',
    };
    return labels[type] || type;
  };

  return (
    <div className={styles.detailPage}>
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.imageIcon}>🏠</span>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.contentSection}>
          <div className={styles.header}>
            <div className={styles.typeBadge}>{getTypeLabel(logement.type)}</div>
            <h1 className={styles.title}>{logement.title}</h1>
            <p className={styles.location}>
              📍 {logement.quartier}, {logement.city}
            </p>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{formatPrice(logement.price)}</span>
              <span className={styles.pricePeriod}>/mois</span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>{logement.description}</p>
          </div>

          <div className={styles.detailsSection}>
            <h2 className={styles.sectionTitle}>Détails</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type</span>
                <span className={styles.detailValue}>{getTypeLabel(logement.type)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ville</span>
                <span className={styles.detailValue}>{logement.city}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Quartier</span>
                <span className={styles.detailValue}>{logement.quartier}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Prix mensuel</span>
                <span className={styles.detailValue}>{formatPrice(logement.price)}</span>
              </div>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Contacter le propriétaire</h2>
            <p className={styles.contactInfo}>
              Numéro de contact : <strong>{logement.contact}</strong>
            </p>
            <div className={styles.contactActions}>
              <ContactButton contact={logement.contact} />
              <a
                href={`tel:${logement.contact.replace(/\s/g, '')}`}
                className={styles.phoneLink}
              >
                📞 Appeler directement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
