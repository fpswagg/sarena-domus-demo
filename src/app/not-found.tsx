import Link from 'next/link';
import Button from '@/components/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page non trouvée</h2>
        <p className={styles.description}>
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Button href="/logements" variant="outline" size="lg">
            Voir les logements
          </Button>
        </div>
      </div>
    </div>
  );
}
