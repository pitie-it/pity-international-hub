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
  {
    title: "Dévouement",
    text: "Nous sommes déterminés à nous identifier par la mission de PI et à mettre le groupe cible au centre de toutes nos actions.",
  },
  {
    title: "Novateur",
    text: "Nous sommes créatifs et ouverts aux nouvelles solutions. Nous plaidons pour les meilleures solutions en faveur de notre groupe cible.",
  },
  {
    title: "Inclusif",
    text: "Nous impliquons tout le monde et à tous les niveaux, en nous basant sur le respect mutuel.",
  },
  {
    title: "Fiable / redevable",
    text: "Nous sommes responsables, loyaux vis-à-vis de l'organisation, intègres dans nos tâches comme dans nos communications.",
  },
];

export const groupesCibles = [
  "Les personnes déplacées internes et réfugiées",
  "Les communautés hôtes",
  "Les retournés",
  "Les femmes et les filles",
  "Les jeunes",
  "Les enfants",
  "Les personnes vivant avec un handicap",
  "Les survivantes de violences basées sur le genre",
  "Les petits producteurs agricoles",
  "Les personnes affectées par l'insécurité humaine sous toutes ses formes",
];

export const axesProgrammatiques = [
  {
    title: "Répondre à l'urgence",
    text: "Répondre aux besoins urgents dans un impératif de protection de la dignité humaine.",
  },
  {
    title: "Accompagner le relèvement",
    text: "Dans les zones stabilisées, accompagner le relèvement des populations vulnérables tout en renforçant leurs capacités de résilience.",
  },
  {
    title: "Soutenir le développement",
    text: "En l'absence de services de base fonctionnels, accompagner le développement des populations vulnérables en répondant aux besoins structurels tout en renforçant leur environnement.",
  },
  {
    title: "Adapter au climat",
    text: "Aider les agriculteurs à s'adapter au changement climatique en améliorant l'accès à l'eau, en promouvant une agriculture intelligente face au climat et en introduisant des cultures tolérantes à la sécheresse et aux maladies.",
  },
];

export const principes = [
  {
    title: "Humanité",
    text: "Il faut alléger les souffrances humaines où qu'elles soient. L'objectif de l'action humanitaire est de protéger la vie et la santé et de garantir le respect des êtres humains.",
  },
  {
    title: "Neutralité",
    text: "PI ne prend pas parti pendant les hostilités et ne se lance pas dans des polémiques de nature politique, raciale, religieuse ou idéologique.",
  },
  {
    title: "Impartialité",
    text: "L'action de PI est menée uniquement sur la base des besoins, sans faire de distinction entre nationalités, races, genres, religions ou opinions politiques.",
  },
  {
    title: "Indépendance",
    text: "L'action de PI est indépendante de toute visée politique, économique, militaire ou autre dans les zones où elle est mise en œuvre.",
  },
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
  temoignage?: { quote: string; author: string };
};

export const programmes: Programme[] = [
  {
    slug: "securite-alimentaire",
    title: "Sécurité alimentaire et moyens d'existence (SAME)",
    tagline: "Produire, nourrir, générer des revenus durables.",
    image: media.recolte,
    presentation:
      "Le programme SAME renforce la capacité des ménages vulnérables à produire, conserver et commercialiser leur production agricole, tout en diversifiant durablement leurs sources de revenus.",
    objectifs: [
      "Améliorer la disponibilité et l'accès à une alimentation nutritive",
      "Augmenter et diversifier les revenus des ménages accompagnés",
      "Renforcer la résilience face aux chocs climatiques et sécuritaires",
    ],
    activites: [
      "Agriculture durable et agroécologie",
      "Appui aux activités génératrices de revenus (AGR)",
      "Appui à la création et à la redynamisation des MUSOPEC et des AVEC",
      "Entrepreneuriat",
      "Formation professionnelle",
      "Développement des chaînes de valeur",
    ],
    resultats: [
      "Hausse des rendements agricoles des ménages appuyés",
      "Réduction des périodes de soudure",
      "Groupements et mutuelles d'épargne fonctionnels",
    ],
  },
  {
    slug: "autonomisation-femmes-jeunes",
    title: "Autonomisation économique des femmes et des jeunes",
    tagline: "Des opportunités économiques pour celles et ceux qui en sont privés.",
    image: media.haricot,
    presentation:
      "Ce programme lève les barrières économiques qui limitent les femmes et les jeunes, et soutient leurs initiatives génératrices de revenus ainsi que leur leadership.",
    objectifs: [
      "Renforcer l'autonomie financière des femmes et des jeunes",
      "Faciliter l'accès aux services financiers",
      "Promouvoir le leadership économique féminin",
    ],
    activites: [
      "Promotion du leadership féminin",
      "Inclusion économique",
      "Entrepreneuriat des jeunes et des femmes",
      "Accès aux services financiers",
    ],
    resultats: [
      "Activités économiques stables créées et accompagnées",
      "Accès élargi à l'épargne et au crédit",
      "Participation accrue des femmes aux décisions économiques",
    ],
  },
  {
    slug: "responsabilite-sociale-gouvernance",
    title: "Responsabilité sociale et gouvernance",
    tagline: "Des communautés informées, organisées et écoutées.",
    image: media.suivi,
    presentation:
      "Nous accompagnons les communautés dans la participation citoyenne, la connaissance de leurs droits et le dialogue constructif avec les autorités locales.",
    objectifs: [
      "Renforcer la participation citoyenne dans la gestion locale",
      "Améliorer l'accès à la documentation civile et la sécurisation foncière",
      "Créer des espaces de dialogue entre communautés et autorités",
    ],
    activites: [
      "Informations, formations et conseils sur la documentation civile (LCD) et le Logement, la Terre et la Propriété (LTP)",
      "Participation citoyenne",
      "Renforcement des organisations communautaires",
      "Sensibilisation aux droits et devoirs civiques",
      "Appui à la résolution collaborative des différends",
      "Gouvernance locale",
      "Dialogue communautaire",
      "Cohésion sociale",
    ],
    resultats: [
      "Organisations communautaires renforcées",
      "Différends résolus par des mécanismes collaboratifs",
      "Engagements publics suivis par les communautés",
    ],
  },
  {
    slug: "genre-protection-inclusion",
    title: "Genre, protection et inclusion",
    tagline: "Protéger, inclure et faire avancer l'égalité.",
    image: media.semis,
    presentation:
      "Le programme intègre l'égalité de genre et la protection dans toutes nos interventions, et lutte contre les violences basées sur le genre.",
    objectifs: [
      "Prévenir et répondre aux violences basées sur le genre",
      "Promouvoir l'égalité entre les femmes et les hommes",
      "Garantir l'inclusion des personnes les plus vulnérables",
    ],
    activites: [
      "Égalité entre les femmes et les hommes",
      "Prévention et réponse aux violences basées sur le genre",
      "Inclusion des personnes vulnérables",
      "Protection communautaire",
    ],
    resultats: [
      "Mécanismes communautaires de protection fonctionnels",
      "Survivantes orientées vers des services adaptés",
      "Participation accrue des femmes dans les structures locales",
    ],
  },
  {
    slug: "sante-communautaire-environnementale",
    title: "Santé communautaire et environnementale",
    tagline: "Prévenir, soigner et protéger l'environnement.",
    image: media.plantation,
    presentation:
      "Nous appuyons la promotion de l'hygiène, la prévention des maladies et la gestion environnementale, en accompagnant l'adaptation des communautés au changement climatique.",
    objectifs: [
      "Améliorer les pratiques d'hygiène et prévenir les maladies",
      "Renforcer la santé communautaire de proximité",
      "Promouvoir une gestion durable de l'environnement",
    ],
    activites: [
      "Promotion de l'hygiène",
      "Prévention des maladies",
      "Santé communautaire",
      "Gestion environnementale",
      "Adaptation au changement climatique",
    ],
    resultats: [
      "Réduction des maladies d'origine hydrique",
      "Relais communautaires actifs",
      "Pratiques agricoles et environnementales adaptées au climat",
    ],
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

export const donationAmounts = ["15", "45", "85", "100", "1000"];

export const donationTiers = [
  { amount: "15 USD", text: "Un kit de semences pour une famille agricole." },
  { amount: "45 USD", text: "Un appui nutritionnel pour un enfant vulnérable." },
  { amount: "85 USD", text: "Un kit de démarrage d'activité génératrice de revenus." },
  { amount: "100 USD", text: "Une assistance d'urgence pour un ménage déplacé." },
  { amount: "1000 USD", text: "Un point d'eau réhabilité pour toute une communauté." },
];

export const pays = [
  { name: "République Démocratique du Congo", code: "+243" },
  { name: "Belgique", code: "+32" },
  { name: "France", code: "+33" },
  { name: "Canada", code: "+1" },
  { name: "États-Unis", code: "+1" },
  { name: "Royaume-Uni", code: "+44" },
  { name: "Suisse", code: "+41" },
  { name: "Rwanda", code: "+250" },
  { name: "Ouganda", code: "+256" },
  { name: "Kenya", code: "+254" },
  { name: "Afrique du Sud", code: "+27" },
  { name: "Autre pays", code: "+000" },
];


export const paymentMethods = [
  "Carte bancaire",
  "PayPal",
  "Orange Money",
  "Airtel Money",
  "M-Pesa",
  "Virement bancaire",
];
