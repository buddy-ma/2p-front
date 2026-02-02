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
          <div class="overflow-hidden rounded-lg cursor-pointer" @click="openImageModal(currentImageIndex)">
            <img :src="currentImage" :alt="product.title" class="w-full h-[400px] md:h-[600px] object-cover" />
          </div>
          <!-- Navigation Arrows -->
          <button v-if="product.images.length > 1" @click.stop="previousImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button v-if="product.images.length > 1" @click.stop="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <!-- Thumbnail Indicators -->
        <div v-if="product.images.length > 1" class="flex gap-2 mt-4 overflow-x-auto">
          <button v-for="(image, index) in product.images" :key="image.id" @click="currentImageIndex = index"
            @dblclick="openImageModal(index)" :class="[
              'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition cursor-pointer',
              currentImageIndex === index ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
            ]">
            <img :src="getImageUrl(image.image)" :alt="`${product.title} - Image ${index + 1}`"
              class="w-full h-full object-cover" />
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
            <div class="relative rounded-lg overflow-hidden">
              <!-- Preview with overlay -->
              <div class="relative">
                <iframe v-if="!isVrFullscreen" :src="product.vr_link" width="100%" height="640" frameborder="0"
                  allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no"
                  class="rounded-lg pointer-events-none"></iframe>
                <!-- Overlay Layer -->
                <div v-if="!isVrFullscreen" @click="openVrFullscreen"
                  class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all rounded-lg group">
                  <div class="text-center">
                    <div
                      :class="`${colorClasses.bg} text-white px-8 py-4 rounded-lg shadow-lg flex flex-col items-center gap-3 group-hover:scale-105 transition-transform`">
                      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span class="font-semibold text-lg">{{ t('product.startVirtualTour') }}</span>
                      <span class="text-sm opacity-90">{{ t('product.clickToViewFullscreen') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div v-if="product.video_link" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.video') }}
            </h5>
            <div class="divider-fade mb-4"></div>
            <iframe :src="product.video_link" frameborder="0" allowfullscreen width="100%" height="500"
              class="rounded-lg"></iframe>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.description') }}
            </h5>
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {{ product.description }}
            </p>
            <a v-if="product.proprietaire?.pdf" :href="getPdfUrl(product.proprietaire.pdf)" target="_blank"
              :class="`inline-flex items-center mt-4 px-6 py-3 rounded-lg font-bold ${colorClasses.bg} text-white hover:opacity-90 transition`">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.category') }}:</span>
                  <span>{{ product.category?.title }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.type') }}:</span>
                  <span>{{ product.type?.title }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.reference') }}:</span>
                  <span>{{ product.reference }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.city') }}:</span>
                  <span>{{ product.ville }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.neighborhood') }}:</span>
                  <span>{{ product.quartier }}</span>
                </div>
                <div v-if="product.surface" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.surface') }}:</span>
                  <span>{{ product.surface }} {{ product.unite_surface }}</span>
                </div>
                <div v-if="product.nbr_chambres" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.bedrooms') }}:</span>
                  <span>{{ product.nbr_chambres }}</span>
                </div>
                <div v-if="product.nbr_salons" class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-semibold mr-2">{{ t('product.livingRooms') }}:</span>
                  <span>{{ product.nbr_salons }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ product.ville }}, {{ product.quartier }}, {{ product.address }}
            </p>
            <iframe :src="product.position" width="100%" height="450" style="border:0;" allowfullscreen=""
              loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg"></iframe>
          </div>

          <!-- Similar Products -->
          <div v-if="similarProducts && similarProducts.length > 0" class="mb-8">
            <h5 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('similar.title') }}
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard v-for="similarProduct in similarProducts" :key="similarProduct.id"
                :product="similarProduct" />
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <!-- Contact Form Widget -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 sticky top-4">
            <!-- Owner/Company Information Section -->
            <div v-if="product.hide_infos === 0" class="mb-6">
              <h4 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {{ t('product.information') }}
                <span v-if="isAccessExpert">
                  {{ t('product.company_info') }}
                </span>
                <span v-else-if="product.product_category_id === 3">
                  {{ t('product.promoter_info') }}
                </span>
                <span v-else>
                  {{ t('product.owner_info') }}
                </span>
              </h4>

              <!-- Administrator Message -->
              <p v-if="isAdministrator" class="text-gray-600 dark:text-gray-400 mb-4">
                {{ t('product.no_commercial') }}
              </p>

              <!-- Company Information (Access Expert) -->
              <div v-if="isAccessExpert && product.user?.company">
                <ul :class="['space-y-3', companyContactExpanded ? 'company-contact-show' : 'company-contact']">
                  <!-- Company Logo -->
                  <li v-if="product.user.company.logo" class="flex justify-center">
                    <img :src="getCompanyLogoUrl(product.user.company.logo)"
                      :alt="`Logo de ${product.user.company.name}`" class="mb-3 w-32 h-32 object-contain rounded-lg" />
                  </li>

                  <!-- Company Name -->
                  <li class="flex items-center text-gray-700 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ product.user.company.name }}
                  </li>

                  <!-- Phone (Hidden/Shown) -->
                  <li v-if="product.proprietaire?.phone" class="flex items-center text-gray-700 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span v-if="!phoneRevealed">{{ maskedPhone }}</span>
                    <span v-else>{{ product.proprietaire.phone }}</span>
                  </li>

                  <!-- Website -->
                  <li v-if="product.user.company.website" class="flex items-center text-gray-700 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {{ product.user.company.website }}
                  </li>

                  <!-- Social Media Links (shown when expanded) -->
                  <li v-if="companyContactExpanded"
                    class="flex items-center justify-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <a v-if="product.user.company.social_facebook" :href="product.user.company.social_facebook"
                      target="_blank" class="text-blue-600 hover:text-blue-800 transition">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a v-if="product.user.company.social_instagram" :href="product.user.company.social_instagram"
                      target="_blank" class="text-pink-600 hover:text-pink-800 transition">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a v-if="product.user.company.social_tiktok" :href="product.user.company.social_tiktok"
                      target="_blank" class="text-gray-900 dark:text-white hover:opacity-80 transition">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                    <a v-if="product.user.company.social_youtube" :href="product.user.company.social_youtube"
                      target="_blank" class="text-red-600 hover:text-red-800 transition">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </li>
                </ul>

                <!-- Our Prices Button -->
                <a href="/nos-tarifs" target="_blank"
                  class="block mt-3 px-6 py-3 rounded-lg font-semibold text-white text-center transition"
                  style="background-color: #ff385c;">
                  {{ t('product.our_prices') }}
                </a>

                <!-- Show More/Less Button -->
                <button v-if="product.proprietaire?.phone" @click="toggleCompanyContact"
                  class="w-full mt-3 px-6 py-3 rounded-lg font-semibold text-white transition" :class="colorClasses.bg">
                  {{ companyContactExpanded ? t('product.show_less') : t('product.show_more') }}
                </button>
              </div>

              <!-- Owner Information (Regular User) -->
              <div v-else>
                <ul class="space-y-3">
                  <!-- Owner Logo -->
                  <li v-if="product.proprietaire?.logo" class="flex justify-center">
                    <img :src="getProductLogoUrl(product.proprietaire.logo)"
                      :alt="`${product.proprietaire.firstname} ${product.proprietaire.lastname}`"
                      class="mb-3 w-32 h-32 object-contain rounded-lg" />
                  </li>

                  <!-- Owner Name -->
                  <li v-if="product.proprietaire" class="flex items-center text-gray-700 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ product.proprietaire.firstname }} {{ product.proprietaire.lastname }}
                  </li>

                  <!-- Phone (Hidden/Shown) -->
                  <li v-if="product.proprietaire?.phone" class="flex items-center text-gray-700 dark:text-gray-300">
                    <svg class="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span v-if="!phoneRevealed">{{ maskedPhone }}</span>
                    <span v-else>{{ product.proprietaire.phone }}</span>
                  </li>

                  <!-- See Phone Button -->
                  <button v-if="product.proprietaire?.phone && !phoneRevealed" @click="togglePhone"
                    class="w-full mt-3 px-6 py-3 rounded-lg font-semibold text-white transition"
                    :class="colorClasses.bg">
                    {{ t('product.see_phone') }}
                  </button>
                </ul>
              </div>
            </div>

            <!-- Hide Infos Message -->
            <div v-else class="mb-6">
              <h4 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {{ t('product.information') }}
                <span v-if="isAccessExpert">
                  {{ t('product.company_info') }}
                </span>
                <span v-else-if="product.product_category_id === 3">
                  {{ t('product.promoter_info') }}
                </span>
                <span v-else>
                  {{ t('product.owner_info') }}
                </span>
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {{ t('product.no_commercial_simple') }}
              </p>
            </div>

            <hr class="mb-6 border-gray-200 dark:border-gray-700">

            <!-- Contact Form -->
            <h4 id="contact-title" class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {{ t('product.contact') }}
            </h4>
            <form @submit.prevent="submitContact" class="space-y-4">
              <input v-model="contactForm.fullname" type="text" :placeholder="t('product.fullName')" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input v-model="contactForm.phone" type="tel" maxlength="10" :placeholder="t('product.phone')" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input v-model="contactForm.email" type="email" :placeholder="t('product.email')"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <textarea v-model="contactForm.message" :placeholder="t('product.messageOptional')" required rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
              <button type="submit"
                :class="`w-full px-6 py-3 rounded-lg font-semibold text-white transition ${colorClasses.bg} ${colorClasses.hover}`">
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
                  <button @click="copyLink"
                    class="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    :title="t('product.copyLink')">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <a :href="whatsappShareUrl" target="_blank" @click="trackWhatsAppClick"
                    class="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition text-white"
                    :title="t('product.shareWhatsapp')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a :href="facebookShareUrl" target="_blank"
                    class="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    :title="t('product.shareFacebook')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <button @click="shareInstagram" class="p-2 rounded-lg transition text-white"
                    style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);"
                    :title="t('product.shareInstagram')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Mobile Sticky Bar -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-around gap-2 md:hidden z-50">
        <a href="#contact-title" class="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-center font-semibold">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a v-if="product.proprietaire?.phone && product.hide_infos === 0" :href="`tel:${product.proprietaire.phone}`"
          class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-center font-semibold">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a v-if="product.proprietaire?.phone && product.hide_infos === 0" :href="whatsappShareUrl" target="_blank"
          @click="trackWhatsAppClick"
          class="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg text-center font-semibold">
          <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Virtual Tour Fullscreen Modal -->
    <div v-if="isVrFullscreen" class="fixed inset-0 z-50 bg-black flex flex-col">
      <!-- Header with Close Button -->
      <div class="flex items-center justify-between p-4 bg-black bg-opacity-50">
        <h3 class="text-white text-xl font-semibold">{{ t('product.virtualTour') }}</h3>
        <button @click="closeVrFullscreen"
          class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- VR Iframe Container -->
      <div class="flex-1 relative">
        <iframe :src="product.vr_link" width="100%" height="100%" frameborder="0"
          allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no"
          class="absolute inset-0"></iframe>
      </div>

      <!-- Footer Instructions -->
      <div class="p-4 bg-black bg-opacity-50 text-white text-sm text-center">
        <p>{{ t('product.pressEscapeToExit') }}</p>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="isImageModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      @click.self="closeImageModal">
      <!-- Close Button -->
      <button @click="closeImageModal"
        class="absolute top-4 right-4 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Carousel Container -->
      <div class="w-full h-full max-w-7xl mx-auto px-4 py-20 flex items-center">
        <Carousel v-model="modalImageIndex" :items-to-show="1" :wrap-around="true" :transition="500" class="w-full">
          <Slide v-for="(image, index) in product.images" :key="image.id">
            <div class="flex items-center justify-center h-full">
              <img :src="getImageUrl(image.image)" :alt="`${product.title} - Image ${index + 1}`"
                class="max-w-full max-h-[90vh] object-contain" />
            </div>
          </Slide>

          <template #addons>
            <Navigation v-if="product.images.length > 1" />
            <Pagination v-if="product.images.length > 1" />
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '../services/productService'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ProductCard from '../components/ProductCard.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

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
const isImageModalOpen = ref(false)
const modalImageIndex = ref(0)
const isVrFullscreen = ref(false)
const phoneRevealed = ref(false)
const companyContactExpanded = ref(false)
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

const isAccessExpert = computed(() => {
  if (!product.value?.user) return false
  // Check if user has company (Access Expert typically has a company)
  if (product.value.user.company) return true
  // Also check roles if available
  if (product.value.user.roles) {
    return product.value.user.roles.some(role =>
      (typeof role === 'string' ? role : role.name) === 'Access Expert'
    )
  }
  return false
})

const isAdministrator = computed(() => {
  if (!product.value?.user) return false
  // Check roles if available
  if (product.value.user.roles) {
    return product.value.user.roles.some(role =>
      (typeof role === 'string' ? role : role.name) === 'Administrator'
    )
  }
  return false
})

const maskedPhone = computed(() => {
  if (!product.value?.proprietaire?.phone) return ''
  const phone = product.value.proprietaire.phone
  return phone.substring(0, 3) + '****'
})

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'http://localhost:8000/admin_assets/images/products/1.webp'
  return `https://cdn.2p.ma/product/images/${imagePath}`
}

const getPdfUrl = (pdfPath) => {
  if (!pdfPath) return ''
  return `https://cdn.2p.ma/product/pdfs/${pdfPath}`
}

const getCompanyLogoUrl = (logoPath) => {
  if (!logoPath) return ''
  return `https://cdn.2p.ma/users/company/${logoPath}`
}

const getProductLogoUrl = (logoPath) => {
  if (!logoPath) return ''
  return `https://cdn.2p.ma/product/logo/${logoPath}`
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

const openImageModal = (index) => {
  modalImageIndex.value = index
  isImageModalOpen.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  isImageModalOpen.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    if (isImageModalOpen.value) {
      closeImageModal()
    } else if (isVrFullscreen.value) {
      closeVrFullscreen()
    }
  }
}

const openVrFullscreen = () => {
  isVrFullscreen.value = true
  // Prevent body scroll when VR is fullscreen
  document.body.style.overflow = 'hidden'
}

const closeVrFullscreen = () => {
  isVrFullscreen.value = false
  // Restore body scroll
  document.body.style.overflow = ''
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
    // Reset phone and company contact states
    phoneRevealed.value = false
    companyContactExpanded.value = false
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
    if (!product.value?.id) {
      showToast('Erreur: Produit introuvable', 'error')
      return
    }

    showToast(t('product.send') + ' - ' + t('common.loading'), 'info')

    // Convert form data to URL-encoded format
    const formData = new URLSearchParams()
    formData.append('fullname', contactForm.value.fullname)
    formData.append('phone', contactForm.value.phone)
    formData.append('email', contactForm.value.email || '')
    formData.append('message', contactForm.value.message)

    await productService.submitProductContact(product.value.id, formData)

    showToast('Message envoyé avec succès', 'success')
    contactForm.value = { fullname: '', phone: '', email: '', message: '' }
  } catch (err) {
    console.error('Error submitting contact form:', err)
    showToast('Erreur lors de l\'envoi du message', 'error')
  }
}

const togglePhone = async () => {
  if (!phoneRevealed.value && product.value?.id) {
    try {
      await productService.trackPhoneView(product.value.id)
    } catch (err) {
      console.error('Error tracking phone view:', err)
    }
  }
  phoneRevealed.value = !phoneRevealed.value
}

const toggleCompanyContact = async () => {
  if (!companyContactExpanded.value && product.value?.id && product.value.proprietaire?.phone) {
    try {
      await productService.trackPhoneView(product.value.id)
      phoneRevealed.value = true
    } catch (err) {
      console.error('Error tracking phone view:', err)
    }
  }
  companyContactExpanded.value = !companyContactExpanded.value
}

const shareInstagram = async () => {
  try {
    const text = `${product.value?.title} - ${window.location.href}`
    await navigator.clipboard.writeText(text)
    showToast(t('product.linkCopied') || 'Lien copié dans le presse-papier', 'success')
    // Open Instagram in new tab
    window.open('https://www.instagram.com/', '_blank')
  } catch (err) {
    console.error('Error copying to clipboard:', err)
    showToast('Erreur lors de la copie du lien', 'error')
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
  window.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscapeKey)
  // Ensure body scroll is restored if component unmounts while modal is open
  document.body.style.overflow = ''
  // Also restore if VR fullscreen is open
  if (isVrFullscreen.value) {
    isVrFullscreen.value = false
  }
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

/* Carousel Modal Styles */
:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  transition: background-color 0.3s;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: rgba(255, 255, 255, 0.3);
}

:deep(.carousel__pagination) {
  padding: 1rem 0;
}

:deep(.carousel__pagination-button) {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 0 4px;
}

:deep(.carousel__pagination-button--active) {
  background-color: white;
}

/* Company Contact Styles */
.company-contact {
  max-height: 300px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.company-contact-show {
  max-height: 1000px;
  overflow: visible;
  transition: max-height 0.3s ease-in;
}
</style>
