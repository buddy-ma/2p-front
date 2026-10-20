<template>
  <div>
    <ServiceHero
      :image="c.images.hero"
      :eyebrow="c.hero.eyebrow"
      :eyebrow-secondary="c.hero.eyebrowSecondary"
      :title="c.hero.title"
      :intro="c.hero.intro"
      :chips="[c.hero.price, c.hero.badge]"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="buy('assistanceCommerciale')">{{ c.finalCta.cta }}</ServiceButton>
        <ServiceButton variant="ghost-light" @click="scrollToForm('assistanceCommerciale')">{{ common.contactCta }}</ServiceButton>
      </template>
    </ServiceHero>

    <ServiceSection id="inclus" :title="c.includes.title">
      <NumberedSteps :items="c.includes.items" :cols="3" />
    </ServiceSection>

    <ServiceSection id="pourquoi" tone="muted" :title="c.why.title">
      <div class="grid gap-10 lg:grid-cols-2 items-center">
        <BenefitGrid :items="c.why.items" :cols="1" />
        <ServiceImage v-bind="c.images.followUp" />
      </div>
    </ServiceSection>

    <ServiceSection id="etapes" :title="c.how.title">
      <NumberedSteps :items="c.how.items" layout="timeline" highlight="05" />
      <ServiceImage v-bind="c.images.visits" sizes="(min-width: 1152px) 1152px, 100vw" class="mt-10 lg:aspect-[21/9]" />
    </ServiceSection>

    <ServiceSection id="tarif" tone="muted" :title="c.pricing.title">
      <div class="grid gap-10 lg:grid-cols-2 items-start">
        <OfferCard
          :card="{ price: c.pricing.price, includesTitle: c.pricing.includesTitle, includes: c.pricing.items }"
          featured
        >
          <template #actions>
            <ServiceButton arrow @click="buy('assistanceCommerciale')">{{ c.finalCta.cta }}</ServiceButton>
          </template>
        </OfferCard>
        <div class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-5">{{ c.conditions.title }}</h3>
          <CheckList :items="c.conditions.items" icon="info" />
        </div>
      </div>
    </ServiceSection>

    <CtaBand :title="c.finalCta.title" :text="c.finalCta.text" :price-line="c.finalCta.priceLine">
      <template #actions>
        <ServiceButton variant="light" arrow @click="buy('assistanceCommerciale')">{{ c.finalCta.cta }}</ServiceButton>
      </template>
      <TodoText :value="c.finalCta.note" tag="p" class="block mt-4 text-sm text-white/80 max-w-3xl" />
    </CtaBand>

    <ServiceLeadForm
      :title="common.contactCta"
      :offers="[{ value: 'assistanceCommerciale', label: offerName }]"
      :submit-label="common.form.submit"
    />

    <ServiceCrossLinks :title="common.otherServices" :items="serviceLinks(['annoncePremium', 'mandatExclusif'])" />
  </div>
</template>

<script setup>
import heroImage from '../../assets/images/services/assistance-commerciale-hero.webp'
import { computed, onMounted } from 'vue'
import { useServicePage, stripNumberPrefix } from '../../composables/useServicePage'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import ServiceImage from '../../components/services/ServiceImage.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import BenefitGrid from '../../components/services/BenefitGrid.vue'
import CheckList from '../../components/services/CheckList.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import CtaBand from '../../components/services/CtaBand.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import ServiceCrossLinks from '../../components/services/ServiceCrossLinks.vue'
import TodoText from '../../components/services/TodoText.vue'

defineOptions({
  name: 'ServiceAssistanceCommerciale',
  seo: {
    titleKey: 'servicePages.assistanceCommerciale.seo.title',
    descriptionKey: 'servicePages.assistanceCommerciale.seo.description',
    image: heroImage,
  },
})

const { c, common, buy, scrollToForm, setServiceSEO, trail, heroBreadcrumb, serviceLinks } = useServicePage('assistanceCommerciale')

// c.card (short offer-card copy) is rendered on the owners hub, not here.
const offerName = computed(() => stripNumberPrefix(c.value.hero.eyebrow))

onMounted(() => {
  setServiceSEO(() => ({
    serviceName: offerName.value,
    serviceType: 'Real estate sales assistance',
    // 1 000 DH / 3 mois from the draft
    offers: [{ name: offerName.value, price: 1000, priceCurrency: 'MAD', description: c.value.pricing.price }],
    breadcrumb: trail.value,
    faq: [],
  }))
})
</script>
