import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Trouvez votre hébergement idéal au Cameroun
          </h1>
          <p className={styles.heroSubtitle}>
            Découvrez une sélection d&apos;appartements, maisons, résidences et hôtels 
            pour votre séjour. Simple, rapide et fiable.
          </p>
          <div className={styles.heroActions}>
            <Button href="/logements" variant="primary" size="lg">
              Voir les hébergements
            </Button>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
          <p className={styles.sectionText}>
            Sarena Domus est une plateforme de mise en relation qui vous permet 
            de découvrir et de contacter directement les propriétaires d&apos;hébergements 
            au Cameroun. Nous facilitons la recherche et la mise en contact, 
            pour que vous trouviez rapidement le logement qui correspond à vos besoins.
          </p>
        </div>
      </section>

      {/* Types d'hébergements */}
      <section className={`${styles.section} ${styles.typesSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Types d&apos;hébergements</h2>
          <p className={styles.sectionSubtitle}>
            Explorez notre sélection variée d&apos;hébergements adaptés à tous les besoins
          </p>
          <div className={styles.typesGrid}>
            <div className={styles.typeCard}>
              <div className={styles.typeIcon}>🏠</div>
              <h3 className={styles.typeTitle}>Logements meublés</h3>
              <p className={styles.typeDescription}>
                Appartements et studios entièrement équipés, prêts à habiter
              </p>
            </div>
            <div className={styles.typeCard}>
              <div className={styles.typeIcon}>🏢</div>
              <h3 className={styles.typeTitle}>Appartements</h3>
              <p className={styles.typeDescription}>
                Appartements modernes dans les meilleurs quartiers
              </p>
            </div>
            <div className={styles.typeCard}>
              <div className={styles.typeIcon}>🏡</div>
              <h3 className={styles.typeTitle}>Maisons</h3>
              <p className={styles.typeDescription}>
                Villas et maisons familiales avec jardin et espaces extérieurs
              </p>
            </div>
            <div className={styles.typeCard}>
              <div className={styles.typeIcon}>🏨</div>
              <h3 className={styles.typeTitle}>Résidences & Hôtels</h3>
              <p className={styles.typeDescription}>
                Résidences hôtelières et hôtels avec services de qualité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi utiliser la plateforme */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Pourquoi utiliser Sarena Domus ?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔍</div>
              <h3 className={styles.featureTitle}>Recherche simplifiée</h3>
              <p className={styles.featureDescription}>
                Trouvez rapidement l&apos;hébergement qui correspond à vos critères
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📍</div>
              <h3 className={styles.featureTitle}>Localisation précise</h3>
              <p className={styles.featureDescription}>
                Informations détaillées sur les quartiers et les emplacements
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💬</div>
              <h3 className={styles.featureTitle}>Contact direct</h3>
              <p className={styles.featureDescription}>
                Contactez directement les propriétaires pour discuter de vos besoins
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>✅</div>
              <h3 className={styles.featureTitle}>Sélection vérifiée</h3>
              <p className={styles.featureDescription}>
                Une sélection d&apos;hébergements de qualité dans les principales villes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à trouver votre hébergement ?</h2>
            <p className={styles.ctaSubtitle}>
              Explorez notre catalogue et contactez les propriétaires dès aujourd&apos;hui
            </p>
            <Button href="/logements" variant="primary" size="lg">
              Découvrir les logements
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
