// Service page copy (FR + AR only). Each module exports { fr, ar }.
import common from './common.js'
import annoncePremium from './annonce-premium.js'
import assistanceCommerciale from './assistance-commerciale.js'
import mandatExclusif from './mandat-exclusif.js'
import proprietaires from './proprietaires.js'
import locationVacances from './location-vacances.js'
import acheteursLocataires from './acheteurs-locataires.js'

const modules = {
  common,
  annoncePremium,
  assistanceCommerciale,
  mandatExclusif,
  proprietaires,
  locationVacances,
  acheteursLocataires,
}

export default {
  fr: Object.fromEntries(Object.entries(modules).map(([k, m]) => [k, m.fr])),
  ar: Object.fromEntries(Object.entries(modules).map(([k, m]) => [k, m.ar])),
}
