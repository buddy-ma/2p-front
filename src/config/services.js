export const SERVICE_PAGES = {
  proprietaires:         { path: '/services/proprietaires',                        name: 'ServicesProprietaires',         logo: 'blue'   },
  annoncePremium:        { path: '/services/proprietaires/annonce-premium',        name: 'ServiceAnnoncePremium',         logo: 'blue'   },
  assistanceCommerciale: { path: '/services/proprietaires/assistance-commerciale', name: 'ServiceAssistanceCommerciale',  logo: 'blue'   },
  mandatExclusif:        { path: '/services/proprietaires/mandat-exclusif',        name: 'ServiceMandatExclusif',         logo: 'blue'   },
  locationVacances:      { path: '/services/proprietaires/location-vacances',      name: 'ServiceLocationVacancesOwners', logo: 'orange' },
  acheteursLocataires:   { path: '/services/acheteurs-locataires',                 name: 'ServiceAcheteursLocataires',    logo: 'blue'   },
}

// Online purchase is not built yet. Put the real URL (e.g. on account.2p.ma) when it exists;
// while null the "buy" CTA scrolls to the lead form with the offer preselected.
export const CHECKOUT_URLS = {
  annoncePremium: null,
  assistanceCommerciale: null,
  locationVacances: null,
  passVisites: null,
}

export const LEAD_FORM = {
  endpoint: '/commercialiserContact', // same endpoint + payload as src/views/Contact.vue
  requireEmail: true, // TODO(Ayman): set false only once the Laravel validation for commercialiserContact accepts a missing email
}

export const SERVICE_AREA = { city: 'Agadir', region: 'Souss-Massa' }
