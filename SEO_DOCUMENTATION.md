# Documentation SEO - Vue Frontend

## Vue d'ensemble

Ce document décrit l'implémentation complète du système SEO (Search Engine Optimization) dans le projet Vue.js frontend. Le système SEO a été conçu pour reproduire et améliorer la logique SEO existante du projet Laravel, en s'assurant que toutes les bonnes pratiques sont respectées.

## Architecture du système SEO

### 1. Utilitaires SEO (`src/utils/seo.js`)

Le fichier `seo.js` contient les fonctions utilitaires de base pour la gestion SEO :

#### Fonctions principales :

- **`getCanonicalUrl(path)`** : Génère l'URL canonique propre (sans paramètres de requête ni préfixe de langue)
  - Supprime automatiquement les préfixes de langue (en/, ar/)
  - Retourne toujours la version française comme URL canonique
  - Format : `https://www.2p.ma/chemin`

- **`getAlternateUrls(currentPath)`** : Génère les URLs alternatives pour les balises hreflang
  - Crée des URLs pour chaque langue (fr, en, ar)
  - Ajoute également `x-default` pointant vers la version française
  - Format : `{ fr: 'url', en: 'url', ar: 'url', 'x-default': 'url' }`

- **`getRobotsContent()`** : Détermine le contenu de la balise robots
  - En production : `index, follow` pour les URLs propres, `noindex, nofollow` pour les URLs avec paramètres
  - En développement : toujours `noindex, nofollow`

- **`hasQueryParams()`** : Vérifie si l'URL contient des paramètres de requête

- **`getLocalizedUrl(locale, path)`** : Génère une URL localisée pour une langue donnée

### 2. Composable SEO (`src/composables/useSEO.js`)

Le composable `useSEO` permet aux composants Vue de gérer dynamiquement les métadonnées SEO.

#### Utilisation :

```javascript
import { useSEO } from '../composables/useSEO'

const { updateSEO, updateTitle } = useSEO()

// Mettre à jour les métadonnées SEO
updateSEO({
  title: 'Titre de la page',
  description: 'Description de la page',
  image: '/assets/images/image.webp',
})
```

#### Fonctionnalités :

- **Mise à jour automatique** : Met à jour les balises meta, Open Graph, Twitter Cards, et JSON-LD
- **Génération de données structurées** : Crée automatiquement le schéma Organization JSON-LD
- **Gestion des URLs** : Génère automatiquement les URLs canoniques et alternates

### 3. Garde SEO du routeur (`src/router/seoGuard.js`)

Le garde SEO s'exécute automatiquement après chaque changement de route pour mettre à jour les métadonnées SEO.

#### Fonctionnalités :

- **Détection automatique de la langue** : Lit la langue depuis la route ou localStorage
- **Mise à jour des attributs HTML** : Met à jour `lang` et `dir` sur l'élément `<html>`
- **Lecture de la configuration SEO** : Utilise les métadonnées SEO définies dans les routes
- **Traduction automatique** : Traduit les titres et descriptions selon la langue actuelle

#### Configuration dans les routes :

```javascript
{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    logo: 'blue',
    locale: 'fr',
    seo: {
      titleKey: 'home.title',        // Clé de traduction
      descriptionKey: 'home.description',  // Clé de traduction
      image: '/assets/images/image.webp',  // Image Open Graph
    },
  },
}
```

### 4. Analytics et tracking (`src/utils/analytics.js`)

Le système inclut l'intégration de plusieurs outils d'analyse :

#### Outils intégrés :

- **Google Analytics** : Configuration avec gtag.js
  - ID : `G-LFPV895XGZ`
  - Conversion : `AW-10939895437`

- **Facebook Pixel** : Suivi des événements Facebook
  - ID : `1027173928317519`

- **Yandex Metrika** : Analyse du trafic
  - ID : `97358163`

- **Microsoft Clarity** : Analyse comportementale
  - ID : `mbgrxongwo`

#### Balises de vérification :

- **Yandex** : `c91cae9ec385daef`
- **Pinterest** : `b922dfebe37c7c7fd6fb75e85358d85f`

**Note** : Les scripts d'analyse ne se chargent qu'en production (`import.meta.env.PROD`).

## Métadonnées SEO implémentées

### 1. Balises Meta de base

- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">`
- `<meta name="robots" content="index,follow">` (ou `noindex,nofollow` selon le contexte)
- `<meta name="author" content="Particulier à Particulier">`
- `<meta name="description" content="...">`
- `<meta name="theme-color" content="#ffffff">`
- `<meta name="msapplication-TileColor" content="#ffc40d">`

### 2. URLs canoniques

- `<link rel="canonical" href="...">`
- Toujours la version française (sans préfixe de langue)
- Sans paramètres de requête

### 3. Balises hreflang

- `<link rel="alternate" hreflang="fr" href="...">`
- `<link rel="alternate" hreflang="en" href="...">`
- `<link rel="alternate" hreflang="ar" href="...">`
- `<link rel="alternate" hreflang="x-default" href="...">`

### 4. Open Graph (Facebook)

- `og:url` : URL canonique de la page
- `og:type` : Type de contenu (website)
- `og:title` : Titre de la page
- `og:description` : Description de la page
- `og:image` : Image de partage
- `og:site_name` : Nom du site
- `og:image:width` : Largeur de l'image (600px)
- `og:image:height` : Hauteur de l'image (600px)
- `og:logo` : Logo du site

### 5. Twitter Cards

- `twitter:card` : Type de carte (summary_large_image)
- `twitter:domain` : Domaine (2p.ma)
- `twitter:url` : URL de la page
- `twitter:title` : Titre
- `twitter:description` : Description
- `twitter:image` : Image
- `twitter:site` : Compte Twitter (@2Pmaimmobilier)
- `twitter:creator` : Créateur (@2Pmaimmobilier)

### 6. Données structurées (JSON-LD)

Le système génère automatiquement un schéma Organization avec les informations suivantes :

```json
{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "2p",
  "legalName": "Particulier à particulier",
  "url": "https://www.2p.ma/",
  "description": "...",
  "image": "...",
  "logo": "...",
  "telephone": "+212 661 678 714",
  "faxNumber": "+212 528 226 080",
  "email": "immo@2p.ma",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "38Bis Avenue Al Hamra",
    "addressLocality": "Agadir",
    "addressRegion": "Souss Massa Draa",
    "addressCountry": "Maroc",
    "postalCode": "80000"
  },
  "sameAs": [
    "https://www.facebook.com/particulier.ma",
    "https://www.youtube.com/channel/UCTCtax33qZQf-wLY2JQ6oQQ",
    "https://www.instagram.com/2p_ma/",
    "https://ma.linkedin.com/company/2p-ma"
  ]
}
```

## Configuration des routes SEO

### Routes configurées

Les routes suivantes ont des métadonnées SEO configurées :

1. **Home** (`/`)
   - Titre : `home.title`
   - Description : `home.description`
   - Image : `/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp`

2. **Achat** (`/immobilier-a-vendre`)
   - Titre : `achat.title`
   - Description : `achat.description`
   - Image : `/assets/images/main_pages/Annonces-immobilier-a-vendre-au-Maroc.webp`

3. **Location** (`/location-immobiliere`)
   - Titre : `location.title`
   - Description : `location.description`
   - Image : `/assets/images/main_pages/Annonces-immobilier-a-louer-au-Maroc.webp`

4. **Vacances** (`/location-vacances`)
   - Titre : `vacances.title`
   - Description : `vacances.description`
   - Image : `/assets/images/main_pages/Annonces-de-locations-de-vacances-au-Maroc.webp`

5. **Immoneuf** (`/immobilier-neuf`)
   - Titre : `immoneuf.title`
   - Description : `immoneuf.description`
   - Image : `/assets/images/main_pages/Annonces-immobilier-neuf-a-vendre-au-Maroc.webp`

6. **Contact** (`/contact`)
   - Titre : `contact.meta.title`
   - Description : `contact.meta.description`
   - Image : `/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp`

### Ajouter une nouvelle route SEO

Pour ajouter des métadonnées SEO à une nouvelle route :

1. Ouvrir `src/router/index.js`
2. Ajouter la propriété `seo` dans `meta` :

```javascript
{
  path: '/nouvelle-route',
  name: 'NouvelleRoute',
  component: NouvelleRoute,
  meta: {
    logo: 'blue',
    locale: 'fr',
    seo: {
      titleKey: 'nouvelleRoute.title',      // Clé dans les fichiers de traduction
      descriptionKey: 'nouvelleRoute.description',
      image: '/assets/images/image.webp',
    },
  },
}
```

3. Ajouter les traductions dans `src/locales/fr.js`, `en.js`, `ar.js` :

```javascript
// src/locales/fr.js
export default {
  // ...
  nouvelleRoute: {
    title: 'Titre en français',
    description: 'Description en français',
  },
}
```

## Gestion multilingue

### URLs par langue

- **Français (fr)** : Pas de préfixe (`/vente`, `/location`)
- **Anglais (en)** : Préfixe `/en` (`/en/vente`, `/en/location`)
- **Arabe (ar)** : Préfixe `/ar` (`/ar/vente`, `/ar/location`)

### URLs canoniques

Les URLs canoniques pointent toujours vers la version française (sans préfixe de langue), conformément aux bonnes pratiques SEO.

### Attributs HTML

Le système met à jour automatiquement :
- `lang` : Langue actuelle (fr, en, ar)
- `dir` : Direction du texte (ltr pour fr/en, rtl pour ar)

## Bonnes pratiques implémentées

### 1. URLs propres

- Les URLs canoniques sont toujours propres (sans paramètres de requête)
- Les préfixes de langue sont supprimés des URLs canoniques
- Les URLs avec paramètres sont marquées `noindex, nofollow`

### 2. Gestion des robots

- **Production** :
  - URLs propres : `index, follow`
  - URLs avec paramètres : `noindex, nofollow`
- **Développement** : Toujours `noindex, nofollow`

### 3. Images Open Graph

- Format recommandé : WebP
- Dimensions : 600x600px minimum
- Images spécifiques par page pour un meilleur partage social

### 4. Données structurées

- Schéma Organization pour améliorer la compréhension par les moteurs de recherche
- Informations complètes (adresse, contacts, réseaux sociaux)

## Intégration dans l'application

### Initialisation

Le système SEO est initialisé dans `src/App.vue` :

```javascript
import { useSEO } from './composables/useSEO'
import { initializeAnalytics, addVerificationTags } from './utils/analytics'

// Initialisation SEO
useSEO()

onMounted(() => {
  // Initialisation analytics (production uniquement)
  if (import.meta.env.PROD) {
    initializeAnalytics()
    addVerificationTags()
  }
})
```

### Mise à jour dynamique

Pour mettre à jour les métadonnées SEO depuis un composant :

```javascript
import { useSEO } from '../composables/useSEO'

const { updateSEO } = useSEO()

// Mettre à jour avec des données dynamiques
onMounted(() => {
  updateSEO({
    title: 'Titre dynamique',
    description: 'Description dynamique',
    image: '/assets/images/dynamic-image.webp',
  })
})
```

## Variables d'environnement

### Configuration requise

Créer un fichier `.env` avec :

```env
VITE_APP_URL=https://www.2p.ma
```

Si non défini, le système utilise `window.location.origin` en production ou `https://www.2p.ma` par défaut.

## Tests et validation

### Outils de validation recommandés

1. **Google Rich Results Test** : https://search.google.com/test/rich-results
   - Valider les données structurées JSON-LD

2. **Facebook Sharing Debugger** : https://developers.facebook.com/tools/debug/
   - Valider les balises Open Graph

3. **Twitter Card Validator** : https://cards-dev.twitter.com/validator
   - Valider les Twitter Cards

4. **Google Search Console** : https://search.google.com/search-console
   - Surveiller l'indexation et les erreurs SEO

### Checklist de validation

- [ ] URLs canoniques correctes (version française)
- [ ] Balises hreflang présentes pour toutes les langues
- [ ] Métadonnées Open Graph complètes
- [ ] Twitter Cards configurées
- [ ] Données structurées JSON-LD valides
- [ ] Images Open Graph optimisées (WebP, dimensions correctes)
- [ ] Robots meta corrects selon le contexte
- [ ] Attributs HTML lang et dir mis à jour

## Maintenance

### Mise à jour des traductions

Les métadonnées SEO utilisent le système de traduction i18n. Pour modifier un titre ou une description :

1. Ouvrir `src/locales/fr.js`, `en.js`, ou `ar.js`
2. Modifier la clé correspondante
3. Les changements seront automatiquement reflétés dans les métadonnées SEO

### Mise à jour des images Open Graph

1. Placer l'image dans `public/assets/images/`
2. Mettre à jour la propriété `image` dans la configuration SEO de la route
3. S'assurer que l'image est au format WebP et optimisée

### Ajout de nouvelles langues

Si une nouvelle langue est ajoutée :

1. Ajouter la langue dans `AVAILABLE_LOCALES` dans `src/utils/seo.js`
2. Ajouter les routes localisées dans `src/router/index.js`
3. Créer les fichiers de traduction correspondants
4. Mettre à jour la fonction `getAlternateUrls()` si nécessaire

## Résolution de problèmes

### Les métadonnées ne se mettent pas à jour

1. Vérifier que `setupSEOGuard` est appelé dans `src/router/index.js`
2. Vérifier que la route a une configuration `seo` dans `meta`
3. Vérifier que les clés de traduction existent dans les fichiers de locale

### Les URLs canoniques sont incorrectes

1. Vérifier que `BASE_URL` est correctement configuré
2. Vérifier que `getCanonicalUrl()` supprime correctement les préfixes de langue
3. Vérifier la console du navigateur pour les erreurs

### Les analytics ne se chargent pas

1. Vérifier que `import.meta.env.PROD` est `true` en production
2. Vérifier la console du navigateur pour les erreurs de chargement
3. Vérifier que les scripts ne sont pas bloqués par un bloqueur de publicité

## Conclusion

Le système SEO implémenté dans le projet Vue frontend est complet et suit les meilleures pratiques. Il reproduit fidèlement la logique SEO du projet Laravel tout en tirant parti des capacités dynamiques de Vue.js pour une gestion automatique et réactive des métadonnées.

Pour toute question ou amélioration, consulter la documentation des fichiers source ou contacter l'équipe de développement.
