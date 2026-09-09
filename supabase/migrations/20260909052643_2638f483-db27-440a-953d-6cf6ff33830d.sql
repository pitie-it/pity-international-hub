CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- TEXTES
CREATE TABLE public.site_texts (
  key text PRIMARY KEY,
  page text NOT NULL,
  label text NOT NULL,
  value text NOT NULL DEFAULT '',
  multiline boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_texts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_texts TO authenticated;
GRANT ALL ON public.site_texts TO service_role;
ALTER TABLE public.site_texts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Texts are public" ON public.site_texts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage texts" ON public.site_texts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_texts_updated BEFORE UPDATE ON public.site_texts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- TEMOIGNAGES
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  role_label text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published testimonials are public" ON public.testimonials FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- OFFRES D'EMPLOI
CREATE TABLE public.job_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'CDD',
  lieu text NOT NULL DEFAULT '',
  departement text NOT NULL DEFAULT '',
  deadline text NOT NULL DEFAULT '',
  resume text NOT NULL DEFAULT '',
  missions text[] NOT NULL DEFAULT '{}',
  profil text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.job_offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_offers TO authenticated;
GRANT ALL ON public.job_offers TO service_role;
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published offers are public" ON public.job_offers FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins read all offers" ON public.job_offers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage offers" ON public.job_offers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER job_offers_updated BEFORE UPDATE ON public.job_offers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- COORDONNEES
CREATE TABLE public.site_settings (
  id text PRIMARY KEY DEFAULT 'main',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  phone_alt text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  devise text NOT NULL DEFAULT '',
  facebook text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  youtube text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are public" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- DONNEES INITIALES
INSERT INTO public.site_settings (id, email, phone, phone_alt, whatsapp, address, devise, facebook, instagram, linkedin, youtube)
VALUES ('main', 'pitieinternationalrdc@gmail.com', '+243 810 262 600', '+243 977 535 252', '243810262600',
        'Goma, Nord-Kivu, République Démocratique du Congo', 'Pitié – Humanité – Entraide',
        'https://facebook.com', 'https://instagram.com', 'https://linkedin.com', 'https://youtube.com');

INSERT INTO public.site_texts (key, page, label, value, multiline, sort_order) VALUES
('home.hero.title', 'Accueil', 'Titre principal', 'Ensemble pour sauver des vies et restaurer la dignité humaine', false, 1),
('home.hero.text', 'Accueil', 'Texte d''introduction', 'Chez Pitié Internationale, nous croyons que chaque vie compte et que chaque personne mérite de vivre dans la sécurité, la dignité et l''espoir. Aux côtés des communautés les plus vulnérables, nous transformons la solidarité en actions concrètes pour répondre aux urgences humanitaires, renforcer la résilience des populations et promouvoir un développement durable et inclusif.', true, 2),
('home.mission.title', 'Accueil', 'Titre de la mission', 'Une ONG congolaise au service de la dignité humaine', false, 3),
('home.mission.text', 'Accueil', 'Texte de la mission', 'Sauver des vies, vaincre la pauvreté, promouvoir la justice sociale et renforcer la sécurité humaine : telle est la raison d''être de Pitié Internationale. Nous intervenons aux côtés des communautés du Nord-Kivu, du Sud-Kivu et de l''Ituri, dans le respect strict des principes humanitaires.', true, 4),
('home.testimonials.title', 'Accueil', 'Titre de la section témoignages', 'Des voix du terrain', false, 5),
('home.testimonials.subtitle', 'Accueil', 'Sous-titre des témoignages', 'Celles et ceux que nous accompagnons racontent le changement.', true, 6),
('home.cta.title', 'Accueil', 'Titre de l''appel à l''action', 'Votre soutien transforme des vies, dès aujourd''hui', false, 7),
('home.cta.text', 'Accueil', 'Texte de l''appel à l''action', 'Donnez, devenez volontaire ou construisons ensemble un partenariat durable.', true, 8),
('emploi.hero.title', 'Emploi', 'Titre de la page', 'Rejoignez nos équipes sur le terrain', false, 1),
('emploi.hero.text', 'Emploi', 'Texte d''introduction', 'Pitié Internationale recrute des professionnels engagés pour servir les communautés du Nord-Kivu, du Sud-Kivu et de l''Ituri. Postulez en ligne, en quelques minutes.', true, 2),
('contact.hero.title', 'Contact', 'Titre de la page', 'Contactez-nous', false, 1),
('contact.hero.text', 'Contact', 'Texte d''introduction', 'Une question, un partenariat, une demande presse ? Notre équipe vous répond dans les meilleurs délais.', true, 2);

INSERT INTO public.testimonials (quote, author, role_label, sort_order) VALUES
('Grâce aux semences améliorées et à la formation, ma récolte a doublé et mes enfants mangent à leur faim.', 'Furaha M.', 'Agricultrice, Masisi (Nord-Kivu)', 1),
('La mutuelle d''épargne m''a permis de lancer mon atelier de couture et d''employer deux jeunes femmes.', 'Esperance K.', 'Entrepreneure, Goma', 2),
('Les comités communautaires nous ont appris nos droits et nous osons désormais parler aux autorités.', 'Jean-Pierre B.', 'Représentant communautaire, Bunia (Ituri)', 3);

INSERT INTO public.job_offers (slug, title, type, lieu, departement, deadline, resume, missions, profil, sort_order) VALUES
('charge-projet-same', 'Chargé(e) de projet Sécurité Alimentaire (SAME)', 'CDD', 'Goma, Nord-Kivu', 'Programmes', '30 septembre 2026',
 'Piloter la mise en œuvre des activités agricoles et d''agroécologie auprès des groupements de producteurs.',
 ARRAY['Planifier et superviser les activités de terrain du programme SAME','Assurer le suivi budgétaire et la qualité des livrables','Coordonner avec les autorités locales et les partenaires techniques'],
 ARRAY['Diplôme en agronomie, développement rural ou équivalent','3 ans d''expérience minimum en ONG humanitaire','Excellente maîtrise du français et du swahili'], 1),
('officier-protection-vbg', 'Officier(ère) Protection et VBG', 'CDD', 'Bukavu, Sud-Kivu', 'Protection', '15 octobre 2026',
 'Renforcer les mécanismes communautaires de prévention et de réponse aux violences basées sur le genre.',
 ARRAY['Animer les espaces sûrs et les comités de protection','Assurer la gestion de cas selon les standards internationaux','Former les relais communautaires et rapporter les incidents'],
 ARRAY['Formation en sciences sociales, psychologie ou droit','Expérience confirmée en gestion de cas VBG','Sens élevé de la confidentialité et de l''éthique'], 2),
('assistant-mel', 'Assistant(e) Suivi-Évaluation, Redevabilité et Apprentissage', 'CDI', 'Bunia, Ituri', 'MEAL', '5 octobre 2026',
 'Produire des données fiables pour mesurer l''impact de nos programmes et nourrir l''apprentissage organisationnel.',
 ARRAY['Concevoir les outils de collecte et superviser les enquêtes','Analyser les données et rédiger les rapports d''impact','Gérer le mécanisme de plainte et de retour d''information'],
 ARRAY['Maîtrise de KoboToolbox, Excel et d''un outil de visualisation','2 ans d''expérience en suivi-évaluation','Rigueur analytique et esprit de synthèse'], 3),
('stage-communication', 'Stagiaire Communication et Plaidoyer', 'Stage', 'Goma, Nord-Kivu', 'Communication', '20 septembre 2026',
 'Appuyer la production de contenus digitaux et la valorisation des histoires de changement du terrain.',
 ARRAY['Rédiger des articles et publications réseaux sociaux','Réaliser des reportages photo et vidéo','Contribuer au rapport annuel de l''organisation'],
 ARRAY['Étudiant(e) ou jeune diplômé(e) en communication','Bonne plume en français, l''anglais est un atout','Maîtrise des outils de création graphique'], 4);