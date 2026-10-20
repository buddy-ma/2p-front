<template>
  <div>
    <ServiceHero
      :image="c.images.hero"
      :title="c.hero.title"
      :intro="[c.hero.subtitle, c.hero.intro]"
      lead-strong
      :chips="[c.hero.badge]"
      :breadcrumb="heroBreadcrumb"
    >
      <template #actions>
        <ServiceButton arrow @click="scrollToId('offres')">{{ c.offers.passVisites.cta }}</ServiceButton>
        <ServiceButton variant="ghost-light" @click="scrollToForm()">{{ common.contactCta }}</ServiceButton>
      </template>
    </ServiceHero>

    <ServiceSection id="offres" tone="muted" :title="c.band.title" :intro="c.band.text">
      <div class="grid gap-8 md:grid-cols-2 items-stretch">
        <OfferCard
          :card="{ n: pass.n, name: pass.name, question: pass.lead, price: pass.price, text: pass.text, includes: pass.includes }"
          :image="c.images.passVisites"
        >
          <template #actions>
            <ServiceButton arrow @click="buy('passVisites')">{{ pass.cta }}</ServiceButton>
          </template>
        </OfferCard>
        <OfferCard
          :card="{ n: pack.n, name: pack.name, question: pack.lead, text: pack.text, includes: pack.includes, note: pack.note, price: pack.price }"
          :image="c.images.packPersonnalise"
        >
          <template #actions>
            <ServiceButton arrow @click="scrollToForm('packPersonnalise')">{{ pack.cta }}</ServiceButton>
          </template>
        </OfferCard>
      </div>
    </ServiceSection>

    <ServiceSection id="comment" :eyebrow="c.how.n" :title="c.how.title">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 :class="['text-xl font-bold mb-6', colorClasses.text]"><bdi>{{ c.how.passVisites.label }}</bdi></h3>
          <NumberedSteps :items="c.how.passVisites.items" layout="timeline" :horizontal="false" :heading-level="4">
            <template #after-01>
              <div class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <ServiceButton variant="link" to="/immobilier-a-vendre" arrow>{{ t('navigation.sale') }}</ServiceButton>
                <ServiceButton variant="link" to="/location-immobiliere" arrow>{{ t('navigation.location') }}</ServiceButton>
              </div>
            </template>
          </NumberedSteps>
        </div>
        <div>
          <h3 :class="['text-xl font-bold mb-6', colorClasses.text]"><bdi>{{ c.how.packPersonnalise.label }}</bdi></h3>
          <NumberedSteps :items="c.how.packPersonnalise.items" layout="timeline" :horizontal="false" :heading-level="4" />
        </div>
      </div>
    </ServiceSection>

    <ServiceStatement card :eyebrow="c.final.eyebrow" :title="c.final.title">
      <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">{{ c.final.disclaimer }}</p>
    </ServiceStatement>

    <ServiceLeadForm
      v-model:offer="selectedOffer"
      variant="buyer"
      listing-url-for="packPersonnalise"
      :title="common.contactCta"
      :text="c.band.text"
      :offers="[
        { value: 'passVisites', label: pass.name },
        { value: 'packPersonnalise', label: pack.name },
      ]"
      :submit-label="common.form.submit"
    />

    <TodoText :value="c.tagline" tag="p" class="block text-center text-sm text-gray-500 dark:text-gray-400 py-10" />
  </div>
</template>

<script setup>
import heroImage from '../../assets/images/services/acheteurs-locataires-hero.webp'
import { computed, onMounted } from 'vue'
import { useServicePage } from '../../composables/useServicePage'
import ServiceHero from '../../components/services/ServiceHero.vue'
import ServiceSection from '../../components/services/ServiceSection.vue'
import NumberedSteps from '../../components/services/NumberedSteps.vue'
import OfferCard from '../../components/services/OfferCard.vue'
import ServiceStatement from '../../components/services/ServiceStatement.vue'
import ServiceButton from '../../components/services/ServiceButton.vue'
import ServiceLeadForm from '../../components/services/ServiceLeadForm.vue'
import TodoText from '../../components/services/TodoText.vue'

defineOptions({
  name: 'ServiceAcheteursLocataires',
  seo: {
    titleKey: 'servicePages.acheteursLocataires.seo.title',
    descriptionKey: 'servicePages.acheteursLocataires.seo.description',
    image: heroImage,
  },
})

const { c, common, t, colorClasses, buy, scrollToForm, scrollToId, selectedOffer, setServiceSEO, trail, heroBreadcrumb } = useServicePage('acheteursLocataires')

const pass = computed(() => c.value.offers.passVisites)
const pack = computed(() => c.value.offers.packPersonnalise)

onMounted(() => {
  setServiceSEO(() => ({
    serviceName: c.value.breadcrumb,
    serviceType: 'Property visit assistance for buyers and tenants',
    // the pack has no price in the drafts → no Offer for it
    offers: [{ name: pass.value.name, price: 300, priceCurrency: 'MAD', description: pass.value.price }],
    breadcrumb: trail.value,
    faq: [],
  }))
})
</script>
