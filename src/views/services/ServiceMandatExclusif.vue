<template>
  <div>
    <ServiceHero
      :image="c.images.hero"
      :eyebrow="c.hero.eyebrow"
      :title="c.hero.title"
      :intro="c.hero.intro"
      :chips="[c.hero.badge, c.hero.highlight]"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="scrollToForm('mandatExclusif')">{{ c.finalCta.cta }}</ServiceButton>
        <ServiceButton variant="ghost-light" to="/contact">{{ c.card.ctas.contact }}</ServiceButton>
      </template>
    </ServiceHero>

    <ServiceSection id="honoraires" :title="c.card.lead" :intro="c.card.text">
      <div class="max-w-3xl mx-auto">
        <OfferCard
          :card="{ name: c.card.name, badge: c.card.badge, fees: c.card.fees, highlight: c.card.highlight, note: c.card.note }"
          featured
        >
          <template #actions>
            <div class="flex flex-col sm:flex-row gap-3">
              <ServiceButton arrow @click="scrollToForm('mandatExclusif')">{{ c.card.ctas.request }}</ServiceButton>
              <ServiceButton variant="secondary" to="/contact">{{ c.card.ctas.contact }}</ServiceButton>
            </div>
          </template>
        </OfferCard>
      </div>
    </ServiceSection>

    <ServiceSection id="prise-en-charge" tone="muted" :title="c.includes.title">
      <div class="grid gap-10 lg:grid-cols-2 items-start">
        <NumberedSteps :items="c.includes.items" :cols="1" />
        <div class="lg:sticky lg:top-24">
          <ServiceImage v-bind="c.images.visit" />
        </div>
      </div>
    </ServiceSection>

    <ServiceSection id="pourquoi" :title="c.why.title">
      <BenefitGrid :items="c.why.items" :cols="3" />
      <ServiceImage v-bind="c.images.signature" sizes="(min-width: 1152px) 1152px, 100vw" class="mt-10 lg:aspect-[21/9]" />
    </ServiceSection>

    <ServiceSection id="etapes" tone="muted" :title="c.how.title">
      <NumberedSteps :items="c.how.items" layout="timeline" />
    </ServiceSection>

    <ServiceSection id="conditions" :title="c.conditions.title" narrow>
      <CheckList :items="c.conditions.items" icon="shield" />
    </ServiceSection>

    <ServiceStatement :title="c.closing.title" :text="c.closing.text" />

    <CtaBand :title="c.finalCta.title" :text="c.finalCta.text">
      <template #actions>
        <ServiceButton variant="light" arrow @click="scrollToForm('mandatExclusif')">{{ c.finalCta.cta }}</ServiceButton>
        <ServiceButton variant="link-light" to="/contact">{{ c.finalCta.question }}</ServiceButton>
      </template>
    </CtaBand>

    <ServiceLeadForm
      :title="common.contactCta"
      :text="c.finalCta.text"
      :offers="[{ value: 'mandatExclusif', label: c.card.name }]"
      :submit-label="c.finalCta.cta"
    />

    <ServiceCrossLinks :title="common.otherServices" :items="serviceLinks(['annoncePremium', 'assistanceCommerciale'])" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useServicePage } from '../../composables/useServicePage'
import { isTodo } from '../../utils/todo'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import ServiceImage from '../../components/services/ServiceImage.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import BenefitGrid from '../../components/services/BenefitGrid.vue'
import CheckList from '../../components/services/CheckList.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import ServiceStatement from '../../components/services/ServiceStatement.vue'
import CtaBand from '../../components/services/CtaBand.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import ServiceCrossLinks from '../../components/services/ServiceCrossLinks.vue'

defineOptions({
  name: 'ServiceMandatExclusif',
  seo: {
    titleKey: 'servicePages.mandatExclusif.seo.title',
    descriptionKey: 'servicePages.mandatExclusif.seo.description',
    image: '/images/services/mandat-exclusif-hero.webp',
  },
})

const { c, common, scrollToForm, setServiceSEO, trail, heroBreadcrumb, serviceLinks } = useServicePage('mandatExclusif')

onMounted(() => {
  if (c.value.card.fees.some((fee) => isTodo(fee.value))) {
    console.warn('[2P] Mandat exclusif: the rental fee rate is still a TODO (FR draft 50% vs AR draft 70%). Set one value in src/locales/services/mandat-exclusif.js (fr + ar).')
  }
  setServiceSEO(() => ({
    serviceName: c.value.breadcrumb,
    serviceType: 'Exclusive real estate brokerage mandate',
    // success fee (percentage) → no Offer price in JSON-LD
    offers: [],
    breadcrumb: trail.value,
    faq: [],
  }))
})
</script>
