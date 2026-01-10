import React from 'react';
import Link from 'next/link';
import { Logement } from '@/data/logements';
import styles from './HousingCard.module.css';

interface HousingCardProps {
  logement: Logement;
}

export default function HousingCard({ logement }: HousingCardProps) {
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
    <Link href={`/logements/${logement.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.imageIcon}>🏠</span>
        </div>
        <div className={styles.typeBadge}>{getTypeLabel(logement.type)}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{logement.title}</h3>
        <p className={styles.location}>
          📍 {logement.quartier}, {logement.city}
        </p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatPrice(logement.price)}</span>
          <span className={styles.pricePeriod}>/mois</span>
        </div>
      </div>
    </Link>
  );
}
