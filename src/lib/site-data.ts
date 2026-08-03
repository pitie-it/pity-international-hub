import logo from "@/assets/LOGO_PI_OK.jpg.asset.json";
import logoHorizontal from "@/assets/logo-pi-horizontal.png.asset.json";

import photoSuivi from "@/assets/IDEM_SUIVI.jpeg.asset.json";
import photoGrain from "@/assets/IMG-20200512-WA0054.jpg.asset.json";
import photoRecolte from "@/assets/IMG-20220422-WA0015.jpg.asset.json";
import photoSemis from "@/assets/IMG-20220706-WA0014.jpg.asset.json";
import photoPlantation from "@/assets/plante_pomme.jpg.asset.json";
import photoHaricot from "@/assets/recol_harico.jpg.asset.json";

export const media = {
  logo: logo.url,
  logoHorizontal: logoHorizontal.url,

  suivi: photoSuivi.url,
  grain: photoGrain.url,
  recolte: photoRecolte.url,
  semis: photoSemis.url,
  plantation: photoPlantation.url,
  haricot: photoHaricot.url,
};

export const org = {
  name: "Pitié Internationale",
  short: "PI",
  devise: "Pitié – Humanité – Entraide",
  since: 2023,
  email: "pitieinternationalrdc@gmail.com",
  phone: "+243 810 262 600",
  phoneAlt: "+243 977 535 252",
  whatsapp: "243810262600",
  address: "Goma, Nord-Kivu, République Démocratique du Congo",

  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export const navigation = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/a-propos" },
  { label: "Nos Programmes", to: "/programmes" },
  { label: "Notre Impact", to: "/impact" },
  { label: "Là où nous travaillons", to: "/ou-nous-travaillons" },
  { label: "Passez à l'action", to: "/agir" },
  { label: "Nos Partenaires", to: "/partenaires" },
  { label: "Actualités", to: "/actualites" },
  { label: "Galerie", to: "/galerie" },
  { label: "Contact", to: "/contact" },
] as const;

export const valeurs = [
  { title: "Dévouement", text: "Un engagement total au service des communautés les plus vulnérables." },
  { title: "Innovation", text: "Des solutions nouvelles, adaptées aux réalités locales et durables." },
  { title: "Inclusion", text: "Personne n'est laissé de côté : femmes, jeunes, personnes handicapées." },
  { title: "Redevabilité", text: "Rendre compte aux communautés, aux partenaires et aux bailleurs." },
  { title: "Intégrité", text: "Transparence, éthique et rigueur dans chaque action menée." },
  { title: "Respect", text: "Respect de la dignité, de la culture et des choix des personnes." },
  { title: "Créativité", text: "Imaginer des réponses agiles face à des crises complexes." },
];

export const principes = [
  { title: "Humanité", text: "Prévenir et alléger les souffrances humaines, où qu'elles se trouvent." },
  { title: "Neutralité", text: "Ne prendre part à aucune hostilité ni controverse politique ou religieuse." },
  { title: "Impartialité", text: "Agir selon les seuls besoins, sans discrimination d'aucune sorte." },
  { title: "Indépendance", text: "Une autonomie d'action vis-à-vis de tout agenda politique ou économique." },
];

export const timeline = [
  { year: "2023", title: "Naissance de Pitié Internationale", text: "Création de l'organisation à Goma, en réponse aux crises humanitaires de l'Est de la RDC." },
  { year: "2023", title: "Premiers projets SAME", text: "Distribution de semences et appui aux ménages agricoles du Nord-Kivu." },
  { year: "2024", title: "Extension au Sud-Kivu", text: "Déploiement des programmes de justice économique pour les femmes et la jeunesse." },
  { year: "2025", title: "Ouverture en Ituri", text: "Réponse humanitaire d'urgence et programmes de protection communautaire." },
  { year: "2026", title: "Vers l'échelle nationale", text: "Consolidation des partenariats et renforcement des capacités des acteurs locaux." },
];

export type Programme = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  presentation: string;
  objectifs: string[];
  activites: string[];
  resultats: string[];
  temoignage: { quote: string; author: string };
};

export const programmes: Programme[] = [
  {
    slug: "securite-alimentaire",
    title: "Sécurité alimentaire et moyens d'existence (SAME)",
    tagline: "Produire, nourrir, générer des revenus durables.",
    image: media.recolte,
    presentation:
      "Le programme SAME renforce la capacité des ménages vulnérables à produire, conserver et commercialiser leur production agricole, tout en diversifiant leurs sources de revenus.",
    objectifs: [
      "Améliorer la disponibilité et l'accès à une alimentation nutritive",
      "Augmenter les revenus agricoles des ménages accompagnés",
      "Renforcer la résilience face aux chocs climatiques et sécuritaires",
    ],
    activites: [
      "Distribution de semences améliorées et d'outils agricoles",
      "Appui aux champs-écoles paysans et à l'agroécologie",
      "Structuration de coopératives et accès aux marchés",
      "Transferts monétaires et foires aux vivres",
    ],
    resultats: [
      "Hausse mesurée des rendements de pomme de terre et de haricot",
      "Réduction des périodes de soudure dans les ménages appuyés",
      "Groupements agricoles fonctionnels et autonomes",
    ],
    temoignage: {
      quote: "Grâce aux semences et à l'accompagnement, ma récolte a doublé et mes enfants mangent trois fois par jour.",
      author: "Furaha M., agricultrice, Nord-Kivu",
    },
  },
  {
    slug: "responsabilite-sociale-gouvernance",
    title: "Responsabilité sociale et gouvernance",
    tagline: "Des services publics redevables aux citoyens.",
    image: media.suivi,
    presentation:
      "Nous accompagnons les communautés dans le suivi participatif des services publics et le dialogue constructif avec les autorités locales.",
    objectifs: [
      "Renforcer la participation citoyenne dans la gestion locale",
      "Améliorer la transparence budgétaire des entités décentralisées",
      "Créer des espaces de dialogue communauté – autorités",
    ],
    activites: [
      "Mise en place de comités de suivi citoyen",
      "Fiches d'évaluation communautaire des services",
      "Cadres de concertation et plaidoyer local",
    ],
    resultats: [
      "Engagements publics pris et suivis par les autorités locales",
      "Comités citoyens actifs dans plusieurs entités",
    ],
    temoignage: {
      quote: "Nous savons désormais poser les bonnes questions et suivre les engagements pris pour notre village.",
      author: "Jean-Baptiste K., membre d'un comité de suivi",
    },
  },
  {
    slug: "justice-economique-femmes",
    title: "Justice économique pour les femmes",
    tagline: "Autonomiser les femmes par l'entrepreneuriat.",
    image: media.haricot,
    presentation:
      "Ce programme lève les barrières économiques qui limitent les femmes et soutient leurs initiatives génératrices de revenus.",
    objectifs: [
      "Renforcer l'autonomie financière des femmes",
      "Faciliter l'accès au crédit et à l'épargne communautaire",
      "Promouvoir le leadership économique féminin",
    ],
    activites: [
      "Groupes d'épargne et de crédit (AVEC)",
      "Formations en gestion et en entrepreneuriat",
      "Kits de démarrage d'activités (couture, commerce, transformation)",
    ],
    resultats: [
      "Des centaines de femmes disposant d'une activité stable",
      "Augmentation de l'épargne des groupes accompagnés",
    ],
    temoignage: {
      quote: "Mon atelier de couture emploie aujourd'hui trois jeunes femmes de mon quartier.",
      author: "Espérance B., entrepreneure, Goma",
    },
  },
  {
    slug: "justice-economique-jeunesse",
    title: "Justice économique pour la jeunesse",
    tagline: "Des compétences et des emplois pour les jeunes.",
    image: media.grain,
    presentation:
      "Nous accompagnons les jeunes vers l'emploi décent et l'auto-emploi grâce à la formation professionnelle et à l'appui à l'entrepreneuriat.",
    objectifs: [
      "Réduire le chômage des jeunes dans les zones fragiles",
      "Développer des compétences adaptées au marché local",
      "Prévenir les recrutements par les groupes armés",
    ],
    activites: [
      "Formations professionnelles courtes et qualifiantes",
      "Incubation de micro-entreprises jeunes",
      "Mentorat et mise en relation avec les employeurs",
    ],
    resultats: [
      "Jeunes insérés dans un emploi ou une activité autonome",
      "Coopératives de jeunes créées et opérationnelles",
    ],
    temoignage: {
      quote: "La formation m'a donné un métier et une raison de rester dans ma communauté.",
      author: "Patient N., 24 ans, Sud-Kivu",
    },
  },
  {
    slug: "genre-egalite",
    title: "Genre et égalité des sexes",
    tagline: "Transformer les normes, garantir l'égalité.",
    image: media.semis,
    presentation:
      "Le programme intègre l'égalité de genre dans toutes nos interventions et lutte contre les violences basées sur le genre.",
    objectifs: [
      "Prévenir et répondre aux violences basées sur le genre",
      "Promouvoir la participation des femmes aux décisions",
      "Faire évoluer les normes sociales discriminatoires",
    ],
    activites: [
      "Dialogues communautaires et écoles des maris",
      "Prise en charge et référencement des survivantes",
      "Formation des leaders sur l'égalité de genre",
    ],
    resultats: [
      "Espaces sûrs fonctionnels pour les femmes et les filles",
      "Représentation accrue des femmes dans les structures locales",
    ],
    temoignage: {
      quote: "Aujourd'hui, ma voix compte dans les réunions du village.",
      author: "Sifa L., leader communautaire",
    },
  },
  {
    slug: "sante-communautaire",
    title: "Santé communautaire",
    tagline: "Rapprocher les soins des populations.",
    image: media.suivi,
    presentation:
      "Nous appuyons les structures de santé et les relais communautaires pour améliorer l'accès aux soins essentiels.",
    objectifs: [
      "Améliorer l'accès aux soins primaires",
      "Renforcer la nutrition des enfants et des femmes enceintes",
      "Prévenir les épidémies par la sensibilisation",
    ],
    activites: [
      "Appui en médicaments et équipements",
      "Dépistage nutritionnel communautaire",
      "Campagnes de sensibilisation et relais communautaires",
    ],
    resultats: [
      "Fréquentation accrue des structures de santé appuyées",
      "Cas de malnutrition dépistés et référencés à temps",
    ],
    temoignage: {
      quote: "Le relais communautaire a sauvé mon enfant en détectant sa malnutrition à temps.",
      author: "Neema K., mère de famille",
    },
  },
  {
    slug: "sante-environnementale",
    title: "Santé environnementale",
    tagline: "Eau, hygiène et environnement sain.",
    image: media.plantation,
    presentation:
      "Nous améliorons l'accès à l'eau potable, à l'assainissement et protégeons les écosystèmes locaux.",
    objectifs: [
      "Garantir l'accès à l'eau potable",
      "Améliorer les pratiques d'hygiène et d'assainissement",
      "Restaurer les milieux dégradés",
    ],
    activites: [
      "Aménagement de points d'eau et latrines",
      "Promotion de l'hygiène dans les écoles",
      "Reboisement et gestion des déchets",
    ],
    resultats: [
      "Ménages disposant d'un accès durable à l'eau potable",
      "Réduction des maladies d'origine hydrique",
    ],
    temoignage: {
      quote: "L'eau potable au village a changé notre quotidien et la santé de nos enfants.",
      author: "Christine A., présidente du comité d'eau",
    },
  },
  {
    slug: "developpement-communautaire",
    title: "Développement communautaire",
    tagline: "Les communautés au pilotage de leur avenir.",
    image: media.semis,
    presentation:
      "Nous appuyons les communautés à planifier, mettre en œuvre et suivre leurs propres projets de développement.",
    objectifs: [
      "Renforcer les structures communautaires de base",
      "Financer des micro-projets à fort impact",
      "Promouvoir la cohésion sociale",
    ],
    activites: [
      "Plans de développement villageois participatifs",
      "Infrastructures communautaires (écoles, marchés, pistes)",
      "Activités de cohésion sociale et de paix",
    ],
    resultats: [
      "Infrastructures communautaires réalisées et entretenues",
      "Comités de développement villageois actifs",
    ],
    temoignage: {
      quote: "C'est notre projet, décidé et suivi par nous-mêmes.",
      author: "Comité de développement, Masisi",
    },
  },
  {
    slug: "reponse-humanitaire",
    title: "Réponse humanitaire",
    tagline: "Agir vite, agir juste, sauver des vies.",
    image: media.recolte,
    presentation:
      "En cas de crise, nous déployons une assistance d'urgence multisectorielle aux déplacés et aux familles d'accueil.",
    objectifs: [
      "Répondre aux besoins vitaux immédiats",
      "Réduire la mortalité et la morbidité en situation de crise",
      "Assurer une transition vers le relèvement",
    ],
    activites: [
      "Distribution de vivres et de biens non alimentaires",
      "Assistance monétaire d'urgence",
      "Abris d'urgence pour les ménages déplacés",
    ],
    resultats: [
      "Milliers de personnes déplacées assistées",
      "Réponses déployées en moins de 72 heures",
    ],
    temoignage: {
      quote: "Quand nous avons tout perdu, l'assistance est arrivée en quelques jours.",
      author: "Famille déplacée, Nord-Kivu",
    },
  },
  {
    slug: "protection",
    title: "Protection",
    tagline: "Protéger les personnes les plus exposées.",
    image: media.suivi,
    presentation:
      "Nous prévenons les risques de protection et accompagnons les personnes affectées vers des services adaptés.",
    objectifs: [
      "Prévenir les violations des droits humains",
      "Accompagner les survivants vers les services adaptés",
      "Renforcer les mécanismes communautaires de protection",
    ],
    activites: [
      "Monitoring de protection",
      "Prise en charge psychosociale",
      "Sensibilisation aux risques et référencement",
    ],
    resultats: [
      "Réseaux communautaires de protection fonctionnels",
      "Cas identifiés référencés vers des services spécialisés",
    ],
    temoignage: {
      quote: "J'ai retrouvé de la confiance grâce à l'accompagnement psychosocial.",
      author: "Bénéficiaire, Ituri",
    },
  },
  {
    slug: "resilience",
    title: "Résilience",
    tagline: "Anticiper les chocs, préparer l'avenir.",
    image: media.plantation,
    presentation:
      "Nous renforçons la capacité des ménages et des communautés à absorber les chocs et à s'adapter durablement.",
    objectifs: [
      "Réduire la vulnérabilité aux chocs récurrents",
      "Diversifier les moyens d'existence",
      "Promouvoir l'adaptation au changement climatique",
    ],
    activites: [
      "Systèmes d'alerte précoce communautaires",
      "Agriculture climato-intelligente",
      "Fonds communautaires de gestion des risques",
    ],
    resultats: [
      "Plans communautaires de gestion des risques adoptés",
      "Ménages disposant de revenus diversifiés",
    ],
    temoignage: {
      quote: "Nous savons maintenant nous préparer avant que la crise n'arrive.",
      author: "Comité d'alerte précoce, Sud-Kivu",
    },
  },
  {
    slug: "renforcement-des-capacites",
    title: "Renforcement des capacités",
    tagline: "Des acteurs locaux forts et durables.",
    image: media.grain,
    presentation:
      "Nous formons et accompagnons les organisations locales, les autorités et les équipes terrain vers plus de qualité et de redevabilité.",
    objectifs: [
      "Professionnaliser les organisations de la société civile",
      "Améliorer la qualité des interventions humanitaires",
      "Favoriser la localisation de l'aide",
    ],
    activites: [
      "Formations techniques et en gestion de projets",
      "Coaching organisationnel et institutionnel",
      "Appui à la conformité et à la redevabilité",
    ],
    resultats: [
      "Organisations locales accompagnées vers l'autonomie",
      "Amélioration des standards de qualité des projets",
    ],
    temoignage: {
      quote: "Notre association gère désormais ses projets avec rigueur et transparence.",
      author: "Coordonnateur d'une ONG locale partenaire",
    },
  },
];

export const impactStats = [
  { value: 42, suffix: "+", label: "Projets mis en œuvre" },
  { value: 85000, suffix: "+", label: "Bénéficiaires directs" },
  { value: 120, suffix: "", label: "Communautés accompagnées" },
  { value: 3, suffix: "", label: "Provinces couvertes" },
  { value: 25, suffix: "+", label: "Partenaires" },
  { value: 300, suffix: "+", label: "Volontaires mobilisés" },
];

export const provinces = [
  {
    name: "Nord-Kivu",
    slug: "nord-kivu",
    chef: "Goma",
    text: "Cœur de nos opérations : réponse humanitaire d'urgence, sécurité alimentaire et protection des personnes déplacées.",
    programmes: ["Réponse humanitaire", "SAME", "Protection", "Genre"],
    beneficiaires: "48 000+",
    position: { top: "34%", left: "58%" },
  },
  {
    name: "Sud-Kivu",
    slug: "sud-kivu",
    chef: "Bukavu",
    text: "Justice économique pour les femmes et la jeunesse, santé communautaire et développement local participatif.",
    programmes: ["Justice économique", "Santé communautaire", "Résilience"],
    beneficiaires: "24 000+",
    position: { top: "50%", left: "60%" },
  },
  {
    name: "Ituri",
    slug: "ituri",
    chef: "Bunia",
    text: "Protection, cohésion sociale et relèvement des communautés affectées par les conflits armés.",
    programmes: ["Protection", "Réponse humanitaire", "Développement communautaire"],
    beneficiaires: "13 000+",
    position: { top: "20%", left: "62%" },
  },
];

export const partnerCategories = [
  { title: "Agences des Nations Unies", items: ["OCHA", "PAM", "UNICEF", "FAO", "UNHCR", "UNFPA"] },
  { title: "ONG Internationales", items: ["Oxfam", "CARE", "NRC", "Mercy Corps", "Save the Children"] },
  { title: "ONG Nationales", items: ["Réseaux locaux", "Plateformes provinciales", "Associations communautaires"] },
  { title: "Institutions publiques", items: ["Ministère de la Santé", "Ministère de l'Agriculture", "Entités décentralisées"] },
  { title: "Entreprises", items: ["Secteur privé local", "Opérateurs télécoms", "Institutions financières"] },
  { title: "Fondations", items: ["Fondations privées", "Philanthropes", "Fonds humanitaires"] },
];

export type Article = {
  slug: string;
  title: string;
  category: "Actualités" | "Communiqués" | "Rapports" | "Événements" | "Offres d'emploi" | "Appels d'offres" | "Volontariat";
  date: string;
  excerpt: string;
  image: string;
};

export const articles: Article[] = [
  {
    slug: "distribution-semences-masisi",
    title: "1 200 ménages appuyés en semences améliorées à Masisi",
    category: "Actualités",
    date: "12 juin 2026",
    excerpt: "Une campagne agricole décisive pour renforcer la sécurité alimentaire des familles déplacées et hôtes.",
    image: media.semis,
  },
  {
    slug: "communique-crise-nord-kivu",
    title: "Communiqué : intensification de la réponse d'urgence au Nord-Kivu",
    category: "Communiqués",
    date: "28 mai 2026",
    excerpt: "Pitié Internationale appelle à un accès humanitaire sûr et sans entrave aux populations affectées.",
    image: media.recolte,
  },
  {
    slug: "rapport-annuel-2025",
    title: "Rapport annuel 2025 : redevabilité et résultats",
    category: "Rapports",
    date: "30 avril 2026",
    excerpt: "Découvrez l'ensemble de nos réalisations, nos dépenses et nos engagements pour l'année écoulée.",
    image: media.suivi,
  },
  {
    slug: "forum-resilience-goma",
    title: "Forum sur la résilience communautaire à Goma",
    category: "Événements",
    date: "18 avril 2026",
    excerpt: "Deux jours d'échanges entre communautés, autorités et partenaires humanitaires.",
    image: media.grain,
  },
  {
    slug: "offre-chargee-programmes",
    title: "Recrutement : Chargé(e) de Programmes SAME – Goma",
    category: "Offres d'emploi",
    date: "10 avril 2026",
    excerpt: "Rejoignez nos équipes terrain pour piloter les projets de sécurité alimentaire au Nord-Kivu.",
    image: media.haricot,
  },
  {
    slug: "appel-offres-transport",
    title: "Appel d'offres : transport et logistique des intrants agricoles",
    category: "Appels d'offres",
    date: "2 avril 2026",
    excerpt: "Les entreprises intéressées sont invitées à soumettre leur dossier avant la date limite.",
    image: media.plantation,
  },
  {
    slug: "volontariat-2026",
    title: "Appel à volontaires 2026 : rejoignez le mouvement",
    category: "Volontariat",
    date: "20 mars 2026",
    excerpt: "Étudiants, professionnels ou retraités : votre temps peut changer des vies.",
    image: media.suivi,
  },
];

export const galleryItems = [
  { src: media.recolte, title: "Récolte communautaire de pommes de terre", album: "Sécurité alimentaire" },
  { src: media.semis, title: "Semis collectif avec les groupements de femmes", album: "Sécurité alimentaire" },
  { src: media.haricot, title: "Tri du haricot après récolte", album: "Moyens d'existence" },
  { src: media.plantation, title: "Préparation des champs en terrasse", album: "Résilience" },
  { src: media.grain, title: "Contrôle qualité des semences", album: "Sécurité alimentaire" },
  { src: media.suivi, title: "Suivi d'un atelier de couture financé par PI", album: "Justice économique" },
];

export const donationTiers = [
  { amount: "25 $", text: "Un kit de semences pour une famille agricole." },
  { amount: "60 $", text: "Une prise en charge nutritionnelle pour un enfant." },
  { amount: "150 $", text: "Un kit de démarrage d'activité pour une femme entrepreneure." },
  { amount: "500 $", text: "Un point d'eau réhabilité pour une communauté." },
];

export const paymentMethods = [
  "Carte bancaire",
  "PayPal",
  "Orange Money",
  "Airtel Money",
  "M-Pesa",
  "Virement bancaire",
];
