<template>
  <div class="product-detail min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-20">
      <div class="flex justify-center items-center">
        <div :class="`animate-spin rounded-full h-12 w-12 border-b-2 ${colorClasses.border}`"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-20">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">{{ t('error404.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
        <router-link :to="'/'" :class="`px-6 py-3 rounded-lg font-semibold ${colorClasses.bg} text-white`">
          {{ t('error404.backHome') }}
        </router-link>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="container mx-auto px-4 py-8">
      <!-- Title Bar -->
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ product.title }}
        </h1>
        <div class="flex items-center text-gray-600 dark:text-gray-400">
          <span class="mr-2">#</span>
          <span>{{ product.reference }}</span>
        </div>
      </div>

      <!-- Image Carousel -->
      <div v-if="product.images && product.images.length > 0" class="mb-8">
        <div class="relative">
          <div class="overflow-hidden rounded-lg">
            <img 
              :src="currentImage" 
              :alt="product.title"
              class="w-full h-[400px] md:h-[600px] object-cover"
            />
          </div>
          <!-- Navigation Arrows -->
          <button
            v-if="product.images.length > 1"
            @click="previousImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-if="product.images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <!-- Thumbnail Indicators -->
        <div v-if="product.images.length > 1" class="flex gap-2 mt-4 overflow-x-auto">
          <button
            v-for="(image, index) in product.images"
            :key="image.id"
            @click="currentImageIndex = index"
            :class="[
              'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition',
              currentImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
            ]"
          >
            <img 
              :src="getImageUrl(image.image)" 
              :alt="`${product.title} - Image ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Virtual Tour -->
          <div v-if="product.vr_link" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.virtualTour') }}
            </h5>
            <div class="divider-fade mb-4"></div>
            <iframe 
              :src="product.vr_link"
              width="100%" 
              height="640" 
              frameborder="0" 
              allow="xr-spatial-tracking; gyroscope; accelerometer"
              allowfullscreen 
              scrolling="no"
              class="rounded-lg"
            ></iframe>
          </div>

          <!-- Video -->
          <div v-if="product.video_link" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.video') }}
            </h5>
            <div class="divider-fade mb-4"></div>
            <iframe 
              :src="product.video_link"
              frameborder="0" 
              allowfullscreen 
              width="100%"
              height="500"
              class="rounded-lg"
            ></iframe>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.description') }}
            </h5>
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {{ product.description }}
            </p>
            <a 
              v-if="product.proprietaire?.pdf"
              :href="getPdfUrl(product.proprietaire.pdf)"
              target="_blank"
              :class="`inline-flex items-center mt-4 px-6 py-3 rounded-lg font-bold ${colorClasses.bg} text-white hover:opacity-90 transition`"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ t('product.downloadBrochure') }}
            </a>
          </div>

          <!-- Details -->
          <div class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.details') }}
            </h5>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.category') }}:</span>
                  <span>{{ product.category?.title }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.type') }}:</span>
                  <span>{{ product.type?.title }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.reference') }}:</span>
                  <span>{{ product.reference }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.city') }}:</span>
                  <span>{{ product.ville }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.neighborhood') }}:</span>
                  <span>{{ product.quartier }}</span>
                </div>
                <div v-if="product.surface" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.surface') }}:</span>
                  <span>{{ product.surface }} {{ product.unite_surface }}</span>
                </div>
                <div v-if="product.nbr_chambres" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.bedrooms') }}:</span>
                  <span>{{ product.nbr_chambres }}</span>
                </div>
                <div v-if="product.nbr_salons" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.livingRooms') }}:</span>
                  <span>{{ product.nbr_salons }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.price') }}:</span>
                  <span :class="product.vendu ? 'text-red-500 line-through' : colorClasses.text">
                    {{ formattedPrice }}
                  </span>
                </div>
              </div>
              <div v-if="product.address" class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-start">
                  <svg class="w-5 h-5 mr-3 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <span class="font-semibold mr-2">{{ t('product.address') }}:</span>
                    <span>{{ product.address }}</span>
                  </div>
                </div>
              </div>
              <!-- Extras -->
              <div v-if="productExtras.length > 0" class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div v-for="extra in productExtras" :key="extra" class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ getExtraTranslation(extra) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Location Map -->
          <div v-if="product.position" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Localisation
            </h5>
            <div class="divider-fade mb-4"></div>
            <p class="mb-4 text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ product.ville }}, {{ product.quartier }}, {{ product.address }}
            </p>
            <iframe 
              :src="product.position"
              width="100%" 
              height="450" 
              style="border:0;"
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-lg"
            ></iframe>
          </div>

          <!-- Similar Products -->
          <div v-if="similarProducts && similarProducts.length > 0" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('similar.title') }}
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard 
                v-for="similarProduct in similarProducts" 
                :key="similarProduct.id"
                :product="similarProduct"
              />
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <!-- Contact Form Widget -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 sticky top-4">
            <h4 id="contact-title" class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.contact') }}
            </h4>
            <form @submit.prevent="submitContact" class="space-y-4">
              <input
                v-model="contactForm.fullname"
                type="text"
                :placeholder="t('product.fullName')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                v-model="contactForm.phone"
                type="tel"
                maxlength="10"
                :placeholder="t('product.phone')"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                v-model="contactForm.email"
                type="email"
                :placeholder="t('product.email')"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <textarea
                v-model="contactForm.message"
                :placeholder="t('product.messageOptional')"
                required
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
              <button
                type="submit"
                :class="`w-full px-6 py-3 rounded-lg font-semibold text-white transition ${colorClasses.bg} ${colorClasses.hover}`"
              >
                {{ t('product.send') }}
              </button>
            </form>

            <!-- Social Share -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {{ t('product.share_on') || 'Partager sur' }}:
                </span>
                <div class="flex gap-2">
                  <button
                    @click="copyLink"
                    class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    :title="t('product.copyLink')"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <a
                    :href="whatsappShareUrl"
                    target="_blank"
                    @click="trackWhatsAppClick"
                    class="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition text-white"
                    :title="t('product.shareWhatsapp')"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                  <a
                    :href="facebookShareUrl"
                    target="_blank"
                    class="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    :title="t('product.shareFacebook')"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Mobile Sticky Bar -->
      <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-around gap-2 md:hidden z-50">
        <a
          href="#contact-title"
          class="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-center font-semibold"
        >
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a
          v-if="product.proprietaire?.phone && product.hide_infos === 0"
          :href="`tel:${product.proprietaire.phone}`"
          class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-center font-semibold"
        >
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a
          v-if="product.proprietaire?.phone && product.hide_infos === 0"
          :href="whatsappShareUrl"
          target="_blank"
          @click="trackWhatsAppClick"
          class="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg text-center font-semibold"
        >
          <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '../services/productService'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const { colorClasses } = useTheme()
const { t } = useI18n()
const { showToast } = useToast()

const product = ref(null)
const similarProducts = ref([])
const loading = ref(true)
const error = ref(null)
const currentImageIndex = ref(0)
const contactForm = ref({
  fullname: '',
  phone: '',
  email: '',
  message: '',
})

const currentImage = computed(() => {
  if (!product.value?.images || product.value.images.length === 0) {
    return 'http://localhost:8000/admin_assets/images/products/1.webp'
  }
  return getImageUrl(product.value.images[currentImageIndex.value].image)
})

const productExtras = computed(() => {
  if (!product.value?.extras) return []
  try {
    const extras = JSON.parse(product.value.extras)
    return Object.values(extras).filter(v => v && v !== '')
  } catch {
    return []
  }
})

const formattedPrice = computed(() => {
  if (!product.value) return ''
  
  // If formatted_price exists, strip HTML tags and decode HTML entities
  if (product.value.formatted_price) {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = product.value.formatted_price
    let textContent = tempDiv.textContent || tempDiv.innerText || ''
    // Decode HTML entities
    textContent = textContent
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    // Clean up extra whitespace
    textContent = textContent.trim().replace(/\s+/g, ' ')
    return textContent
  }
  
  if (product.value.vendu) {
    return `${product.value.prix} ${t('common.mad')}`
  }
  if (product.value.prix_by === 'a partir de') {
    return `${t('product.from')} ${product.value.prix} ${t('common.mad')}`
  } else if (product.value.prix_by !== 'fix') {
    return `${Number(product.value.prix).toLocaleString()} ${t('product.per')} (${product.value.prix_by})`
  }
  return `${product.value.prix} ${t('common.mad')}`
})

const whatsappShareUrl = computed(() => {
  const url = window.location.href
  const text = `Bonjour, je suis intéressé par votre annonce sur 2P.ma : ${product.value?.title}, ${url}`
  return `https://wa.me/${product.value?.proprietaire?.phone}?text=${encodeURIComponent(text)}`
})

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
})

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'http://localhost:8000/admin_assets/images/products/1.webp'
  return `https://cdn.2p.ma/product/images/${imagePath}`
}

const getPdfUrl = (pdfPath) => {
  if (!pdfPath) return ''
  return `https://cdn.2p.ma/product/pdfs/${pdfPath}`
}

const nextImage = () => {
  if (product.value?.images && product.value.images.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length
  }
}

const previousImage = () => {
  if (product.value?.images && product.value.images.length > 0) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? product.value.images.length - 1 
      : currentImageIndex.value - 1
  }
}

const loadProduct = async () => {
  try {
    loading.value = true
    error.value = null
    const slug = route.params.slug
    const response = await productService.getProductBySlug(slug)
    const data = response.data || response
    
    product.value = data.product
    similarProducts.value = data.similarProducts || []
    
    // Reset image index when product changes
    currentImageIndex.value = 0
  } catch (err) {
    console.error('Error loading product:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load product'
    if (err.response?.status === 404) {
      router.push('/404')
    }
  } finally {
    loading.value = false
  }
}

const submitContact = async () => {
  try {
    // TODO: Implement contact form submission API call
    showToast(t('product.send') + ' - ' + t('common.loading'), 'info')
    // For now, just show success message
    setTimeout(() => {
      showToast('Message envoyé avec succès', 'success')
      contactForm.value = { fullname: '', phone: '', email: '', message: '' }
    }, 1000)
  } catch (err) {
    showToast('Erreur lors de l\'envoi du message', 'error')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToast(t('product.linkCopiedSuccess'), 'success')
  } catch (err) {
    showToast(t('product.copyFailed'), 'error')
  }
}

const getExtraTranslation = (extra) => {
  // Try to get translation, fallback to original if not found
  const translation = t(`extras.${extra}`)
  // If translation returns the key itself (meaning not found), return the original
  return translation && translation !== `extras.${extra}` ? translation : extra
}

const trackWhatsAppClick = async () => {
  if (product.value?.id) {
    try {
      // TODO: Implement WhatsApp click tracking API call
      await fetch(`/api/whatsapp-clicks?id=${product.value.id}`)
    } catch (err) {
      console.error('Error tracking WhatsApp click:', err)
    }
  }
}

onMounted(() => {
  loadProduct()
})

// Watch for route changes
watch(() => route.params.slug, () => {
  loadProduct()
})
</script>

<style scoped>
.divider-fade {
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
  margin: 1rem 0;
}
</style>
