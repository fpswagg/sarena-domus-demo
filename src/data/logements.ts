export interface Logement {
  id: string;
  title: string;
  description: string;
  city: string;
  quartier: string;
  price: number;
  type: 'meublé' | 'appartement' | 'maison' | 'résidence' | 'hôtel';
  contact: string;
  images?: string[];
}

export const logements: Logement[] = [
  {
    id: '1',
    title: 'Appartement moderne à Douala',
    description: 'Magnifique appartement de 3 chambres, entièrement meublé, situé dans un quartier calme et sécurisé. Proche des commerces et des transports. Idéal pour une famille ou professionnel.',
    city: 'Douala',
    quartier: 'Bonanjo',
    price: 150000,
    type: 'appartement',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '2',
    title: 'Villa meublée avec jardin',
    description: 'Superbe villa de 4 chambres avec jardin, salon spacieux, cuisine équipée. Quartier résidentiel haut de gamme. Parking disponible. Sécurité 24/7.',
    city: 'Yaoundé',
    quartier: 'Bastos',
    price: 300000,
    type: 'maison',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '3',
    title: 'Studio meublé centre-ville',
    description: 'Studio moderne et fonctionnel, parfait pour étudiant ou jeune professionnel. Proche universités et centre-ville. Climatisation, internet inclus.',
    city: 'Douala',
    quartier: 'Akwa',
    price: 80000,
    type: 'meublé',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '4',
    title: 'Résidence hôtelière de luxe',
    description: 'Résidence haut de gamme avec services hôteliers. Chambres spacieuses, restaurant, piscine, salle de sport. Parfait pour séjour professionnel ou vacances.',
    city: 'Yaoundé',
    quartier: 'Etoa-Meki',
    price: 250000,
    type: 'résidence',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '5',
    title: 'Appartement 2 chambres meublé',
    description: 'Appartement lumineux de 2 chambres, entièrement meublé et équipé. Balcon avec vue. Quartier animé, proche restaurants et bars.',
    city: 'Douala',
    quartier: 'Makepe',
    price: 120000,
    type: 'appartement',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '6',
    title: 'Maison familiale avec terrasse',
    description: 'Belle maison de 5 chambres avec grande terrasse, idéale pour famille nombreuse. Quartier calme, écoles à proximité. Jardin entretenu.',
    city: 'Yaoundé',
    quartier: 'Efoulan',
    price: 280000,
    type: 'maison',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '7',
    title: 'Hôtel boutique centre-ville',
    description: 'Hôtel boutique moderne avec chambres élégantes. Service de qualité, petit-déjeuner inclus. Emplacement stratégique pour visites touristiques.',
    city: 'Douala',
    quartier: 'Bonanjo',
    price: 180000,
    type: 'hôtel',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '8',
    title: 'Studio cosy proche plage',
    description: 'Charmant studio à quelques minutes de la plage. Décor moderne, équipements complets. Parfait pour vacances ou séjour court terme.',
    city: 'Douala',
    quartier: 'Wouri',
    price: 95000,
    type: 'meublé',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '9',
    title: 'Appartement standing avec piscine',
    description: 'Appartement de standing dans résidence avec piscine commune, salle de sport, gardiennage. 3 chambres, vue panoramique. Prestige et confort.',
    city: 'Yaoundé',
    quartier: 'Nlongkak',
    price: 220000,
    type: 'appartement',
    contact: '+237 6XX XXX XXX',
  },
  {
    id: '10',
    title: 'Villa moderne avec piscine privée',
    description: 'Villa exceptionnelle de 6 chambres avec piscine privée, jardin paysager, garage double. Prestige absolu. Quartier VIP sécurisé.',
    city: 'Douala',
    quartier: 'Bonapriso',
    price: 450000,
    type: 'maison',
    contact: '+237 6XX XXX XXX',
  },
];
