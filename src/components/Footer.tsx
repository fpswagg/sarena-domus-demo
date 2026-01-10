import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.brandTitle}>Sarena Domus</h3>
            <p className={styles.brandDescription}>
              Votre plateforme de mise en relation pour trouver l'hébergement idéal au Cameroun.
            </p>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li><a href="/">Accueil</a></li>
              <li><a href="/logements">Logements</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.legal}>
          <p className={styles.legalText}>
            La plateforme agit uniquement comme intermédiaire et décline toute responsabilité liée aux logements.
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Sarena Domus. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
