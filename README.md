# Sarena Domus

Plateforme de mise en relation pour hébergements au Cameroun - Version MVP

## 🎯 Description

Sarena Domus est une plateforme de mise en relation qui permet de découvrir et de contacter directement les propriétaires d'hébergements au Cameroun. Cette version MVP fonctionne avec des données statiques, sans backend ni API.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules**
- **Données statiques** (fichiers TypeScript)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Démarrer le serveur de production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout principal avec Header et Footer
│   ├── page.tsx            # Page d'accueil
│   ├── page.module.css
│   └── logements/
│       ├── page.tsx        # Liste des logements
│       ├── page.module.css
│       └── [id]/
│           ├── page.tsx    # Détail d'un logement
│           ├── page.module.css
│           └── ContactButton.tsx
├── components/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Footer.tsx
│   ├── Footer.module.css
│   ├── HousingCard.tsx
│   ├── HousingCard.module.css
│   ├── Button.tsx
│   └── Button.module.css
├── data/
│   └── logements.ts        # Données statiques des logements
└── styles/
    └── globals.css         # Styles globaux
```

## 🎨 Design

- **Couleur primaire** : Jaune (#FFD700)
- **Couleurs secondaires** : Orange, Bleu
- **Style** : Moderne, simple, professionnel et dynamique
- **Responsive** : Adapté mobile, tablette et desktop

## 📄 Pages

1. **Page d'accueil** (`/`)
   - Hero section
   - Présentation du concept
   - Types d'hébergements
   - Avantages de la plateforme

2. **Liste des logements** (`/logements`)
   - Grille de cartes d'hébergements
   - Affichage des informations principales

3. **Détail d'un logement** (`/logements/[id]`)
   - Informations complètes
   - Bouton de contact WhatsApp
   - Lien d'appel direct

## 🔧 Évolutions futures

Cette version MVP est conçue pour être facilement évolutive vers :
- Intégration d'une API backend
- Système d'authentification
- Gestion des paiements
- Système de réservation
- Upload d'images
- Recherche et filtres avancés

## 📝 Note légale

La plateforme agit uniquement comme intermédiaire et décline toute responsabilité liée aux logements.

## 📄 Licence

Propriétaire - Tous droits réservés
