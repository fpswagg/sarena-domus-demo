import { logements } from '@/data/logements';
import HousingCard from '@/components/HousingCard';
import styles from './page.module.css';

export default function LogementsPage() {
  return (
    <div className={styles.logementsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Nos hébergements</h1>
          <p className={styles.subtitle}>
            Découvrez notre sélection d'hébergements disponibles au Cameroun
          </p>
        </div>
        
        <div className={styles.grid}>
          {logements.map((logement) => (
            <HousingCard key={logement.id} logement={logement} />
          ))}
        </div>
        
        {logements.length === 0 && (
          <div className={styles.empty}>
            <p>Aucun hébergement disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
