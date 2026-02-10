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
import NotFound404 from '../views/NotFound404.vue'
import Gone410 from '../views/Gone410.vue'
import ProductDetail from '../views/ProductDetail.vue'
import BlogDetail from '../views/BlogDetail.vue'

// Define routes without locale prefix (French routes)
const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/professionnels',
    name: 'Professionnels',
    component: Professionnels,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/service-promoteur',
    name: 'ServicePromoteur',
    component: ServicePromoteur,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/service-location',
    name: 'ServiceLocation',
    component: ServiceLocation,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/service-vacances',
    name: 'ServiceVacances',
    component: ServiceVacances,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/service-vente',
    name: 'ServiceVente',
    component: ServiceVente,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/coworking',
    name: 'Coworking',
    component: Coworking,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/nos-tarifs',
    name: 'Tarifs',
    component: Tarifs,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/immobilier-a-vendre/:ville?/:quartier?/:type?/:extra?',
    name: 'Achat',
    component: Achat,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/location-vacances/:ville?/:quartier?/:type?/:extra?',
    name: 'Vacances',
    component: Vacances,
    meta: { 
      logo: 'orange', 
      locale: 'fr',
    },
  },
  {
    path: '/location-immobiliere/:ville?/:quartier?/:type?/:extra?',
    name: 'Location',
    component: Location,
    meta: { 
      logo: 'purple', 
      locale: 'fr',
    },
  },
  {
    path: '/immobilier-neuf/:ville?/:quartier?/:type?/:extra?',
    name: 'Immoneuf',
    component: Immoneuf,
    meta: { 
      logo: 'green', 
      locale: 'fr',
    },
  },
  {
    path: '/conseils',
    name: 'Conseils',
    component: Conseils,
    meta: { 
      logo: 'red', 
      locale: 'fr',
    },
  },
  {
    path: '/conseils/:slug',
    name: 'ConseilDetail',
    component: BlogDetail,
    meta: { 
      logo: 'red', 
      locale: 'fr',
    },
  },
  {
    path: '/annonce/:slug',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/decouvrez-maroc',
    name: 'DecouvrezMaroc',
    component: DecouvrezMaroc,
    meta: { 
      logo: 'orange', 
      locale: 'fr',
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
    },
  },
  {
    path: '/ajouter-annonce',
    name: 'AddProduct',
    component: AddProduct,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/404',
    name: 'NotFound404',
    component: NotFound404,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
  {
    path: '/410',
    name: 'Gone410',
    component: Gone410,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
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
  // Catch-all route for 404 - must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound404,
    meta: { 
      logo: 'blue', 
      locale: 'fr',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If navigating to ProductDetail, always scroll to top
    if (to.name === 'ProductDetail' || to.name === 'ProductDetail_en' || to.name === 'ProductDetail_ar') {
      return { top: 0, behavior: 'smooth' }
    }
    // If there's a saved position (e.g., browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // Otherwise scroll to top
    return { top: 0, behavior: 'smooth' }
  },
})

// Setup language guard
setupLanguageGuard(router)

// Setup SEO guard
setupSEOGuard(router)

export default router
