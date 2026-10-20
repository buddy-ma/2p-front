<template>
  <div>
    <ServiceHero
      :image="c.images.hero"
      :title="c.hero.title"
      :intro="c.hero.intro"
      :chips="[c.offer.price, c.offer.badge, c.offer.validity]"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="buy('locationVacances')">{{ c.ctas.buy }}</ServiceButton>
        <ServiceButton variant="ghost-light" @click="scrollToForm('locationVacances')">{{ c.ctas.contact }}</ServiceButton>
      </template>
    </ServiceHero>

    <ServiceSection id="pourquoi" :title="c.why.title">
      <div class="max-w-3xl">
        <p :class="['text-2xl font-bold', colorClasses.text]">{{ c.why.subtitle }}</p>
        <p v-for="(p, i) in c.why.text" :key="i" class="mt-4 text-lg text-gray-600 dark:text-gray-400">{{ p }}</p>
      </div>
    </ServiceSection>

    <section id="offre" aria-labelledby="offre-title" class="scroll-mt-20 bg-gray-50 dark:bg-gray-800/40">
      <div class="container mx-auto px-4 max-w-6xl py-16 md:py-20">
        <h2 id="offre-title" :class="['text-2xl md:text-3xl font-semibold mb-10 md:mb-12 text-start', colorClasses.text]">
          <span v-if="offerEmoji" aria-hidden="true" class="me-2">{{ offerEmoji }}</span>{{ offerName }}
        </h2>
        <div class="max-w-xl mx-auto">
          <OfferCard
            :card="{
              name: c.offer.subtitle,
              price: c.offer.price,
              includesTitle: c.offer.includesTitle,
              includes: c.offer.includes,
              badge: c.offer.badge,
              notes: [c.offer.validity, c.offer.renewal],
            }"
            featured
          >
            <template #actions>
              <ServiceButton arrow @click="buy('locationVacances')">{{ c.ctas.buy }}</ServiceButton>
            </template>
          </OfferCard>
        </div>
      </div>
    </section>

    <ServiceSection id="inclus" :title="c.includes.title">
      <NumberedSteps :items="c.includes.items" :cols="3" />
    </ServiceSection>

    <CtaBand :title="c.control.title" :text="c.control.text" :price-line="c.control.priceLine">
      <template #actions>
        <ServiceButton variant="light" arrow @click="buy('locationVacances')">{{ c.ctas.buy }}</ServiceButton>
      </template>
    </CtaBand>

    <ServiceSection id="visite-360" :title="c.virtualTour.title">
      <div class="grid gap-10 lg:grid-cols-2 items-center">
        <div class="space-y-4">
          <p v-for="(p, i) in c.virtualTour.text" :key="i" class="text-lg text-gray-600 dark:text-gray-400">{{ p }}</p>
        </div>
        <ServiceImage v-bind="c.images.virtualTour" />
      </div>
    </ServiceSection>

    <ServiceSection id="contact-direct" tone="muted" :title="c.directContact.title">
      <div class="grid gap-10 lg:grid-cols-2 items-center">
        <ServiceImage v-bind="c.images.directContact" />
        <p class="text-lg text-gray-600 dark:text-gray-400">{{ c.directContact.text }}</p>
      </div>
    </ServiceSection>

    <ServiceSection id="etapes" :eyebrow="numberPrefix(c.how.title)" :title="stripNumberPrefix(c.how.title)">
      <NumberedSteps :items="c.how.items" layout="timeline" />
    </ServiceSection>

    <ServiceSection id="contact" tone="muted" :eyebrow="numberPrefix(c.info.title)" :title="stripNumberPrefix(c.info.title)" :intro="c.info.text">
      <ServiceLeadForm
        as="div"
        :offers="[{ value: 'locationVacances', label: offerName }]"
        :submit-label="common.form.submit"
      >
        <div class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <ServiceButton variant="link" to="/location-vacances" arrow>{{ t('navigation.vacationRental') }}</ServiceButton>
        </div>
      </ServiceLeadForm>
    </ServiceSection>

    <TodoText :value="c.tagline" tag="p" class="block text-center text-sm text-gray-500 dark:text-gray-400 py-10" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useServicePage, stripNumberPrefix, numberPrefix } from '../../composables/useServicePage'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import ServiceImage from '../../components/services/ServiceImage.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import CtaBand from '../../components/services/CtaBand.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import TodoText from '../../components/services/TodoText.vue'

defineOptions({
  name: 'ServiceLocationVacancesOwners',
  seo: {
    titleKey: 'servicePages.locationVacances.seo.title',
    descriptionKey: 'servicePages.locationVacances.seo.description',
    image: '/images/services/location-vacances-hero.webp',
  },
})

const { c, common, t, colorClasses, buy, scrollToForm, setServiceSEO, trail, heroBreadcrumb } = useServicePage('locationVacances')

// The FR label starts with an emoji ("🏖️ LOCATION DE VACANCES"): decorative in headings, dropped from data.
const EMOJI_PREFIX = /^\s*(\p{Extended_Pictographic}\uFE0F?)\s*/u
const offerEmoji = computed(() => (c.value.offer.label.match(EMOJI_PREFIX) || [])[1] || '')
const offerName = computed(() => c.value.offer.label.replace(EMOJI_PREFIX, ''))

onMounted(() => {
  setServiceSEO(() => ({
    serviceName: offerName.value,
    serviceType: 'Vacation rental listing (annual subscription)',
    // "À partir de 700 DH / an" from the draft
    offers: [{ name: c.value.offer.subtitle, minPrice: 700, priceCurrency: 'MAD', unitText: 'YEAR' }],
    breadcrumb: trail.value,
    faq: [],
  }))
})
</script>
