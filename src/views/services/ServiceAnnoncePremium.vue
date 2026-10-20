<template>
  <div>
    <ServiceHero
      :image="c.images.hero"
      :eyebrow="c.hero.eyebrow"
      :title="c.hero.title"
      :intro="c.hero.intro"
      :chips="[c.hero.price, c.hero.badge]"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="buy('annoncePremium')">{{ c.finalCta.cta }}</ServiceButton>
        <ServiceButton variant="ghost-light" @click="scrollToForm('annoncePremium')">{{ common.contactCta }}</ServiceButton>
      </template>
    </ServiceHero>

    <ServiceSection id="inclus" :title="c.includes.title">
      <div class="grid gap-10 lg:grid-cols-2 items-start">
        <NumberedSteps :items="c.includes.items" :cols="1" />
        <div class="lg:sticky lg:top-24">
          <ServiceImage v-bind="c.images.photos" />
        </div>
      </div>
    </ServiceSection>

    <ServiceSection id="pourquoi" tone="muted" :title="c.why.title">
      <div class="grid gap-10 lg:grid-cols-5 items-center">
        <div class="lg:col-span-2">
          <ServiceImage v-bind="c.images.virtualTour" />
        </div>
        <div class="lg:col-span-3">
          <BenefitGrid :items="c.why.items" :cols="2" />
        </div>
      </div>
    </ServiceSection>

    <ServiceSection id="etapes" :title="c.how.title">
      <NumberedSteps :items="c.how.items" layout="timeline" />
    </ServiceSection>

    <ServiceSection id="offre" tone="muted" :title="c.card.name">
      <div class="grid gap-10 lg:grid-cols-2 items-start">
        <OfferCard :card="{ ...c.card, name: '' }" featured>
          <template #actions>
            <ServiceButton arrow @click="buy('annoncePremium')">{{ c.finalCta.cta }}</ServiceButton>
          </template>
        </OfferCard>
        <div class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 md:p-8">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ c.conditions.title }}</h3>
          <dl class="mt-5 space-y-4 text-sm">
            <div v-for="(item, i) in c.conditions.items" :key="i">
              <dt class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</dt>
              <dd class="mt-1 text-gray-600 dark:text-gray-400 first-letter:uppercase">{{ item.text }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </ServiceSection>

    <ServiceStatement :title="c.closing.title" :text="c.closing.text" />

    <CtaBand :title="c.finalCta.title" :text="c.finalCta.text">
      <template #actions>
        <ServiceButton variant="light" arrow @click="buy('annoncePremium')">{{ c.finalCta.cta }}</ServiceButton>
        <ServiceButton variant="link-light" @click="scrollToForm('annoncePremium')">{{ c.finalCta.question }}</ServiceButton>
      </template>
    </CtaBand>

    <ServiceLeadForm
      :title="common.contactCta"
      :text="c.finalCta.question"
      :offers="[{ value: 'annoncePremium', label: c.card.name }]"
      :submit-label="common.form.submit"
    />

    <ServiceCrossLinks :title="common.otherServices" :items="serviceLinks(['assistanceCommerciale', 'mandatExclusif'])" />

    <TodoText :value="c.tagline" tag="p" class="block text-center text-sm text-gray-500 dark:text-gray-400 pb-10" />
  </div>
</template>

<script setup>
import heroImage from '../../assets/images/services/annonce-premium-hero.webp'
import { onMounted } from 'vue'
import { useServicePage } from '../../composables/useServicePage'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import ServiceImage from '../../components/services/ServiceImage.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import BenefitGrid from '../../components/services/BenefitGrid.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import ServiceStatement from '../../components/services/ServiceStatement.vue'
import CtaBand from '../../components/services/CtaBand.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import ServiceCrossLinks from '../../components/services/ServiceCrossLinks.vue'
import TodoText from '../../components/services/TodoText.vue'

defineOptions({
  name: 'ServiceAnnoncePremium',
  seo: {
    titleKey: 'servicePages.annoncePremium.seo.title',
    descriptionKey: 'servicePages.annoncePremium.seo.description',
    image: heroImage,
  },
})

const { c, common, buy, scrollToForm, setServiceSEO, trail, heroBreadcrumb, serviceLinks } = useServicePage('annoncePremium')

onMounted(() => {
  setServiceSEO(() => ({
    serviceName: c.value.card.name,
    serviceType: 'Real estate listing promotion',
    // 700 comes from the draft "À partir de 700 DH"
    offers: [{ name: c.value.card.name, minPrice: 700, priceCurrency: 'MAD' }],
    breadcrumb: trail.value,
    faq: [],
  }))
})
</script>
