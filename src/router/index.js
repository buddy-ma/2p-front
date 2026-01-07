import { createRouter, createWebHistory } from 'vue-router'
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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { logo: 'blue' },
  },
  {
    path: '/professionnels',
    name: 'Professionnels',
    component: Professionnels,
    meta: { logo: 'blue' },
  },
  {
    path: '/service-promoteur',
    name: 'ServicePromoteur',
    component: ServicePromoteur,
    meta: { logo: 'blue' },
  },
  {
    path: '/service-location',
    name: 'ServiceLocation',
    component: ServiceLocation,
    meta: { logo: 'blue' },
  },
  {
    path: '/service-vacances',
    name: 'ServiceVacances',
    component: ServiceVacances,
    meta: { logo: 'blue' },
  },
  {
    path: '/service-vente',
    name: 'ServiceVente',
    component: ServiceVente,
    meta: { logo: 'blue' },
  },
  {
    path: '/coworking',
    name: 'Coworking',
    component: Coworking,
    meta: { logo: 'blue' },
  },
  {
    path: '/nos-tarifs',
    name: 'Tarifs',
    component: Tarifs,
    meta: { logo: 'blue' },
  },
  {
    path: '/immobilier-a-vendre/:ville?/:quartier?/:type?/:extra?',
    name: 'Achat',
    component: Achat,
    meta: { logo: 'blue' },
  },
  {
    path: '/location-vacances/:ville?/:quartier?/:type?/:extra?',
    name: 'Vacances',
    component: Vacances,
    meta: { logo: 'orange' },
  },
  {
    path: '/location-immobiliere/:ville?/:quartier?/:type?/:extra?',
    name: 'Location',
    component: Location,
    meta: { logo: 'purple' },
  },
  {
    path: '/immobilier-neuf/:ville?/:quartier?/:type?/:extra?',
    name: 'Immoneuf',
    component: Immoneuf,
    meta: { logo: 'green' },
  },
  {
    path: '/conseils',
    name: 'Conseils',
    component: Conseils,
    meta: { logo: 'red' },
  },
  {
    path: '/decouvrez-maroc',
    name: 'DecouvrezMaroc',
    component: DecouvrezMaroc,
    meta: { logo: 'orange' },
  },
  {
    path: '/decouvrezMaroc',
    redirect: '/decouvrez-maroc',
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { logo: 'blue' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

