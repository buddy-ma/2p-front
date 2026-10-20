<template>
  <div>
    <!-- 01 — Bannière -->
    <ServiceHero
      id="banniere"
      :image="c.images.hero"
      :title="c.hero.title"
      :intro="c.hero.subtitle"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="scrollToId('offres')">{{ c.sections.offers }}</ServiceButton>
        <ServiceButton variant="ghost-light" @click="scrollToForm()">{{ common.contactCta }}</ServiceButton>
      </template>
    </ServiceHero>

    <!-- 02 — Pourquoi 2P -->
    <ServiceSection id="pourquoi" :title="c.why.title">
      <div class="max-w-3xl">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ c.why.solutions.title }}</h3>
        <p v-if="c.why.solutions.subtitle" :class="['mt-2 text-lg font-semibold', colorClasses.text]">{{ c.why.solutions.subtitle }}</p>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">{{ c.why.solutions.text }}</p>
      </div>

      <h3 class="mt-14 mb-8 text-xl font-bold text-gray-900 dark:text-white">{{ c.why.reach.title }}</h3>
      <ul role="list" class="grid gap-8 md:grid-cols-2">
        <li
          v-for="item in c.why.reach.items"
          :key="item.image"
          class="flex flex-col bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <ServiceImage v-bind="c.images[item.image]" :rounded="false" sizes="(min-width: 768px) 50vw, 100vw" />
          <div class="p-6 md:p-8">
            <p v-if="item.eyebrow" :class="['text-sm font-semibold uppercase tracking-wide mb-2', colorClasses.text]">{{ item.eyebrow }}</p>
            <h4 class="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
              <component :is="item.image === 'mobileAgency' ? Truck : Smartphone" :size="22" :class="['flex-shrink-0', colorClasses.text]" aria-hidden="true" />
              {{ item.title }}
            </h4>
            <p class="mt-3 text-gray-600 dark:text-gray-400">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </ServiceSection>

    <!-- 03 — Nos 3 offres -->
    <ServiceSection id="offres" tone="muted" :title="c.sections.offers" :intro="premium?.card.groupTitle">
      <div class="grid gap-8 lg:grid-cols-3 items-stretch">
        <OfferCard v-if="premium" :card="premium.card">
          <template #actions>
            <ServiceButton variant="secondary" :to="SERVICE_PAGES.annoncePremium.path" arrow>{{ premium.card.ctas.details }}</ServiceButton>
          </template>
        </OfferCard>

        <OfferCard v-if="assistance" :card="assistance.card" featured>
          <template #actions>
            <ServiceButton arrow @click="buy('assistanceCommerciale')">{{ assistance.card.ctas.buy }}</ServiceButton>
            <ServiceButton variant="secondary" :to="SERVICE_PAGES.assistanceCommerciale.path">{{ assistance.card.ctas.details }}</ServiceButton>
            <ServiceButton variant="link" class="self-center" @click="scrollToForm('assistanceCommerciale')">{{ assistance.card.ctas.contact }}</ServiceButton>
          </template>
        </OfferCard>

        <OfferCard v-if="mandat" :card="mandat.card">
          <template #actions>
            <ServiceButton variant="secondary" :to="SERVICE_PAGES.mandatExclusif.path">{{ mandat.card.ctas.details }}</ServiceButton>
            <ServiceButton arrow @click="scrollToForm('mandatExclusif')">{{ mandat.card.ctas.request }}</ServiceButton>
            <ServiceButton variant="link" class="self-center" to="/contact">{{ mandat.card.ctas.contact }}</ServiceButton>
          </template>
        </OfferCard>
      </div>

      <div v-if="c.compare" class="mt-16">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{ c.sections.compare }}</h3>
        <ComparisonTable :caption="c.sections.compare" :columns="c.compare.columns" :rows="c.compare.rows" />
      </div>
    </ServiceSection>

    <!-- 04 — Détail des prestations -->
    <ServiceSection id="prestations" :title="c.sections.details">
      <ServiceTabs v-model="activeTab" id-prefix="details" :label="c.sections.details" :tabs="tabs">
        <template v-for="o in offers" :key="o.key" #[o.key]>
          <div class="grid gap-10 lg:grid-cols-5">
            <div class="lg:col-span-3">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{{ o.m.includes.title }}</h3>
              <NumberedSteps :items="o.m.includes.items" :cols="2" compact :heading-level="4" />
            </div>
            <div class="lg:col-span-2">
              <div class="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 md:p-8">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-5">{{ o.m.conditions.title }}</h3>
                <CheckList :items="o.m.conditions.items" icon="info" compact class="text-sm" />
              </div>
              <div class="mt-6">
                <ServiceButton variant="secondary" :to="SERVICE_PAGES[o.key].path" arrow>{{ o.m.card.ctas.details }}</ServiceButton>
              </div>
            </div>
          </div>
        </template>
      </ServiceTabs>
    </ServiceSection>

    <!-- 05 — Comment ça marche -->
    <ServiceSection id="comment-ca-marche" tone="muted" :title="c.sections.how">
      <ServiceTabs v-model="activeTab" id-prefix="how" :label="c.sections.how" :tabs="tabs">
        <template v-for="o in offers" :key="o.key" #[o.key]>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-8">{{ o.m.how.title }}</h3>
          <NumberedSteps :items="o.m.how.items" layout="timeline" :heading-level="4" />
        </template>
      </ServiceTabs>
    </ServiceSection>

    <!-- 06 — Questions fréquentes (hidden in production while every item is TODO) -->
    <ServiceSection v-if="showFaq" id="faq" :title="c.sections.faq" narrow>
      <FaqAccordion :items="faqItems" />
    </ServiceSection>

    <!-- 07 — Formulaire de contact -->
    <ServiceSection id="contact" tone="muted" :eyebrow="c.sections.contact" :title="c.closing.title" :intro="c.closing.text">
      <ServiceLeadForm
        v-model:offer="selectedOffer"
        as="div"
        :offers="tabs.map((tab) => ({ value: tab.id, label: tab.label }))"
        :image="c.images.contact"
        :submit-label="common.form.submit"
      />
    </ServiceSection>

    <ServiceCrossLinks :title="common.otherServices" :items="serviceLinks(['locationVacances', 'acheteursLocataires'])" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Smartphone, Truck } from 'lucide-vue-next'
import { useServicePage, stripNumberPrefix } from '../../composables/useServicePage'
import { SERVICE_PAGES } from '../../config/services'
import { SHOW_TODO, withoutTodo } from '../../utils/todo'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import ServiceImage from '../../components/services/ServiceImage.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import CheckList from '../../components/services/CheckList.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import ComparisonTable from '../../components/services/ComparisonTable.vue'
import ServiceTabs from '../../components/services/ServiceTabs.vue'
import FaqAccordion from '../../components/services/FaqAccordion.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import ServiceCrossLinks from '../../components/services/ServiceCrossLinks.vue'

defineOptions({
  name: 'ServicesProprietaires',
  seo: {
    titleKey: 'servicePages.proprietaires.seo.title',
    descriptionKey: 'servicePages.proprietaires.seo.description',
    image: '/images/services/proprietaires-hero.webp',
  },
})

const { c, common, tm, colorClasses, buy, scrollToForm, scrollToId, selectedOffer, setServiceSEO, trail, heroBreadcrumb, serviceLinks } = useServicePage('proprietaires')

const offers = computed(() => [
  { key: 'annoncePremium', m: tm('servicePages.annoncePremium') },
  { key: 'assistanceCommerciale', m: tm('servicePages.assistanceCommerciale') },
  { key: 'mandatExclusif', m: tm('servicePages.mandatExclusif') },
].filter((o) => o.m))

const byKey = (key) => offers.value.find((o) => o.key === key)?.m
const premium = computed(() => byKey('annoncePremium'))
const assistance = computed(() => byKey('assistanceCommerciale'))
const mandat = computed(() => byKey('mandatExclusif'))

const tabs = computed(() => offers.value.map((o) => ({
  id: o.key,
  label: o.key === 'assistanceCommerciale' ? stripNumberPrefix(o.m.hero.eyebrow) : o.m.card.name,
})))
const activeTab = ref('annoncePremium')

const faqItems = computed(() => (c.value.faq || []).map((f) => ({ q: f.q, a: f.a })))
const showFaq = computed(() => SHOW_TODO || withoutTodo(faqItems.value).length > 0)

onMounted(() => {
  setServiceSEO(() => ({
    serviceName: c.value.seo.title,
    serviceType: 'Real estate marketing services for property owners',
    // mandat = success fee → no Offer
    offers: [
      premium.value && { name: premium.value.card.name, minPrice: 700, priceCurrency: 'MAD' },
      assistance.value && { name: tabs.value.find((tab) => tab.id === 'assistanceCommerciale')?.label, price: 1000, priceCurrency: 'MAD' },
    ].filter(Boolean),
    faq: faqItems.value,
    breadcrumb: trail.value,
  }))
})
</script>
