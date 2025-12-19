export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    id: 'bento',
    title: 'Bento de Chihiro',
    description: 'Le bento réconfortant du début du film, parfait pour reprendre des forces.',
    image: '/images/bento.jpg',
    ingredients: [
      'Riz japonais',
      'Saumon',
      'Œuf',
      'Concombre',
      'Algues nori'
    ],
    steps: [
      'Cuire le riz japonais.',
      'Cuire le saumon à feu doux.',
      'Préparer l’œuf en omelette.',
      'Couper le concombre en tranches.',
      'Assembler le tout dans une boîte à bento et ajouter les algues nori.'
    ]
  },
  {
    id: 'soupe-esprits',
    title: 'Soupe des esprits',
    description: 'Soupe chaude servie dans la maison de bain pour réchauffer les esprits.',
    image: '/images/soupe.jpg',
    ingredients: [
      'Bouillon dashi',
      'Tofu',
      'Champignons',
      'Nouilles',
      'Ciboulette'
    ],
    steps: [
      'Faire chauffer le bouillon dashi.',
      'Ajouter le tofu et les champignons.',
      'Cuire les nouilles séparément et les ajouter à la soupe.',
      'Décorer avec de la ciboulette avant de servir.'
    ]
  },
  {
    id: 'boulettes-yubaba',
    title: 'Boulettes de riz de Yubaba',
    description: 'Petites boulettes de riz magiques servies à la maison de bain.',
    image: '/images/boulettes-riz.jpg',
    ingredients: [
      'Riz japonais',
      'Sésame',
      'Algues nori',
      'Saumon'
    ],
    steps: [
      'Cuire le riz japonais et laisser refroidir légèrement.',
      'Former des petites boulettes avec le riz.',
      'Ajouter un peu de saumon à l’intérieur si désiré.',
      'Enrober les boulettes avec des graines de sésame et des morceaux d’algues nori.'
    ]
  },
  {
    id: 'omelette-chihiro',
    title: 'Omelette magique de Chihiro',
    description: 'Omelette colorée pour reprendre des forces après un long voyage.',
    image: '/images/omelette-chihiro.jpg',
    ingredients: [
      '3 œufs',
      '2 cuillères à soupe de lait',
      'Carottes en dés',
      'Petits pois',
      'Sel et poivre'
    ],
    steps: [
      'Battre les œufs avec le lait, le sel et le poivre.',
      'Faire revenir légèrement les carottes et petits pois.',
      'Verser le mélange d’œufs dans la poêle et cuire doucement.',
      'Plier l’omelette et servir chaude.'
    ]
  },
  {
    id: 'the-esprits',
    title: 'Thé des esprits',
    description: 'Infusion douce pour apaiser les esprits fatigués.',
    image: '/images/the-esprits.jpg',
    ingredients: [
      'Camomille',
      'Menthe',
      'Miel',
      'Citron'
    ],
    steps: [
      'Faire infuser la camomille et la menthe dans de l’eau chaude pendant 5 minutes.',
      'Ajouter du miel et un filet de citron selon le goût.',
      'Servir chaud.'
    ]
  },
  {
    id: 'gateaux-bain',
    title: 'Gâteaux de bain de Yubaba',
    description: 'Petits gâteaux sucrés servis dans la maison de bain.',
    image: '/images/gateaux-bain.jpg',
    ingredients: [
      '200g de farine',
      '100g de sucre',
      '100g de beurre',
      '2 œufs',
      'Pâte de haricot rouge'
    ],
    steps: [
      'Préchauffer le four à 180°C.',
      'Mélanger le beurre et le sucre, puis ajouter les œufs.',
      'Incorporer la farine et former une pâte.',
      'Façonner de petits gâteaux et ajouter un peu de pâte de haricot rouge au centre.',
      'Cuire 15-20 minutes jusqu’à ce que les gâteaux soient dorés.'
    ]
  },
  {
    id: 'brochettes-kamaji',
    title: 'Brochettes de légumes de Kamaji',
    description: 'Légumes grillés servis par le maître des chaudières.',
    image: '/images/brochettes-kamaji.jpg',
    ingredients: [
      'Courgettes',
      'Poivrons',
      'Champignons',
      'Sauce soja',
      'Huile d’olive'
    ],
    steps: [
      'Couper les légumes en morceaux égaux.',
      'Enfiler les légumes sur des brochettes.',
      'Badigeonner d’huile d’olive et de sauce soja.',
      'Griller ou cuire au four jusqu’à ce qu’ils soient tendres.'
    ]
  },
  {
    id: 'soupe-noface',
    title: 'Soupe de poisson de No-Face',
    description: 'Soupe riche et mystérieuse, inspirée de l’appétit de No-Face.',
    image: '/images/soupe-noface.jpg',
    ingredients: [
      'Bouillon de poisson',
      'Tofu',
      'Algues',
      'Carottes',
      'Sel et poivre'
    ],
    steps: [
      'Faire chauffer le bouillon de poisson.',
      'Ajouter le tofu, les algues et les carottes.',
      'Laisser mijoter 5-10 minutes.',
      'Assaisonner avec sel et poivre et servir chaud.'
    ]
  }
];