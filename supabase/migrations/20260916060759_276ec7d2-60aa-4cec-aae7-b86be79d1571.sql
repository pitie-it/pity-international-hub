CREATE TABLE public.programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  image_key text NOT NULL DEFAULT 'recolte',
  presentation text NOT NULL DEFAULT '',
  objectifs text[] NOT NULL DEFAULT '{}',
  activites text[] NOT NULL DEFAULT '{}',
  resultats text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.programmes TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.programmes TO authenticated;
GRANT ALL ON public.programmes TO service_role;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published programmes are public" ON public.programmes FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins read all programmes" ON public.programmes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage programmes" ON public.programmes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER programmes_updated BEFORE UPDATE ON public.programmes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.provinces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  chef_lieu text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  programmes text[] NOT NULL DEFAULT '{}',
  beneficiaires text NOT NULL DEFAULT '',
  map_x integer NOT NULL DEFAULT 50,
  map_y integer NOT NULL DEFAULT 50,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.provinces TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.provinces TO authenticated;
GRANT ALL ON public.provinces TO service_role;
ALTER TABLE public.provinces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published provinces are public" ON public.provinces FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins read all provinces" ON public.provinces FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage provinces" ON public.provinces FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER provinces_updated BEFORE UPDATE ON public.provinces FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Actualités',
  published_on date NOT NULL DEFAULT current_date,
  excerpt text NOT NULL DEFAULT '',
  image_key text NOT NULL DEFAULT 'suivi',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news_articles TO authenticated;
GRANT ALL ON public.news_articles TO service_role;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published news are public" ON public.news_articles FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins read all news" ON public.news_articles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage news" ON public.news_articles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER news_articles_updated BEFORE UPDATE ON public.news_articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.programmes (slug, title, tagline, image_key, presentation, objectifs, activites, resultats, sort_order) VALUES
('securite-alimentaire', 'Sécurité alimentaire et moyens d''existence (SAME)', 'Produire, nourrir, générer des revenus durables.', 'recolte', 'Le programme SAME renforce la capacité des ménages vulnérables à produire, conserver et commercialiser leur production agricole, tout en diversifiant durablement leurs sources de revenus.', ARRAY['Améliorer la disponibilité et l''accès à une alimentation nutritive','Augmenter et diversifier les revenus des ménages accompagnés','Renforcer la résilience face aux chocs climatiques et sécuritaires'], ARRAY['Agriculture durable et agroécologie','Appui aux activités génératrices de revenus (AGR)','Appui à la création et à la redynamisation des MUSOPEC et des AVEC','Entrepreneuriat','Formation professionnelle','Développement des chaînes de valeur'], ARRAY['Hausse des rendements agricoles des ménages appuyés','Réduction des périodes de soudure','Groupements et mutuelles d''épargne fonctionnels'], 0),
('autonomisation-femmes-jeunes', 'Autonomisation économique des femmes et des jeunes', 'Des opportunités économiques pour celles et ceux qui en sont privés.', 'haricot', 'Ce programme lève les barrières économiques qui limitent les femmes et les jeunes, et soutient leurs initiatives génératrices de revenus ainsi que leur leadership.', ARRAY['Renforcer l''autonomie financière des femmes et des jeunes','Faciliter l''accès aux services financiers','Promouvoir le leadership économique féminin'], ARRAY['Promotion du leadership féminin','Inclusion économique','Entrepreneuriat des jeunes et des femmes','Accès aux services financiers'], ARRAY['Activités économiques stables créées et accompagnées','Accès élargi à l''épargne et au crédit','Participation accrue des femmes aux décisions économiques'], 1),
('responsabilite-sociale-gouvernance', 'Responsabilité sociale et gouvernance', 'Des communautés informées, organisées et écoutées.', 'suivi', 'Nous accompagnons les communautés dans la participation citoyenne, la connaissance de leurs droits et le dialogue constructif avec les autorités locales.', ARRAY['Renforcer la participation citoyenne dans la gestion locale','Améliorer l''accès à la documentation civile et la sécurisation foncière','Créer des espaces de dialogue entre communautés et autorités'], ARRAY['Informations, formations et conseils sur la documentation civile et le Logement, la Terre et la Propriété','Participation citoyenne','Renforcement des organisations communautaires','Sensibilisation aux droits et devoirs civiques','Appui à la résolution collaborative des différends','Gouvernance locale','Dialogue communautaire','Cohésion sociale'], ARRAY['Organisations communautaires renforcées','Différends résolus par des mécanismes collaboratifs','Engagements publics suivis par les communautés'], 2),
('genre-protection-inclusion', 'Genre, protection et inclusion', 'Protéger, inclure et faire avancer l''égalité.', 'semis', 'Le programme intègre l''égalité de genre et la protection dans toutes nos interventions, et lutte contre les violences basées sur le genre.', ARRAY['Prévenir et répondre aux violences basées sur le genre','Promouvoir l''égalité entre les femmes et les hommes','Garantir l''inclusion des personnes les plus vulnérables'], ARRAY['Égalité entre les femmes et les hommes','Prévention et réponse aux violences basées sur le genre','Inclusion des personnes vulnérables','Protection communautaire'], ARRAY['Mécanismes communautaires de protection fonctionnels','Survivantes orientées vers des services adaptés','Participation accrue des femmes dans les structures locales'], 3),
('sante-communautaire-environnementale', 'Santé communautaire et environnementale', 'Prévenir, soigner et protéger l''environnement.', 'plantation', 'Nous appuyons la promotion de l''hygiène, la prévention des maladies et la gestion environnementale, en accompagnant l''adaptation des communautés au changement climatique.', ARRAY['Améliorer les pratiques d''hygiène et prévenir les maladies','Renforcer la santé communautaire de proximité','Promouvoir une gestion durable de l''environnement'], ARRAY['Promotion de l''hygiène','Prévention des maladies','Santé communautaire','Gestion environnementale','Adaptation au changement climatique'], ARRAY['Réduction des maladies d''origine hydrique','Relais communautaires actifs','Pratiques agricoles et environnementales adaptées au climat'], 4);

INSERT INTO public.provinces (slug, name, chef_lieu, description, programmes, beneficiaires, map_x, map_y, sort_order) VALUES
('nord-kivu', 'Nord-Kivu', 'Goma', 'Cœur de nos opérations : réponse humanitaire d''urgence, sécurité alimentaire et protection des personnes déplacées.', ARRAY['Réponse humanitaire','SAME','Protection','Genre'], '48 000+', 66, 40, 0),
('sud-kivu', 'Sud-Kivu', 'Bukavu', 'Justice économique pour les femmes et la jeunesse, santé communautaire et développement local participatif.', ARRAY['Justice économique','Santé communautaire','Résilience'], '24 000+', 66, 56, 1),
('ituri', 'Ituri', 'Bunia', 'Protection, cohésion sociale et relèvement des communautés affectées par les conflits armés.', ARRAY['Protection','Réponse humanitaire','Développement communautaire'], '13 000+', 64, 26, 2);

INSERT INTO public.news_articles (slug, title, category, published_on, excerpt, image_key, sort_order) VALUES
('distribution-semences-masisi', '1 200 ménages appuyés en semences améliorées à Masisi', 'Actualités', '2026-06-12', 'Une campagne agricole décisive pour renforcer la sécurité alimentaire des familles déplacées et hôtes.', 'semis', 0),
('communique-crise-nord-kivu', 'Communiqué : intensification de la réponse d''urgence au Nord-Kivu', 'Communiqués', '2026-05-28', 'Pitié Internationale appelle à un accès humanitaire sûr et sans entrave aux populations affectées.', 'recolte', 1),
('rapport-annuel-2025', 'Rapport annuel 2025 : redevabilité et résultats', 'Rapports', '2026-04-30', 'Découvrez l''ensemble de nos réalisations, nos dépenses et nos engagements pour l''année écoulée.', 'suivi', 2),
('forum-resilience-goma', 'Forum sur la résilience communautaire à Goma', 'Événements', '2026-04-18', 'Deux jours d''échanges entre communautés, autorités et partenaires humanitaires.', 'grain', 3),
('appel-offres-transport', 'Appel d''offres : transport et logistique des intrants agricoles', 'Appels d''offres', '2026-04-02', 'Les entreprises intéressées sont invitées à soumettre leur dossier avant la date limite.', 'plantation', 4),
('volontariat-2026', 'Appel à volontaires 2026 : rejoignez le mouvement', 'Volontariat', '2026-03-20', 'Étudiants, professionnels ou retraités : votre temps peut changer des vies.', 'suivi', 5);