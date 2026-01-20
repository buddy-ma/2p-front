import { createRouter, createWebHistory } from 'vue-router'
import { setupLanguageGuard } from './guards'
import { setupSEOGuard } from './seoGuard'
import Home from '../views/Home.vue'
import Professionnels from '../views/Professionnels.vue'
import ServicePromoteur from '../views/ServicePromoteur.vue'
import ServiceLocation from '../views/ServiceLocation.vue'
import ServiceVacances from '../views/ServiceVacances.vue'
import ServiceVente from '../views/ServiceVente.vue'
import Coworking from '../views/Coworking.vue'
import Tarifs from '../views/Tarifs.vue'
import Achat from '../views/Achat.vue'
import Location from '../views/Location.vue'
import Vacances from '../views/Vacances.vue'
import Immoneuf from '../views/Immoneuf.vue'
import Conseils from '../views/Conseils.vue'
import DecouvrezMaroc from '../views/DecouvrezMaroc.vue'
import Contact from '../views/Contact.vue'
import AddProduct from '../views/AddProduct.vue'

// Define routes without locale prefix (French routes)
const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
      seo: {
        titleKey: 'home.title',
        descriptionKey: 'home.description',
        image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
      },
    },
  },
  {
    path: '/professionnels',
    name: 'Professionnels',
    component: Professionnels,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/service-promoteur',
    name: 'ServicePromoteur',
    component: ServicePromoteur,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/service-location',
    name: 'ServiceLocation',
    component: ServiceLocation,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/service-vacances',
    name: 'ServiceVacances',
    component: ServiceVacances,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/service-vente',
    name: 'ServiceVente',
    component: ServiceVente,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/coworking',
    name: 'Coworking',
    component: Coworking,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/nos-tarifs',
    name: 'Tarifs',
    component: Tarifs,
    meta: { logo: 'blue', locale: 'fr' },
  },
  {
    path: '/immobilier-a-vendre/:ville?/:quartier?/:type?/:extra?',
    name: 'Achat',
    component: Achat,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
      seo: {
        titleKey: 'achat.title',
        descriptionKey: 'achat.description',
        image: '/assets/images/main_pages/Annonces-immobilier-a-vendre-au-Maroc.webp',
      },
    },
  },
  {
    path: '/location-vacances/:ville?/:quartier?/:type?/:extra?',
    name: 'Vacances',
    component: Vacances,
    meta: { 
      logo: 'orange', 
      locale: 'fr',
      seo: {
        titleKey: 'vacances.title',
        descriptionKey: 'vacances.description',
        image: '/assets/images/main_pages/Annonces-de-locations-de-vacances-au-Maroc.webp',
      },
    },
  },
  {
    path: '/location-immobiliere/:ville?/:quartier?/:type?/:extra?',
    name: 'Location',
    component: Location,
    meta: { 
      logo: 'purple', 
      locale: 'fr',
      seo: {
        titleKey: 'location.title',
        descriptionKey: 'location.description',
        image: '/assets/images/main_pages/Annonces-immobilier-a-louer-au-Maroc.webp',
      },
    },
  },
  {
    path: '/immobilier-neuf/:ville?/:quartier?/:type?/:extra?',
    name: 'Immoneuf',
    component: Immoneuf,
    meta: { 
      logo: 'green', 
      locale: 'fr',
      seo: {
        titleKey: 'immoneuf.title',
        descriptionKey: 'immoneuf.description',
        image: '/assets/images/main_pages/Annonces-immobilier-neuf-a-vendre-au-Maroc.webp',
      },
    },
  },
  {
    path: '/conseils',
    name: 'Conseils',
    component: Conseils,
    meta: { 
      logo: 'red', 
      locale: 'fr',
      seo: {
        titleKey: 'navigation.realEstateAdvice',
        descriptionKey: 'home.description',
        image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
      },
    },
  },
  {
    path: '/conseils/:slug',
    name: 'ConseilDetail',
    redirect: '/conseils',
    meta: { 
      logo: 'red', 
      locale: 'fr',
    },
  },
  {
    path: '/decouvrez-maroc',
    name: 'DecouvrezMaroc',
    component: DecouvrezMaroc,
    meta: { 
      logo: 'orange-decouvrez', 
      locale: 'fr',
      seo: {
        titleKey: 'navigation.discoverMorocco',
        descriptionKey: 'home.description',
        image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
      },
    },
  },
  {
    path: '/decouvrezMaroc',
    redirect: '/decouvrez-maroc',
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
      seo: {
        titleKey: 'contact.meta.title',
        descriptionKey: 'contact.meta.description',
        image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
      },
    },
  },
  {
    path: '/ajouter-annonce',
    name: 'AddProduct',
    component: AddProduct,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
      seo: {
        titleKey: 'add-product.title',
        descriptionKey: 'add-product.description',
      },
    },
  },
]

// Helper function to create localized routes
function createLocalizedRoutes(locale) {
  return baseRoutes.map(route => {
    // Skip redirect routes
    if (route.redirect) {
      return {
        ...route,
        path: `/${locale}${route.path}`,
        redirect: `/${locale}${route.redirect}`,
        meta: { ...route.meta, locale },
      }
    }
    
    return {
      ...route,
      path: `/${locale}${route.path}`,
      name: `${route.name}_${locale}`,
      meta: { ...route.meta, locale },
    }
  })
}

// Create English routes
const enRoutes = createLocalizedRoutes('en')

// Create Arabic routes
const arRoutes = createLocalizedRoutes('ar')

// Combine all routes
const routes = [
  ...baseRoutes,
  ...enRoutes,
  ...arRoutes,
  // Catch-all redirect for invalid language prefixes
  {
    path: '/:locale(en|ar)/:pathMatch(.*)*',
    redirect: (to) => {
      // Remove invalid locale and redirect to French version
      const pathWithoutLocale = to.path.replace(/^\/(en|ar)/, '')
      return pathWithoutLocale || '/'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Setup language guard
setupLanguageGuard(router)

// Setup SEO guard
setupSEOGuard(router)

export default router
